const { db } = require("../cnn");

/* Consultas */
const getAutor = async (req, res) => {
  const consulta = "SELECT * FROM autor ORDER BY aut_nombres";
  const response = await db.query(consulta);
  res.status(200).json(response);
};

const getAutorById = async (req, res) => {
  const consulta = "SELECT * FROM autor WHERE aut_id = $1;";
  try {
    const codigo = req.params.id;
    const response = await db.one(consulta, [codigo]);
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({
      code: e.code,
      message:
        "No se ha encontrado autor con esta Id" + "(" + req.params.id + ")",
    });
  }
};

const postAutor = async (req, res) => {
  const consulta = "INSERT INTO autor VALUES ($1,$2,$3) RETURNING *";
  try {
    const autor = req.body;
    const response = await db.one(consulta, [
      autor.id,
      autor.nombres,
      autor.apellidos,
    ]);
    res.status(201).json({
      message: "Autor ingresado correctamente",
      body: response,
    });
    console.log(req);
  } catch (e) {
    res.status(400).json({
      code: e.code,
      message: e.message,
    });
  }
};

const putAutor = async (req, res) => {
  const consulta =
    "UPDATE autor SET aut_nombres = $2, aut_apellidos = $3 WHERE aut_id = $1 RETURNING *";
  try {
    const autor = req.body;
    const response = await db.one(consulta, [
      autor.id,
      autor.nombres,
      autor.apellidos,
    ]);
    res.status(201).json({
      message: "Autor actualizado correctamente",
      body: response,
    });
  } catch (e) {
    res.status(400).json({
      code: e.code,
      message: e.message,
    });
  }
};

const deleteAutor = async (req, res) => {
  const consulta = "DELETE FROM autor WHERE aut_id = $1";
  try {
    const autor = req.params.id;
    const response = await db.query(consulta, [autor]);
    res.status(200).json({
      message: "El autor con Id(" + id + ")se ha eliminado correctamente",
    });
  } catch (e) {
    res.status(400).json({
      code: e.code,
      message: "No se ha encontrado un autor con Id (" + req.params.id + ")",
    });
  }
};

const getLibrosAutor = async (req, res) => {
  const consulta = "SELECT * FROM vw_autores_libros ORDER BY concat";
  const response = await db.query(consulta);
  res.status(200).json(response);
};

module.exports = {
  getAutor,
  postAutor,
  getAutorById,
  putAutor,
  deleteAutor,
  getLibrosAutor,
};
