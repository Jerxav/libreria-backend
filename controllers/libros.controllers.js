const { db } = require("../cnn");

//Consultas:

const getLibros = async (req, res) => {

    const consulta = "SELECT * FROM libro ORDER BY lib_titulo;"
    const response = await db.query(consulta)
    res.status(200).json(response)
};

const getLibrosByCodigo = async (req, res) => {
    const consulta = "SELECT * FROM libro WHERE lib_codigo LIKE $1;"
    try {
        
        const codigo = req.params.codigo
        const response = await db.one(consulta, [codigo])
        res.status(200).json(response)

    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: "No se ha encontrado ninún libro con el código: " + req.params.codigo + "."
        })
    }
};

const postLibro = async (req, res) => {
    const consulta = "INSERT INTO libro VALUES($1, $2, $3, $4, $5) RETURNING *;"
    try {
        const libro = req.body
        const response = await db.one(consulta, [libro.codigo, libro.titulo,
        libro.autor, libro.editorial, libro.descripcion])
        res.status(200).json({
            message: "Libro ingresado correctamente",
            body: response
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
};

const putLibro = async (req, res) => {
    const consulta = "UPDATE libro SET lib_titulo = $2, lib_aut_id = $3,"
    + "lib_edi_id = $4, lib_descripcion = $5 WHERE lib_codigo = $1 RETURNING *;"
    try {
        
        const libro = req.body
        const response = await db.one(consulta,[
            libro.codigo,
            libro.titulo,
            libro.autor,
            libro.editorial,
            libro.descripcion])
        res.status(201).json({
            message: "La información del libro se actualizó correctamente.",
            body: response
        })

    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
};

const deleteLibro = async (req, res) => {
    const consulta = "DELETE FROM libro WHERE lib_codigo LIKE $1;"
    try {
        const codigo = req.params.codigo
        const response = await db.query(consulta, [codigo])
        res.status(200).json({
            message: "El libro con código " + codigo + " fue eliminado exitosamente."
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: "No se ha encontrado un libro con el código: " + req.params.codigo + "."
        })
    }
};

//Exportaciones
module.exports = {
    getLibros, getLibrosByCodigo, postLibro, 
    putLibro, deleteLibro
};