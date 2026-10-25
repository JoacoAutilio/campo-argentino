const Lote = require('../models/loteModel');
const Cultivo = require('../models/cultivoModel');
const User = require('../models/userModel');
const Visita = require('../models/visitaModel');

const httpError = (status, message) => Object.assign(new Error(message), { status });

const CAMPOS_EDITABLES = [
  'nombreLote', 'ubicacion', 'hectareas', 'tipoCultivo', 'estado', 'fechaSiembraEstimada'
];

const populateLote = (query) =>
  query.populate('tipoCultivo').populate('productor', 'nombre email telefono');

const idDe = (ref) => String(ref._id || ref);

// El productor solo ve y modifica sus lotes; asesor y admin pueden verlos todos
const esDueno = (lote, user) => idDe(lote.productor) === String(user.id);
const puedeVer = (lote, user) => user.rol !== 'productor' || esDueno(lote, user);
const puedeModificar = (lote, user) => user.rol === 'admin' || esDueno(lote, user);

const validarCultivo = async (id) => {
  if (!(await Cultivo.exists({ _id: id }))) {
    throw httpError(400, 'El tipoCultivo indicado no existe en el catálogo');
  }
};

const validarCoordenadas = (ubicacion) => {
  const c = ubicacion && ubicacion.coordenadas;
  if (!c) return;
  const [lng, lat] = c.coordinates || [];
  if (c.type !== 'Point' || !Number.isFinite(lng) || !Number.isFinite(lat)) {
    throw httpError(400, 'coordenadas debe ser GeoJSON: { "type": "Point", "coordinates": [lng, lat] }');
  }
  if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
    throw httpError(400, 'Coordenadas fuera de rango (lng: -180 a 180, lat: -90 a 90)');
  }
};

const getAll = async (user, filtros = {}) => {
  const query = {};
  if (user.rol === 'productor') query.productor = user.id;
  else if (filtros.productor) query.productor = filtros.productor;
  if (filtros.estado) query.estado = filtros.estado;
  if (filtros.tipoCultivo) query.tipoCultivo = filtros.tipoCultivo;
  return populateLote(Lote.find(query).sort({ createdAt: -1 }));
};

const getCercanos = async (user, { lng, lat, km }) => {
  const longitud = Number(lng);
  const latitud = Number(lat);
  const radioKm = km === undefined ? 10 : Number(km);
  if (![longitud, latitud, radioKm].every(Number.isFinite) || radioKm <= 0) {
    throw httpError(400, 'Indicá lng, lat y (opcional) km como números válidos');
  }
  const query = {
    'ubicacion.coordenadas': {
      $near: {
        $geometry: { type: 'Point', coordinates: [longitud, latitud] },
        $maxDistance: radioKm * 1000
      }
    }
  };
  if (user.rol === 'productor') query.productor = user.id;
  return populateLote(Lote.find(query));
};

const getById = async (id, user) => {
  const lote = await populateLote(Lote.findById(id));
  if (!lote) throw httpError(404, 'Lote no encontrado');
  if (!puedeVer(lote, user)) throw httpError(403, 'No tenés acceso a este lote');
  return lote;
};

const create = async (data, user) => {
  // El productor crea lotes a su nombre; asesor/admin deben indicar de qué productor es
  const productorId = user.rol === 'productor' ? user.id : data.productor;
  if (!productorId) throw httpError(400, 'Indicá el productor dueño del lote');

  const productor = await User.findById(productorId);
  if (!productor || productor.rol !== 'productor') {
    throw httpError(400, 'El productor indicado no existe o no tiene rol "productor"');
  }
  if (!data.tipoCultivo) throw httpError(400, 'El tipoCultivo es obligatorio');
  await validarCultivo(data.tipoCultivo);
  validarCoordenadas(data.ubicacion);

  const lote = await Lote.create({
    nombreLote: data.nombreLote,
    ubicacion: data.ubicacion,
    hectareas: data.hectareas,
    productor: productorId,
    tipoCultivo: data.tipoCultivo,
    estado: data.estado,
    fechaSiembraEstimada: data.fechaSiembraEstimada
  });
  return getById(lote._id, user);
};

const update = async (id, data, user) => {
  const lote = await Lote.findById(id);
  if (!lote) throw httpError(404, 'Lote no encontrado');
  if (!puedeModificar(lote, user)) throw httpError(403, 'No podés modificar este lote');

  if (data.tipoCultivo) await validarCultivo(data.tipoCultivo);
  validarCoordenadas(data.ubicacion);

  CAMPOS_EDITABLES.forEach((campo) => {
    if (data[campo] !== undefined) lote.set(campo, data[campo]);
  });
  await lote.save();
  return getById(id, user);
};

const remove = async (id, user) => {
  const lote = await Lote.findById(id);
  if (!lote) throw httpError(404, 'Lote no encontrado');
  if (!puedeModificar(lote, user)) throw httpError(403, 'No podés eliminar este lote');

  // Regla de negocio: se conserva el historial técnico, no se borran lotes con visitas
  const visitas = await Visita.countDocuments({ lote: id });
  if (visitas > 0) {
    throw httpError(409, `No se puede eliminar: el lote tiene ${visitas} visita(s) técnica(s) registradas`);
  }
  await lote.deleteOne();
  return lote;
};

module.exports = { getAll, getCercanos, getById, create, update, remove };
