const Visita = require('../models/visitaModel');
const Lote = require('../models/loteModel');
const User = require('../models/userModel');

const httpError = (status, message) => Object.assign(new Error(message), { status });

const CAMPOS_EDITABLES = ['fecha', 'estadoCultivoObservado', 'observaciones', 'recomendaciones'];

const populateVisita = (query) =>
  query.populate('lote', 'nombreLote productor').populate('asesor', 'nombre email');

const idDe = (ref) => String(ref._id || ref);

// admin ve todo; asesor ve sus visitas; productor ve las visitas de sus lotes
const puedeVer = (visita, user) => {
  if (user.rol === 'admin') return true;
  if (user.rol === 'asesor') return idDe(visita.asesor) === String(user.id);
  return idDe(visita.lote.productor) === String(user.id);
};
const puedeModificar = (visita, user) =>
  user.rol === 'admin' || idDe(visita.asesor) === String(user.id);

const getAll = async (user, filtros = {}) => {
  const query = {};
  if (user.rol === 'asesor') query.asesor = user.id;
  if (user.rol === 'productor') {
    const misLotes = await Lote.find({ productor: user.id }).distinct('_id');
    query.lote = { $in: misLotes };
  }
  if (filtros.lote) {
    query.lote = user.rol === 'productor'
      ? { $in: query.lote.$in, $eq: filtros.lote }
      : filtros.lote;
  }
  return populateVisita(Visita.find(query).sort({ fecha: -1 }));
};

const getById = async (id, user) => {
  const visita = await populateVisita(Visita.findById(id));
  if (!visita) throw httpError(404, 'Visita no encontrada');
  if (!puedeVer(visita, user)) throw httpError(403, 'No tenés acceso a esta visita');
  return visita;
};

const create = async (data, user) => {
  if (!data.lote) throw httpError(400, 'El lote es obligatorio');
  if (!(await Lote.exists({ _id: data.lote }))) {
    throw httpError(400, 'El lote indicado no existe');
  }
  // El asesor firma sus propias visitas; el admin puede cargarlas en nombre de un asesor
  const asesorId = user.rol === 'admin' && data.asesor ? data.asesor : user.id;
  if (user.rol === 'admin' && data.asesor) {
    const asesor = await User.findById(data.asesor);
    if (!asesor || asesor.rol !== 'asesor') {
      throw httpError(400, 'El asesor indicado no existe o no tiene rol "asesor"');
    }
  }

  const visita = await Visita.create({
    lote: data.lote,
    asesor: asesorId,
    fecha: data.fecha,
    estadoCultivoObservado: data.estadoCultivoObservado,
    observaciones: data.observaciones,
    recomendaciones: data.recomendaciones
  });
  return getById(visita._id, user);
};

const update = async (id, data, user) => {
  const visita = await Visita.findById(id);
  if (!visita) throw httpError(404, 'Visita no encontrada');
  if (!puedeModificar(visita, user)) throw httpError(403, 'No podés modificar esta visita');

  CAMPOS_EDITABLES.forEach((campo) => {
    if (data[campo] !== undefined) visita.set(campo, data[campo]);
  });
  await visita.save();
  return getById(id, user);
};

const remove = async (id, user) => {
  const visita = await Visita.findById(id);
  if (!visita) throw httpError(404, 'Visita no encontrada');
  if (!puedeModificar(visita, user)) throw httpError(403, 'No podés eliminar esta visita');
  await visita.deleteOne();
  return visita;
};

module.exports = { getAll, getById, create, update, remove };
