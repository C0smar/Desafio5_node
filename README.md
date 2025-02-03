# Desafío - Tienda de Joyas

Este proyecto es una API REST desarrollada para la tienda de joyas **My Precious Spa**. La API permite gestionar el inventario de joyas, ofreciendo funcionalidades como límite de recursos, filtrado, paginación, ordenamiento y una estructura de datos HATEOAS.

## Requisitos

- Node.js
- PostgreSQL
- Thunder Client (para pruebas)

## Configuración

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/desafio-tienda-joyas.git
   cd desafio-tienda-joyas
   
Instala las dependencias:

npm install

Configura la base de datos:

Crea una base de datos en PostgreSQL llamada joyas.

Ejecuta el siguiente script SQL para crear la tabla y insertar datos iniciales:


CREATE TABLE inventario (
    id SERIAL,
    nombre VARCHAR(50),
    categoria VARCHAR(50),
    metal VARCHAR(50),
    precio INT,
    stock INT
);

INSERT INTO inventario values
  (DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
  
  (DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
  
  (DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
  
  (DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
  
  (DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
  
  (DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);
  
  Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

DATABASE_URL=postgres://postgres:tu-contraseña@localhost:5432/joyas

Asegúrate de reemplazar tu-contraseña con la contraseña de tu usuario de PostgreSQL.

Ejecución

Para iniciar el servidor, ejecuta el siguiente comando:

npm start

El servidor estará disponible en http://localhost:3000.

Endpoints

1. Obtener todas las joyas
   
URL: /joyas

Método: GET

Parámetros opcionales:

limits: Limita la cantidad de joyas a devolver por página.

page: Define la página.

order_by: Ordena las joyas según el valor de este parámetro, ejemplo: stock_ASC.

Ejemplo de solicitud:

GET http://localhost:3000/joyas?limits=3&page=2&order_by=stock_ASC

2. Filtrar joyas
3. 
URL: /joyas/filtros

Método: GET

Parámetros opcionales:

precio_min: Filtra las joyas con un precio mayor al valor recibido.

precio_max: Filtra las joyas con un precio menor al valor recibido.

categoria: Filtra las joyas por la categoría.

metal: Filtra las joyas por el metal.

Ejemplo de solicitud:

GET http://localhost:3000/joyas/filtros?precio_min=25000&precio_max=30000&categoria=aros&metal=plata

Pruebas

Puedes utilizar Thunder Client (una extensión de VS Code) para realizar pruebas a los endpoints.

Instala Thunder Client desde el marketplace de VS Code.

Abre Thunder Client y crea una nueva solicitud.

Configura la URL y los parámetros según el endpoint que desees probar.

Envía la solicitud y verifica la respuesta.
