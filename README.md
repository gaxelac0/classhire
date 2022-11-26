# Tabla de Contenidos
1. [Introducción](#Introduccion)
2. [Instalación](#Instalacion)
3. [Documentación](#Documentacion)
4. [Equipo de Trabajo](#Team)
5. [Conclusión](#End)


# Introduccion
Este trabajo se realizo para la materia "Aplicaciones Interativas" ciclo 2022.
Proyecto que conecta profesores con estudiantes a traves de la contratacion de clases y la gestion de las mismas dentro de la aplicacion. 
Utiliza react en el frontend, express y mongo en el backend, y el estandar JWT para autenticacion y autorizacion.

# Instalacion

### Opcion 1: Docker / Docker Compose
Es la manera mas facil. El backend esta dockerizado junto a un contenedor de mongo con los scripts de inicializacion de la base de datos. Con correr make webup se generan ambos contenedores. El frontend se necesita levantar por separado, no esta contenerizado.

#### Prerequisitos
```
Tener instalado y corriendo docker + docker compose
Tener makefile
```
```
1. git clone git@github.com:gaxelac0/classhire.git

Backend
2. cd ./classhire
3. make webup

Frontend
4. cd ./frontend
6. npm install --save --force (el --force es obligatorio por una dependencia utilizada)
7. npm run start

Para finalizar
8. Conectarse a localhost:3000

```


### Opcion 2: Node y NPM
Sin Docker.

#### Prerequisitos
```
Tener NodeJS, npm...
```
```
Backend
1. git clone git@github.com:gaxelac0/classhire.git
2. cd ./classhire/backend
3. npm install
4. node ./bin/www.js


Frontend
5. cd ../frontend
6. npm run start
7. Conectarse a localhost:3000
8. Credenciales de prueba con clases y contrataciones cargadas: 
    - Estudiante: student@uade.edu.ar pw 123456
    - Profesor: teacher@uade.edu.ar pw 123456

```

### Debugging
#### Prerequisitos
```
Tener VSCode
Tener makefile
```
```
Para debuggear, pararse en la raiz del repositorio y ejecutar
1. make code

Backend: quedarse en la carpeta raiz y ejecutar
2. make webup en la terminal de VSCode.
3. F5 en la pantalla de VSCode hara un attach al proceso en el contenedor.

Frontend:
4. cd ./frontend
5. npm run start en la terminal de VSCode.
6. F5 en la pantalla de VSCode hara un attach al proceso corriendo en la maquina.
7. Conectarse a localhost:3000
8. Credenciales de prueba con clases y contrataciones cargadas: 
    - Estudiante: student@uade.edu.ar pw 123456
    - Profesor: teacher@uade.edu.ar pw 123456
```

# Documentacion
## Backend
Para ver la documentacion (Swagger) de endpoints acceder a localhost:8080/doc con credenciales  admin@admin *_(user@pw)_*

Para ver documentacion especifica de backend, dirigirse a https://github.com/gaxelac0/classhire/blob/main/backend/README.md


## Frontend
Para ver documentacion especifica de frontend, dirigirse a https://github.com/gaxelac0/classhire/blob/main/frontend/README.md

# Team
| Nombre                    | Legajo    | Tareas                           |
| ------------------------- | --------- | -------------------------------- |
| Lacuesta, Gaston Axel     | 1117695   | Backend, Frontend, Documentacion, QA |
| Dodaro, Luciano           | 1052888   | Backend, Frontend, Documentacion, QA |



# End
Al comienzo de este proyecto ninguno de los integrantes sabiamos React ni nada de frontend. En este proyecto aprendimos a disenar, implementar e integrar con el backend una pagina completa desde cero, lo cual es de gran valor para nuestra carrera. Del lado del backend era la segunda vez que implementamos algo en Javascript/NodeJS asi que esto ayudo a mejorar los conocimientos respecto a este lenguaje. Lo mismo paso con la base de datos, primera vez que se utiliza mongo y javascript en una aplicacion de backend. 