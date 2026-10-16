# TP 07 - Integración de MongoDB y Mongoose

## 1. Punto de partida y nombre de la copia
Este proyecto se desarrolló tomando como punto de partida la estructura del TP 06 tp-06-salas-modular. La nueva copia de trabajo y repositorio se denominan tp-07-salas-mongodb.

## 2. Versiones utilizadas y confirmación de Atlas Free (M0)
* **Node.js**: v22.16.0
* **npm**: v10.8.0
* **MongoDB**: Instancia en la nube utilizando **MongoDB Atlas (Tier M0 Free Cluster)**.

## 3. Pasos para la puesta en marcha desde una descarga nueva
**Clonar/Descargar el repositorio e instalar dependencias**
   
 **Configurar el clúster gratuito en MongoDB Atlas**:
 - `Crear un clúster gratuito (Tier M0)`.  
 - `Crear un usuario con clave para la base de datos`.  
 - `En la sección Network Access, agregar la IP actual o habilitar 0.0.0.0/0 para permitir la conexión`.

 **Configurar variables de entorno**:
 - `Copiar la plantilla genérica`:   Bashcp .env.example .env
 - `Editar el archivo .env asignando la URI real de conexión a MongoDB Atlas`.

 **Ejecutar la verificación**:
 -`node --env-file=.env scripts/comprobar-conexion.js`

 ## 4. Diagnóstico DNS, resolutores y comandos exactos

**Diagnóstico y ajustes DNS**: 
En entornos locales que presentaron bloqueos en consultas SRV de MongoDB Atlas, se forzó la resolución DNS en `src/config/base-datos.js` mediante la API nativa `node:dns` asignando los servidores públicos de Google y Cloudflare.

**Comandos del proyecto**:
- **Comprobar conexión**: `node --env-file=.env scripts/comprobar-conexion.js`
- **Crear reserva (script)**: `node --env-file=.env scripts/crear-reserva.js`
- **Listar reservas (script)**: `node --env-file=.env scripts/listar-reservas.js`
- **Control de calidad (ESLint + Prettier)**: `npm run check`
- **Arranque del servidor web**: `npm run dev`
**Mapa de archivos relevantes**:   
- `src/config/entorno.js`: Lectura y validación de variables de entorno (`PORT`, `MONGODB_URI`).
- `src/config/base-datos.js`: Lógica de conexión y desconexión a MongoDB con Mongoose.
- `src/models/reserva.js`: Definición del esquema (`ReservaSchema`) y modelo Mongoose (`Reserva`).     
- `scripts/`: Scripts independientes de prueba en terminal (`comprobar-conexion.js`, `crear-reserva.js`, `listar-reservas.js`).

**Estructura Mongoose**:   
- **Esquema (`ReservaSchema`)**: Define las propiedades del documento (`estudiante`, `email`, `sala`, `fecha`, `turno`, `personas`) y sus tipos de datos.
- **Modelo (`Reserva`)**: Interfaz constructora de Mongoose que compila el esquema para interactuar con la base de datos.
- **Colección**: Mongoose mapea automáticamente el modelo a la colección en plural dentro de la base de datos (`reservas`).

## 6. **Campos y reglas de validación:**
- `estudiante`: String, requerido.
- `email`: String, requerido, formato de correo válido.
- `sala`: String, requerido.
- `fecha`: String/Date, requerido.
- `turno`: String, requerido.
- `personas`: Number, requerido, entero positivo.

**Límites aún no controlados:**
- No se valida la capacidad máxima real de cada sala físicamente.
- No se evitan solapamientos o reservas dobles para la misma sala en el mismo turno/fecha a nivel de esquema (se abordará en la capa de negocio/servicios).

 ## 7. **Matriz de pruebas y evidencia de persistencia**

Se ejecutaron satisfactoriamente las pruebas desde la terminal demostrando la persistencia entre procesos independientes:  

- **Prueba de Conexión**
  - **Comando**: `node --env-file=.env scripts/comprobar-conexion.js`
  - **Resultado**: "Conexión con MongoDB establecida".

- **Creación de Reserva**
  - **Comando**: `node --env-file=.env scripts/crear-reserva.js`
  - **Resultado**: "Reserva guardada con éxito. ID: 6ad231eb2c82e5b6b8c43614"

**Listado y Persistencia**
- **Comando**: `node --env-file=.env scripts/listar-reservas.js`
- **Resultado**: La reserva persistió correctamente en MongoDB Atlas y se desplegó en consola mediante `console.table`.
┌─────────┬────────────────────────────┬─────────────────┬─────────────────────────────┬───────────────────┬──────────────┬───────────┬───────────┐
│ (index) │ id                         │ estudiante      │ email                       │ sala              │ fecha        │ turno     │ personas  │
├─────────┼────────────────────────────┼─────────────────┼─────────────────────────────┼───────────────────┼──────────────┼───────────┼───────────┤
│ 0       │ '6ad231eb2c82e5b6b8c43614' │ 'Mario Herrera' │ 'mario.herrera@example.com' │ 'Sala Multimedia' │ '2026-06-15' │ 'Mañana'  │ 2         │
└─────────┴────────────────────────────┴─────────────────┴─────────────────────────────┴───────────────────┴──────────────┴───────────┴───────────┘
Total de reservas: 1

## 8. Explicación sobre la persistencia y la Unidad 8
En esta etapa (TP 07), el sitio web Express continúa utilizando almacenamiento o controladores en memoria/JSON para el flujo HTTP estándar, habiendo implementado la conexión, el modelo de Mongoose y la persistencia únicamente en la capa de scripts y configuración de base de datos.   En la Unidad 8 se completará la integración total refactorizando los controladores de la aplicación Express para que respondan a las peticiones del usuario operando directamente sobre MongoDB a través de Mongoose

## 9. Confirmación de seguridad
Se confirma explícitamente que:
El archivo .env con las credenciales reales de MongoDB Atlas se encuentra en el .gitignore y no se publica en el repositorio.
Se provee el archivo .env.example únicamente con variables de plantilla sin información sensible
No se incluyen contraseñas, claves ni datos personales reales en el código fuente.