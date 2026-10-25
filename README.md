# Campo Argentino API

API RESTful para **Campo Argentino**, una plataforma de asesoría agropecuaria: los **productores** cargan sus lotes, los **asesores técnicos** los visitan y registran el estado del cultivo con sus recomendaciones, y cualquier usuario autenticado puede gestionar el catálogo de cultivos.

Trabajo Práctico Final — Curso de Backend Developer (UTN BA). Desarrollo de API RESTful con CRUD y capa de servicios.

## Tecnologías utilizadas

- Node.js (>= 18)
- Express
- MongoDB + Mongoose
- bcrypt (hash de contraseñas con *pre-save hook*)
- JSON Web Token (jsonwebtoken)
- dotenv (variables de entorno)
- CORS
- nodemon (desarrollo)

## Arquitectura

Separación de responsabilidades según la consigna:

```
campo-argentino/
├── app.js                      (punto de entrada)
├── seed.js                     (carga inicial: admin + catálogo de cultivos)
├── .env
├── package.json
├── docs/                       (TP de diseño del esquema)
├── frontend/                   (sitio React, ver más abajo)
└── src/
    ├── models/                 (schemas de Mongoose)
    │   ├── userModel.js
    │   ├── cultivoModel.js
    │   ├── loteModel.js
    │   └── visitaModel.js
    ├── services/               (lógica de negocio y acceso a la base de datos)
    │   ├── userService.js
    │   ├── cultivoService.js
    │   ├── loteService.js
    │   └── visitaService.js
    ├── controllers/            (solo manejan HTTP: request, delegan, response)
    │   ├── userController.js
    │   ├── cultivoController.js
    │   ├── loteController.js
    │   └── visitaController.js
    ├── routes/
    │   ├── userRoute.js
    │   ├── cultivoRoute.js
    │   ├── loteRoute.js
    │   └── visitaRoute.js
    ├── config/
    │   └── db.js               (conexión a MongoDB)
    └── middleware/
        ├── verifyToken.js      (JWT + control de roles)
        └── errorHandler.js     (traduce errores a códigos HTTP)
```

Todas las llamadas a Mongoose están en `services/`. Los controladores no tocan la base de datos.

## Esquema de la base de datos

Cuatro colecciones. La colección principal es **Lotes**, que referencia a **Usuarios** (productor) y a **Cultivos** (catálogo). **Visitas** referencia a Lotes y a Usuarios (asesor).

### Usuarios (`usuarios`)

| Campo | Tipo | Notas |
|---|---|---|
| `_id` | ObjectId | PK |
| `nombre` | String | obligatorio |
| `email` | String | obligatorio, único, en minúsculas |
| `password` | String | obligatorio, **guardada hasheada con bcrypt**, no se devuelve en las respuestas |
| `rol` | String | `productor` \| `asesor` \| `admin` (por defecto `productor`) |
| `telefono` | String | |
| `createdAt` / `updatedAt` | Date | automáticos |

### Cultivos (`cultivos`) — catálogo, referenciado por Lotes

| Campo | Tipo | Notas |
|---|---|---|
| `_id` | ObjectId | PK |
| `nombre` | String | obligatorio, único |
| `cicloDiasPromedio` | Number | mínimo 1 |
| `epocaSiembraRecomendada` | String | |
| `descripcion` | String | |

### Lotes (`lotes`) — entidad principal

| Campo | Tipo | Notas |
|---|---|---|
| `_id` | ObjectId | PK |
| `nombreLote` | String | obligatorio |
| `ubicacion` | Objeto **embebido** | `provincia`, `localidad` y `coordenadas` |
| `ubicacion.coordenadas` | GeoJSON Point | `{ "type": "Point", "coordinates": [lng, lat] }` — índice `2dsphere` |
| `hectareas` | Number | mayor a 0 |
| `productor` | ObjectId → Usuarios | **referencia**, obligatorio |
| `tipoCultivo` | ObjectId → Cultivos | **referencia**, obligatorio |
| `estado` | String | `sembrado` \| `en_crecimiento` \| `cosechado` \| `barbecho` |
| `fechaSiembraEstimada` | Date | |

### Visitas (`visitas`)

| Campo | Tipo | Notas |
|---|---|---|
| `_id` | ObjectId | PK |
| `lote` | ObjectId → Lotes | **referencia**, obligatorio |
| `asesor` | ObjectId → Usuarios | **referencia**, obligatorio |
| `fecha` | Date | por defecto, ahora |
| `estadoCultivoObservado` | String | |
| `observaciones` | String | |
| `recomendaciones` | String | |

### Relaciones

- `Lote.productor` → `Usuario` (1:N)
- `Lote.tipoCultivo` → `Cultivo` (1:N) — se usa **populate** en las lecturas de lotes
- `Visita.lote` → `Lote` (1:N)
- `Visita.asesor` → `Usuario` (1:N)

### Índices

| Índice | Colección | Para qué sirve |
|---|---|---|
| `email` único | Usuarios | evitar duplicados y buscar rápido en el login |
| `productor` | Lotes | listar los lotes de un productor |
| `tipoCultivo` | Lotes | filtrar por cultivo |
| `ubicacion.coordenadas` (`2dsphere`) | Lotes | búsqueda de lotes cercanos (`GET /api/lotes/cercanos`) |
| `{ lote: 1, fecha: -1 }` | Visitas | historial de visitas de un lote, de la más reciente a la más vieja |
| `asesor` | Visitas | "mis visitas" del asesor |

## Instalación y ejecución

Requisitos: Node.js 18 o superior y una base MongoDB (local o MongoDB Atlas).

```bash
# 1. Clonar e instalar dependencias
git clone https://github.com/JoacoAutilio/campo-argentino.git
cd campo-argentino
npm install

# 2. Configurar el archivo .env (ver sección siguiente)

# 3. Cargar el usuario admin y el catálogo de cultivos (una sola vez)
npm run seed

# 4. Iniciar el servidor
npm start          # producción
npm run dev        # desarrollo, con recarga automática
```

El servidor queda en `http://localhost:3000`. Para verificar que funciona: `GET http://localhost:3000/api/health`.

## Variables de entorno (`.env`)

Se incluye un `.env` de ejemplo con valores placeholder, como pide la consigna:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/campo_argentino
JWT_SECRET=cambiar_por_un_secreto_largo_y_aleatorio
JWT_EXPIRES_IN=8h

# Solo para el script de carga inicial (npm run seed)
ADMIN_NOMBRE=Admin Campo Argentino
ADMIN_EMAIL=admin@campoargentino.com
ADMIN_PASSWORD=Admin1234
```

Para MongoDB Atlas, `MONGO_URI` tiene el formato `mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/campo_argentino`. Estos valores son de ejemplo: en un entorno real hay que cambiar `JWT_SECRET` y la contraseña del admin.

## Autenticación y permisos

Las rutas protegidas requieren el header:

```
Authorization: Bearer <token>
```

El token se obtiene en `POST /api/auth/login`.

| Rol | Qué puede hacer |
|---|---|
| `productor` | Ver y crear sus propios lotes, modificar o eliminar sus lotes, ver las visitas de sus lotes |
| `asesor` | Ver todos los lotes, crear lotes a nombre de un productor, crear/editar/eliminar sus propias visitas técnicas |
| `admin` | Todo lo anterior sobre cualquier recurso |

Crear y eliminar cultivos del catálogo está habilitado para cualquier rol autenticado.

El rol `admin` no se puede elegir al registrarse: se crea con `npm run seed`.

## Endpoints

### Autenticación

| Método | Ruta | Descripción | Token |
|---|---|---|---|
| POST | `/api/auth/register` | Registra un usuario (`productor` o `asesor`) | No |
| POST | `/api/auth/login` | Devuelve el JWT | No |
| GET | `/api/auth/me` | Perfil del usuario logueado | Sí |

### Cultivos (catálogo)

| Método | Ruta | Descripción | Token / rol |
|---|---|---|---|
| GET | `/api/cultivos` | Lista el catálogo | No |
| GET | `/api/cultivos/:id` | Un cultivo | No |
| POST | `/api/cultivos` | Crea un cultivo | Sí — cualquier rol |
| DELETE | `/api/cultivos/:id` | Elimina un cultivo (409 si tiene lotes asociados) | Sí — cualquier rol |

### Lotes

| Método | Ruta | Descripción | Token / rol |
|---|---|---|---|
| GET | `/api/lotes` | Lista lotes con el cultivo poblado. Filtros opcionales: `?estado=`, `?tipoCultivo=`, `?productor=` | Sí |
| GET | `/api/lotes/cercanos?lng=&lat=&km=` | Lotes cercanos a un punto (`km` por defecto 10), usa el índice 2dsphere | Sí |
| GET | `/api/lotes/:id` | Un lote con cultivo y productor poblados | Sí |
| POST | `/api/lotes` | Crea un lote | Sí |
| PUT | `/api/lotes/:id` | Actualiza un lote | Sí — dueño o `admin` |
| DELETE | `/api/lotes/:id` | Elimina un lote (409 si tiene visitas registradas) | Sí — dueño o `admin` |

### Visitas técnicas

| Método | Ruta | Descripción | Token / rol |
|---|---|---|---|
| GET | `/api/visitas` | Lista visitas según el rol. Filtro opcional: `?lote=<id>` | Sí |
| GET | `/api/visitas/:id` | Una visita | Sí |
| POST | `/api/visitas` | Registra una visita | Sí — `asesor` o `admin` |
| PUT | `/api/visitas/:id` | Actualiza una visita | Sí — su asesor o `admin` |
| DELETE | `/api/visitas/:id` | Elimina una visita | Sí — su asesor o `admin` |

### Otros

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/health` | Verifica que el servidor esté activo |

## Códigos de respuesta

| Código | Cuándo |
|---|---|
| 200 | Lectura, actualización o eliminación correcta |
| 201 | Recurso creado |
| 400 | Datos inválidos, falta un campo obligatorio, ID mal formado o JSON inválido |
| 401 | Token ausente, inválido o vencido; credenciales incorrectas |
| 403 | El usuario no tiene permisos sobre ese recurso |
| 404 | Recurso o ruta inexistente |
| 409 | Valor único duplicado (ej. email) o regla de negocio (ej. borrar un cultivo en uso) |
| 500 | Error interno del servidor |

## Ejemplos de datos (mock) para todas las solicitudes

Los IDs que se envían en el body (`productor`, `tipoCultivo`, `lote`, `asesor`) son strings de 24 caracteres hexadecimales: Mongoose los convierte a `ObjectId` reales al guardar.

### `POST /api/auth/register`

Productor:

```json
{
  "nombre": "Marcos Beltrán",
  "email": "marcos.beltran@campoargentino.com",
  "password": "clave1234",
  "rol": "productor",
  "telefono": "+54 9 11 5555-0001"
}
```

Asesor:

```json
{
  "nombre": "Ing. Agr. Diego Ríos",
  "email": "diego.rios@campoargentino.com",
  "password": "clave1234",
  "rol": "asesor",
  "telefono": "+54 9 351 555-0003"
}
```

Respuesta `201`:

```json
{
  "_id": "652f1a1b2c3d4e5f60000001",
  "nombre": "Marcos Beltrán",
  "email": "marcos.beltran@campoargentino.com",
  "rol": "productor",
  "telefono": "+54 9 11 5555-0001",
  "createdAt": "2026-10-12T14:00:00.000Z",
  "updatedAt": "2026-10-12T14:00:00.000Z"
}
```

### `POST /api/auth/login`

```json
{
  "email": "marcos.beltran@campoargentino.com",
  "password": "clave1234"
}
```

Respuesta `200`:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "_id": "652f1a1b2c3d4e5f60000001",
    "nombre": "Marcos Beltrán",
    "email": "marcos.beltran@campoargentino.com",
    "rol": "productor"
  }
}
```

### `GET /api/auth/me`

Sin body. Respuesta `200`: el usuario logueado (mismo formato que el registro).

### `POST /api/cultivos` (requiere token, cualquier rol)

```json
{
  "nombre": "Soja",
  "cicloDiasPromedio": 140,
  "epocaSiembraRecomendada": "Octubre - Noviembre",
  "descripcion": "Cultivo de verano, sensible al fotoperíodo."
}
```

Respuesta `201`:

```json
{
  "_id": "652f1a1b2c3d4e5f60001001",
  "nombre": "Soja",
  "cicloDiasPromedio": 140,
  "epocaSiembraRecomendada": "Octubre - Noviembre",
  "descripcion": "Cultivo de verano, sensible al fotoperíodo."
}
```

### `GET /api/cultivos`

Sin body. Respuesta `200`: lista de cultivos ordenada por nombre.

### `POST /api/lotes` (productor)

El productor queda como dueño automáticamente.

```json
{
  "nombreLote": "Lote 1",
  "ubicacion": {
    "provincia": "Buenos Aires",
    "localidad": "General Belgrano",
    "coordenadas": {
      "type": "Point",
      "coordinates": [-58.666912, -35.818324]
    }
  },
  "hectareas": 85,
  "tipoCultivo": "652f1a1b2c3d4e5f60001001",
  "estado": "en_crecimiento",
  "fechaSiembraEstimada": "2026-10-15T00:00:00.000Z"
}
```

Si lo crea un asesor o un admin, debe agregar `"productor": "<id del productor>"`.

Respuesta `201` (con populate):

```json
{
  "_id": "652f1a1b2c3d4e5f60002001",
  "nombreLote": "Lote 1",
  "ubicacion": {
    "provincia": "Buenos Aires",
    "localidad": "General Belgrano",
    "coordenadas": { "type": "Point", "coordinates": [-58.666912, -35.818324] }
  },
  "hectareas": 85,
  "estado": "en_crecimiento",
  "fechaSiembraEstimada": "2026-10-15T00:00:00.000Z",
  "productor": {
    "_id": "652f1a1b2c3d4e5f60000001",
    "nombre": "Marcos Beltrán",
    "email": "marcos.beltran@campoargentino.com",
    "telefono": "+54 9 11 5555-0001"
  },
  "tipoCultivo": {
    "_id": "652f1a1b2c3d4e5f60001001",
    "nombre": "Soja",
    "cicloDiasPromedio": 140,
    "epocaSiembraRecomendada": "Octubre - Noviembre",
    "descripcion": "Cultivo de verano, sensible al fotoperíodo."
  }
}
```

### `GET /api/lotes`, `GET /api/lotes/:id`

Sin body. Devuelven lotes con `tipoCultivo` y `productor` poblados (mismo formato que arriba). Ejemplo con filtros: `GET /api/lotes?estado=sembrado`.

### `GET /api/lotes/cercanos`

Ejemplo: `GET /api/lotes/cercanos?lng=-58.67&lat=-35.81&km=5`. Devuelve los lotes dentro de 5 km, del más cercano al más lejano.

### `PUT /api/lotes/:id`

Se puede enviar solo lo que cambia:

```json
{
  "estado": "cosechado",
  "hectareas": 90
}
```

### `DELETE /api/lotes/:id`

Sin body. Respuesta `200`:

```json
{ "message": "Lote eliminado correctamente" }
```

### `POST /api/visitas` (asesor)

```json
{
  "lote": "652f1a1b2c3d4e5f60002001",
  "fecha": "2026-08-05T14:00:00.000Z",
  "estadoCultivoObservado": "Emergencia pareja, sin plagas visibles",
  "observaciones": "Suelo con buena humedad tras las últimas lluvias.",
  "recomendaciones": "Monitorear en 15 días por posible presencia de orugas."
}
```

Respuesta `201`:

```json
{
  "_id": "652f1a1b2c3d4e5f60003001",
  "lote": { "_id": "652f1a1b2c3d4e5f60002001", "nombreLote": "Lote 1", "productor": "652f1a1b2c3d4e5f60000001" },
  "asesor": { "_id": "652f1a1b2c3d4e5f60000003", "nombre": "Ing. Agr. Diego Ríos", "email": "diego.rios@campoargentino.com" },
  "fecha": "2026-08-05T14:00:00.000Z",
  "estadoCultivoObservado": "Emergencia pareja, sin plagas visibles",
  "observaciones": "Suelo con buena humedad tras las últimas lluvias.",
  "recomendaciones": "Monitorear en 15 días por posible presencia de orugas."
}
```

### `GET /api/visitas`, `GET /api/visitas/:id`

Sin body. Ejemplo para el historial de un lote: `GET /api/visitas?lote=652f1a1b2c3d4e5f60002001`.

### `PUT /api/visitas/:id`

```json
{
  "recomendaciones": "Monitorear en 10 días. Evaluar aplicación si se superan 2 orugas por metro."
}
```

### Ejemplos de errores

`401` sin token:

```json
{ "message": "Token no proporcionado" }
```

`403` productor intentando registrar una visita:

```json
{ "message": "No tenés permisos para realizar esta acción" }
```

`400` datos inválidos:

```json
{
  "message": "Datos inválidos",
  "errores": ["Las hectáreas deben ser mayores a 0"]
}
```

`409` borrar un cultivo con lotes asociados:

```json
{ "message": "No se puede eliminar: hay 3 lote(s) usando este cultivo" }
```

## Flujo de prueba sugerido (Postman / Thunder Client)

1. `npm run seed` para crear el admin y el catálogo de cultivos.
2. `POST /api/auth/register` como productor y como asesor.
3. `POST /api/auth/login` con cada uno y guardar los tokens.
4. `GET /api/cultivos` para copiar el `_id` de un cultivo.
5. `POST /api/lotes` con el token del productor.
6. `POST /api/visitas` con el token del asesor.
7. `GET /api/lotes/:id` y `GET /api/visitas?lote=<id>` para ver el populate y el historial.
8. Probar los errores: sin token (401), productor creando una visita (403), borrar un lote con visitas (409).

## Funcionalidades implementadas

- CRUD completo de lotes, con populate del cultivo y del productor.
- Catálogo de cultivos con GET, POST y DELETE.
- Registro y login con JWT; contraseñas hasheadas con bcrypt mediante *pre-save hook*.
- Control de acceso por rol y por dueño del recurso.
- Visitas técnicas por lote con historial.
- Búsqueda geoespacial de lotes cercanos (GeoJSON + índice `2dsphere`).
- Reglas de negocio: no se borra un cultivo en uso ni un lote con visitas; validación de que el cultivo y el productor existan.
- Manejo centralizado de errores y códigos HTTP.
- Capa de servicios separada de los controladores.
- Variables de entorno con dotenv y CORS habilitado.

## Frontend (`frontend/`)

En `frontend/` está el sitio web de Campo Argentino (React + Vite), el proyecto final del ciclo Front End. Es independiente de la API: tiene su propio `package.json` y todavía no consume estos endpoints.

```bash
cd frontend
npm install
npm run dev
```

Más detalles en [`frontend/README.md`](frontend/README.md). El diseño del esquema de la base está en [`docs/`](docs/).

## Funcionalidades a futuro

- Conectar el frontend a esta API y sumar una versión móvil para que el asesor cargue visitas desde el campo, con soporte sin conexión.
- Exportar las recomendaciones de cada visita a PDF para enviar al productor.
- Fotos de los lotes y de las visitas.
- Notificaciones al productor cuando el asesor registra una visita.
- Equipos de asesores (consultoras con varios asesores) y asignación de asesores a productores.
- Paginación y búsqueda en los listados.
- Documentación con Swagger, tests automatizados y límite de peticiones (*rate limiting*).
- Integración con datos de clima.
