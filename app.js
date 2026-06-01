const express = require("express");
const app = express();
const port = 3000;

const { infoCursos } = require("./datos/cursos.js");

app.use(express.json());

// Configuración de los Routers de la API

const routerMatematicas = require("./routers/matematicas.js");
app.use("/api/cursos/matematicas", routerMatematicas);

const routerProgramacion = require("./routers/programacion.js");
app.use("/api/cursos/programacion", routerProgramacion);

//routing

//end points or routes
app.get("/", (req, res) => {
  res.send("Mi primer servidor con Express");
});

app.get("/api/cursos", (req, res) => {
  res.send(infoCursos);
});

// routerProgramacion.get("/", (req, res) => {
//   res.send(infoCursos.programacion);
// });

// routerProgramacion.get("/matematicas", (req, res) => {
//   res.send(infoCursos.matematicas);
// });

//1 parametro en la ruta

//ordenar cursos por vistas con sort

//2 parametros en la ruta

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`El servidor esta escuchando en el puerto ${PUERTO}`);
});
