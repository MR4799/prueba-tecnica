# Prueba técnica BeGo

## Descripción

Este es el repositorio en el que resolví la prueba técnica que se me hizo llegar el día martes a las 12pm.
A continuación explicaré la funcionalidad de mi API y los problemas a los que enfrenté, así como la manera en la que los resolví.

### API

La API está hecha en TypeScript con Node.js y Express, utilizando algunas dependencias extra, como 'mongoose' para la conexión con la Base de Datos de MongoDB, 'jsonwebtoken' para usar tokens y autenticar identidad de los usuarios y autorizar el uso de todas las rutas de la API, por lo cual será necesario estar logueado para poder hacer uso de cualquier ruta que desee utilizar.
También utilicé 'dotenv' para poder usar las variables de entorno, así como mejorar la seguridad de nuestros tokens y credenciales. Asímismo, decidí añadirle un poco más de seguridad, al encriptar las contraseñas de los usuarios, con ayuda de 'bcrypt'. 
Para consumir la API de Google Places utilicé 'axios'.

Para hacer uso de las rutas de la API es necesario contar con un token de sesión, el cual se obtiene al crear un usuario o al hacer login.
Los tokens duran 4 horas.
El token es importante que se agregue como tipo 'Bearer' para que la autenticación funcione.
Existen rutas para los usuarios que sólo te permiten hacer acciones sobre el usuario activo. Dichas acciones son: obtener la información del usuario activo y actualizar la información del usuario activo. Es por eso que no piden un id para las acciones antes mencionadas.

Este respositorio contiene también un archivo [CHANGELOG.mb](CHANGELOG.md), el cual contiene las merge realizadas de este proyecto. Entre esas merge están todas las del desarrollo de los distintos controladores para cada dominio, así como la merge de dev a master y una última en la que se resuelven algunos bugs.

La ruta de la API es [API](http://localhost:8080/).
Desde esta ruta podemos encontrar 4 dominios distintos:
* [users](http://localhost:8080/users)
    - GET [getAllUsers](http://localhost:8080/users/all)
    - GET [findOneUser](http://localhost:8080/users/one)
    - POST [signup](http://localhost:8080/users/signup)
    - POST [login](http://localhost:8080/users/login)
    - PUT [updateUser](http://localhost:8080/users/update)
    - DELETE [deleteUser](http://localhost:8080/users/delete/:id)
* [trucks](http://localhost:8080/trucks) 
    - GET [getAllTrucks](http://localhost:8080/trucks/all)
    - GET [findOneTruck](http://localhost:8080/trucks/one/:id)
    - POST [createTruck](http://localhost:8080/trucks/add)
    - PUT [updateTruck](http://localhost:8080/trucks/update/:id)
    - DELETE [deleteTruck](http://localhost:8080/trucks/delete/:id)
* [locations](http://localhost:8080/locations)
    - GET [getAllLocations](http://localhost:8080/locations/all)
    - GET [findOneLocation](http://localhost:8080/locations/one/:id)
    - POST [createLocation](http://localhost:8080/locations/add)
    - PUT [updateLocation](http://localhost:8080/locations/update/:id)
    - DELETE [deleteLocation](http://localhost:8080/locations/delete/:id)
* [orders](http://localhost:8080/orders)
    - GET [getAllOrders](http://localhost:8080/orders/all)
    - GET [findOneOrder](http://localhost:8080/orders/one/:id)
    - POST [createOrder](http://localhost:8080/orders/add)
    - PUT [updateOrder](http://localhost:8080/orders/update/:id)
    - PUT [updateOrderStatus](http://localhost:8080/orders/updateStatus/:id)
    - DELETE [deleteLocation](http://localhost:8080/orders/delete/:id)
Cada una de estos dominios tiene sus propios endpoints, según las peticiones que se me hicieron.

* Se necesita de un user para crear trucks.
* Se necesita de un place_id para crear una location,
* Se necesita de un user, un truck y dos locations para crear una orden.
* No pueden existir usuarios repetidos.
* No pueden existir trucks con las mismas plates.
* No pueden existir locations con el mismo place_id.
* No pueden existir orders con la misma location para el pickup y el dropoff.

### Dificultades en el desarrollo y resolución de las mismas

Existen dependencias extras instaladas en el proyecto, las cuales no se utilizan, pero decidí dejarlas para que puedan observar las diferentes maneras en las que intenté consumir la API de Google Places, debido a que nunca la había utilizado y me resultó algo complicado y busqué muchas maneras de hacerlo, hasta que encontré la solución de Axios, siendo la que más sencilla me pareció.

A pesar de las dificultades con el consumo de otra API, el reto principal fue el inicio del desarrollo de este proyecto, debido a la poca familiaridad que tenía con TypeScript y MongoDB, por lo que tardé algo de tiempo en adaptarme a TS, lo cual poco a poco se me facilitó gracias a que principalmente me dedico al desarrollo de API´s utilizando Node.js con JavaScript. Después de un tiempo me resultó intuitivo y mucho mejor trabajar con TS, gracias a la implementación de las interfaces.
Las interfaces mencionadas anteriormente también me ayudaron para conectar la Base de Datos con el servidor.

Continuando con otra de las tecnologías nuevas para mí, MongoDB me pareció muy sencilla de utilizar en primera instancia, al menos para el CRUD básico.
Quería implementar consultas equivalentes a los 'JOIN' de SQL, pero preferí entregar algo funcional a demorarme más tiempo y no lograrlo, aunque me gustaría poder implementarlo como una actualización en un futuro para practicar este tipo de consultas.

Otra situación que enfrenté durante el desarrollo de este proyecto fue que algunos datos en la Base de Datos me solicitaron que fueran de tipo 'ObjectId', pero decidí que fueran de tipo 'String', para minimizar mi tiempo de desarrollo y entregar el proyecto en el tiempo deseado. No descarto una actualización en el futuro para comprender mejor las relaciones de datos y de archivos en MongoDB.

#### Este es mi desarrollo para resolver la problemática que se me presentó. Quedo a la espera de retroalimentación.