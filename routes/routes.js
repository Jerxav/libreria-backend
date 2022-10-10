/* Importaciones */
const { Router } = require("express");
const { getAutor, postAutor, getAutorById, putAutor, deleteAutor, getLibrosAutor } = require("../controllers/autores.controller");
const { getLibros, getLibrosByCodigo, postLibro, putLibro, deleteLibro } = require("../controllers/libros.controllers");
const router = Router();

const URLV1 = "/v1";

/* Rutas Autores V1 */
router.get(URLV1 + "/autores", getAutor);
router.get(URLV1 + "/autores/:id", getAutorById);
router.post(URLV1 + "/autores", postAutor);
router.put(URLV1 + "/autores", putAutor);
router.delete(URLV1 + "/autores/:id", deleteAutor);
router.get(URLV1 + "/autor/libros", getLibrosAutor);

//Rutas Editoriales V1

//Rutas Libros V1
router.get(URLV1 + "/libros", getLibros);
router.get(URLV1 + "/libros/:codigo", getLibrosByCodigo);
router.post(URLV1 + "/libros", postLibro);
router.put(URLV1 + "/libros", putLibro);
router.delete(URLV1 + "/libros/:codigo", deleteLibro);

//Exportaciones

module.exports = router;
