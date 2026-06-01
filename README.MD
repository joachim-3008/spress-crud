# 🧮 Módulo de Cursos de Matemáticas - API Express

Este repositorio contiene la lógica de enrutamiento y los controladores para gestionar un catálogo de cursos de matemáticas mediante una API REST funcional. Está construido con **Node.js** y **Express**, utilizando la modularización a través de `express.Router()`.

El sistema simula operaciones de base de datos directamente en memoria RAM (utilizando un archivo local de JavaScript), permitiendo realizar un CRUD completo (*Create, Read, Update, Delete*).

---

## 🚀 Características y Funcionalidades

* **Modularización Limpia:** Rutas totalmente independientes y listas para ser montadas en la aplicación principal (`app.js`).
* **Filtrado Avanzado:** Búsqueda de cursos por tema, combinaciones de tema/nivel y ordenamiento dinámico por popularidad (vistas).
* **Validaciones Básicas:** Control de duplicados por `id` al crear nuevos cursos y manejo de respuestas HTTP adecuadas (`200`, `400`, `404`).
* **Soporte CRUD Completo:** Implementación de verbos HTTP estándar utilizando buenas prácticas.

---

## 🛠️ Endpoints de la API

La ruta base asignada a este router (normalmente `/api/cursos/matematicas`) soporta las siguientes peticiones:

### 1. Lectura (GET)
| Endpoint | Descripción | Ejemplo de Uso |
| :--- | :--- | :--- |
| `GET /` | Obtiene la lista completa de cursos de matemáticas. | `/` |
| `GET /:tema` | Filtra los cursos que pertenecen a un tema específico. | `/algebra` |
| `GET /:tema/vistas` | Obtiene los cursos de un tema ordenados de **mayor a menor** visitas. | `/calculo/vistas` |
| `GET /:tema/:nivel` | Filtra cursos combinando de manera estricta tema y nivel. | `/aritmetica/basico` |

### 2. Creación (POST)
| Endpoint | Descripción | Detalle |
| :--- | :--- | :--- |
| `POST /` | Añade un nuevo curso al arreglo. | Requiere un JSON en el `body`. Valida que el `id` no exista previamente. Retorna la lista actualizada. |

### 3. Actualización (PUT y PATCH)
| Endpoint | Descripción | Detalle |
| :--- | :--- | :--- |
| `PUT /:id` | Reemplazo **absoluto** de un curso. | Sustituye el objeto existente por completo con las nuevas propiedades enviadas en el `body`. |
| `PATCH /:id` | Actualización **parcial**. | Modifica únicamente los campos enviados en el `body` usando `Object.assign()`, manteniendo intactos los demás. |

### 4. Eliminación (DELETE)
| Endpoint | Descripción | Detalle |
| :--- | :--- | :--- |
| `DELETE /:id` | Elimina un curso permanentemente. | Busca el curso por su `id` y lo remueve del array mediante `.splice()`. |

---

## ⚙️ Estructura del Código Clave

El archivo utiliza métodos nativos de JavaScript modernos para manipular los datos en memoria de forma eficiente:

* **`.filter()`**: Para aislar los cursos que cumplen con los parámetros de la URL sin mutar el array original.
* **`.sort((a, b) => b.vistas - a.vistas)`**: Ordenamiento numérico descendente basado en el atributo de visitas.
* **`.some()`**: Validación ultra rápida antes del `POST` para evitar la colisión de IDs idénticos.
* **`Object.assign(curso, cambios)`**: Fusión de objetos clave para optimizar la petición `PATCH`.

---

## 📝 Requisitos para la Integración

Para que este router funcione correctamente en tu servidor principal, asegúrate de tener configurado el middleware para leer JSON en tu `app.js`:

```javascript
const express = require('express');
const app = express();
const routerMatematicas = require('./rutas/matematicas.js'); // Ruta de este archivo

// Middleware crucial para POST, PUT y PATCH
app.use(express.json());

// Montar el router en la ruta correspondiente
app.use('/api/cursos/matematicas', routerMatematicas);