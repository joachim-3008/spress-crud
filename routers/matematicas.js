const express = require("express");

// Traigo los datos de los cursos de matemáticas desde mi "base de datos" local
const { matematicas } = require("../datos/cursos.js").infoCursos;

// Inicializo el router para modularizar las rutas de matemáticas
const routerMatematicas = express.Router();

// ==========================================
// 1. PETICIONES GET (LECTURA)
// ==========================================

// Obtener todos los cursos de matemáticas disponibles
routerMatematicas.get("/", (req, res) => {
  res.send(matematicas);
});

// Obtener cursos de un tema específico ordenados de mayor a menor visitas
routerMatematicas.get("/:tema/vistas", (req, res) => {
  const tema = req.params.tema;

  // Filtro los cursos que coincidan con el tema de la URL
  const resultado = matematicas.filter((curso) => curso.tema === tema);

  // Los ordeno restando las vistas (b - a hace que queden de mayor a menor)
  resultado.sort((a, b) => b.vistas - a.vistas);

  // Si encontré algo lo mando, si no, respondo con un 404
  resultado.length > 0
    ? res.send(resultado)
    : res
        .status(404)
        .send(`No se encontraron cursos de matematicas para el tema: ${tema}`);
});

// Filtrar cursos por tema y por nivel (Ej: /algebra/basico)
routerMatematicas.get("/:tema/:nivel", (req, res) => {
  const tema = req.params.tema;
  const nivel = req.params.nivel;

  // Ambas condiciones deben cumplirse para que pase el filtro
  const resultado = matematicas.filter(
    (curso) => curso.tema === tema && curso.nivel === nivel,
  );

  resultado.length > 0
    ? res.send(resultado)
    : res
        .status(404)
        .send(
          `No se encontraron cursos de matematicas para el tema: ${tema} y nivel: ${nivel}`,
        );
});

// Filtrar cursos puramente por su tema
routerMatematicas.get("/:tema", (req, res) => {
  const tema = req.params.tema;
  const resultado = matematicas.filter((curso) => curso.tema === tema);

  resultado.length > 0
    ? res.send(resultado)
    : res
        .status(404)
        .send(`No se encontraron cursos de matematicas para el tema: ${tema}`);
});

// ==========================================
// 2. PETICIÓN POST (CREACIÓN)
// ==========================================

// Agregar un nuevo curso al arreglo
routerMatematicas.post("/", (req, res) => {
  // El req.body ya viene formateado gracias al middleware express.json() en app.js
  let cursoNuevo = req.body;
  //El metodo some() comprueba si al menos un elemento de un arreglo cumple con una condición específica
  const existe = matematicas.some((curso) => curso.id === cursoNuevo.id);

  if (existe) {
    return res
      .status(400)
      .send(`Ya existe un curso con el id: ${cursoNuevo.id}`);
  }

  // Lo empujo al final de mi lista de datos
  matematicas.push(cursoNuevo);

  // Devuelvo la lista completa para verificar que se agregó correctamente
  res.send(matematicas);
});

// ==========================================
// 3. PETICIONES PUT Y PATCH (ACTUALIZACIÓN)
// ==========================================

// PUT: Reemplazo absoluto/completo de un curso por su ID y que si se modifica y tiene el mismo id no se modifique
routerMatematicas.put("/:id", (req, res) => {
  // Convertimos el ID de la URL a número desde el principio
  const id = Number(req.params.id);
  const cursoActualizado = req.body;

  // Buscamos usando comparación estricta de números
  const indice = matematicas.findIndex((curso) => Number(curso.id) === id);

  if (indice >= 0) {
    // Validamos convirtiendo también el ID del body a número si es que existe
    if (cursoActualizado.id && Number(cursoActualizado.id) !== id) {
      return res
        .status(400)
        .send(
          `El ID del curso actualizado debe ser el mismo que el ID de la URL: ${id}`,
        );
    }

    // Reemplazo el curso completo en la posición que encontré
    // Forzamos que la propiedad 'id' quede guardada como un número puro
    matematicas[indice] = { ...cursoActualizado, id: id };

    res.send(matematicas);
  } else {
    res.status(404).send(`No se encontro el curso con el id: ${id}`);
  }
});

// PATCH: Actualización parcial (solo modifica las propiedades que le envíe)
routerMatematicas.patch("/:id", (req, res) => {
  const cambios = req.body;
  const id = req.params.id;

  // Aquí me sirve más el objeto directo, uso .find() en vez de buscar el índice
  const curso = matematicas.find((curso) => curso.id == id);

  if (curso) {
    // Aplico la magia de Object.assign para fusionar solo las propiedades que cambiaron
    Object.assign(curso, cambios);
    res.send(matematicas);
  } else {
    res.status(404).send(`No se encontro el curso con el id: ${id}`);
  }
});

// ==========================================
// 4. PETICIÓN DELETE (ELIMINACIÓN)
// ==========================================

// Borrar un curso del arreglo usando su ID
routerMatematicas.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indice = matematicas.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    // Uso splice para sacar exactamente 1 elemento a partir de la posición que encontré
    matematicas.splice(indice, 1);
    res.send(matematicas);
  } else {
    res.status(404).send(`No se encontro el curso con el id: ${id}`);
  }
});

// Exporto el router para que la app principal (app.js) lo pueda consumir sin problemas
module.exports = routerMatematicas;
