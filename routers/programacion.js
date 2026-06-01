const express = require("express");

const { programacion } = require("../datos/cursos.js").infoCursos;

const routerProgramacion = express.Router();


//middleware para convertir el body a json
routerProgramacion.use(express.json());

routerProgramacion.get("/", (req, res) => {
  res.send(programacion);
});

routerProgramacion.get("/:lenguaje/vistas", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultado = programacion.filter((curso) => curso.lenguaje === lenguaje);
  resultado.sort((a, b) => b.vistas - a.vistas);
  resultado.length > 0
    ? res.send(resultado)
    : res
        .status(404)
        .send(
          `No se encontraron cursos de programacion para el lenguaje: ${lenguaje}`,
        );
});

routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultado = programacion.filter(
    (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel,
  );
  resultado.length > 0
    ? res.send(resultado)
    : res
        .status(404)
        .send(
          `No se encontraron cursos de programacion para el lenguaje: ${lenguaje} y nivel: ${nivel}`,
        );
});

routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultado = programacion.filter((curso) => curso.lenguaje === lenguaje);
  resultado.length > 0
    ? res.send(resultado)
    : res
        .status(404)
        .send(
          `No se esncontraron cursos de programacion para el lenguaje: ${lenguaje}`,
        );
});

routerProgramacion.post("/", (req, res) => {
  let cursoNuevo = req.body;
  //El metodo some() comprueba si al menos un elemento de un arreglo cumple con una condición específica
  const existe = programacion.some((curso) => curso.id === cursoNuevo.id);
  
  if (existe) {
    return res.status(400).send(`Ya existe un curso con el id: ${cursoNuevo.id}`);
  }
  programacion.push(cursoNuevo);
  res.send(programacion);
});

routerProgramacion.put("/:id", (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;
    
    const indice = programacion.findIndex((curso) => curso.id == id);
    if (indice >= 0) {
        programacion[indice] = cursoActualizado;
        res.send(programacion);
    } else {
        res.status(404).send(`No se encontro el curso con el id: ${id}`);
    }
});

routerProgramacion.patch("/:id", (req, res) => {
    const cambios = req.body;
    const id = req.params.id;

    const curso = programacion.find((curso) => curso.id == id);
    if (curso) {
        Object.assign(curso, cambios);
        res.send(programacion);
    } else {
        res.status(404).send(`No se encontro el curso con el id: ${id}`);
    }
});

routerProgramacion.delete("/:id", (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex((curso) => curso.id == id);
    if (indice >= 0) {
        programacion.splice(indice, 1);
        res.send(programacion);
    } else {
        res.status(404).send(`No se encontro el curso con el id: ${id}`);
    }
});

module.exports = routerProgramacion;
