const { db } = require("../cnn");

/* Consultas */
const getNotas = async (req, res) => {
  const consulta = "SELECT * FROM libro";
  const response = await db.query(consulta);
  res.status(200).json(response);
};

module.exports = {
  getNotas,
};
