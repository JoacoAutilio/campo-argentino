const Cultivo = require('../models/cultivoModel');
const Lote = require('../models/loteModel');

const httpError = (status, message) => Object.assign(new Error(message), { status });

const getAll = () => Cultivo.find().sort({ nombre: 1 });

const getById = async (id) => {
  const cultivo = await Cultivo.findById(id);
  if (!cultivo) throw httpError(404, 'Cultivo no encontrado');
  return cultivo;
};

const create = async ({ nombre, cicloDiasPromedio, epocaSiembraRecomendada, descripcion }) => {
  return Cultivo.create({ nombre, cicloDiasPromedio, epocaSiembraRecomendada, descripcion });
};

const remove = async (id) => {
  const cultivo = await getById(id);
  // Regla de negocio: no se puede borrar un cultivo que tiene lotes asociados
  const lotesAsociados = await Lote.countDocuments({ tipoCultivo: id });
  if (lotesAsociados > 0) {
    throw httpError(409, `No se puede eliminar: hay ${lotesAsociados} lote(s) usando este cultivo`);
  }
  await cultivo.deleteOne();
  return cultivo;
};

module.exports = { getAll, getById, create, remove };
