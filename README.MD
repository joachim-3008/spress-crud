```
Markdown
##  Cómo Ejecutar y Probar el Proyecto
```

```
Sigue estos pasos para levantar el servidor localmente y probar los endpoints
utilizando **Insomnia**.
```

```
### 1. Preparación del Entorno
```

```
Clona el repositorio con git clone https://github.com/joachim-3008/spress-crud.git
```

```
```bash
# Instalar dependencias
npm install 
```
Asegúrate de que tu estructura de archivos sea la siguiente:
```

```
Plaintext
├── app.js
├── rutas/
│   └── matematicas.js
└── package.json
2. Ejecutar el Servidor
Levanta el archivo principal desde tu terminal:
```

```
Bash
node app.js
(Asegúrate de que el servidor esté escuchando, por ejemplo, en el puerto 3000).
```

```
🧰 Guía de Pruebas en Insomnia
Abre Insomnia, crea una nueva HTTP Request para cada caso y configúrala con los
siguientes parámetros (asumiendo que tu base URL es
http://localhost:3000/api/cursos/matematicas):
```

```
🧰 GET: Obtener todos los cursos
Método: GET
```

```
URL: http://localhost:3000/api/cursos/matematicas
```

```
🧰 GET: Filtrar por tema
Método: GET
URL: http://localhost:3000/api/cursos/matematicas/algebra
```

```
🧰 GET: Cursos ordenados por vistas
Método: GET
```

```
URL: http://localhost:3000/api/cursos/matematicas/calculo/vistas
🧰 POST: Crear un nuevo curso
Método: POST
URL: http://localhost:3000/api/cursos/matematicas
Cuerpo (Body): Selecciona JSON en la pestaña desplegable y pega:
```

```
JSON
  {
    "id": 4,
    "titulo": "Geometría Analítica",
    "tema": "geometria",
    "nivel": "intermedio",
    "vistas": 1200
  }
```

```
🧰 PUT: Reemplazo absoluto de un curso
Método: PUT
```

```
URL: http://localhost:3000/api/cursos/matematicas/1 (Reemplaza el curso con ID
1)
```

```
Cuerpo (Body): Selecciona JSON y pega:
```

```
JSON
  {
    "id": 1,
    "titulo": "Álgebra Lineal Avanzada",
    "tema": "algebra",
    "nivel": "avanzado",
    "vistas": 5000
  }
🧰 PATCH: Actualización parcial (Solo vistas)
Método: PATCH
```

```
URL: http://localhost:3000/api/cursos/matematicas/2 (Modifica el curso con ID 2)
Cuerpo (Body): Selecciona JSON y pega:
```

```
JSON
  {
    "vistas": 8500
  }
🧰 DELETE: Eliminar un curso
Método: DELETE
```

```
URL: http://localhost:3000/api/cursos/matematicas/3 (Elimina el curso con ID 3)
```

