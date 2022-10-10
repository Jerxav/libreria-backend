/* Paquetes */
const express = require("express");
const app = express();
const cors = require("cors");

/* Puerto */
app.set("port", process.env.PORT || 3003);

/* middlewears */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* Rutas */
app.use(require("./routes/routes"));

/* Ejecución del servidor web */
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(app.get("port"));

console.log(
  "La dirección de acceso es: \nhttp://localhost: " + app.get("port")
);

/* Producción */

module.exports = app;
