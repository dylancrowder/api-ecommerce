# API E-commerce

Este es un repositorio que contiene una API para un sistema de comercio electrónico, desarrollada con Node.js y Express.js. Esta API proporciona funcionalidades como registro de usuarios, inicio de sesión, autenticación, subida de fotos utilizando Multer, y paginación de resultados.

## Requisitos

- Node.js instalado en su sistema.
- npm (administrador de paquetes de Node.js) instalado en su sistema.

## Instalación

1. Clona este repositorio en tu máquina local:

https://github.com/dylancrowder/api-ecommerce.git

2. Navega al directorio del proyecto:

cd api-ecommerce


3. Instala las dependencias del proyecto utilizando npm:

npm install


## Uso

Para iniciar el servidor, simplemente ejecuta:

npm start


Luego iniciar el servidor en `http://localhost:8080`

## Endpoints

La API ofrece los siguientes endpoints:
Carts Router:

    GET /cartsview/:uid: Obtiene la vista del carrito para el usuario con el ID especificado.
    POST /add-to-cart/:productId: Agrega un producto al carrito especificado por su ID de producto.
    GET /purcherase/:cid: Obtiene detalles de compra para el carrito especificado por su ID.

Email Endpoints:

    POST /reset-password: Permite restablecer la contraseña del usuario.
    GET /recoverView: Obtiene la vista de recuperación de contraseña.
    GET /password-recovery: Obtiene detalles para la recuperación de contraseña.

Inicio Endpoints:

    GET /chat: Obtiene la funcionalidad de chat.
    GET /profile: Obtiene el perfil del usuario.
    GET /current: Obtiene la sesión actual del usuario.
    GET /mockingproducts: Obtiene productos simulados.

Productos Router:

    GET /products: Obtiene una lista de productos.
    GET /editUser: Obtiene la funcionalidad de edición de usuario.
    GET /getProduct/:pid: Obtiene detalles del producto especificado por su ID.
    POST /product: Agrega un nuevo producto.
    DELETE /deleteProduct/:pid/:uid: Elimina el producto especificado por su ID, asociado al usuario especificado por su ID.

User Endpoints:

    POST /users/:uid/documents: Agrega documentos para el usuario especificado por su ID.
    GET /updateUser/:uid: Obtiene la funcionalidad de actualización de usuario.
    PUT /users/premium/:uid: Actualiza el estado premium del usuario especificado por su ID.
    GET /users: Obtiene una lista de usuarios.
    DELETE /users: Elimina usuarios.
    POST /updateRoles/:email: Actualiza los roles asociados a un usuario mediante su email.
    GET /updateRole: Obtiene la funcionalidad de actualización de roles.

## Tecnologías utilizadas

- Node.js
- Express.js
- Multer
- Mocha.js
- handlebars
- mongo
- mongoose
- nodemailer
- passport.js
- bcrypt.js
- swagger
- cookieParser





