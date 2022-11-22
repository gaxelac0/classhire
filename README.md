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
5. npm run start

Para finalizar
6. Conectarse a localhost:3000

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

```

# Documentacion
## Backend
Para ver la documentacion de endpoints acceder a localhost:8080/doc con credenciales  admin@admin *_(user@pw)_*

### Dependencias
Insertar tabla


## Frontend

### Dependencias
Insertar tabla