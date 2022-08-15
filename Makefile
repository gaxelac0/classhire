# Levanta un contenedor del backend con todos sus prerequisitos (mongo y db inicializada)
# En caso de existir un mongo utilizara ese, y si no se hace mongodown la data persistira
webup:
	docker compose -f ./backend/docker-compose.yaml up --build web

# Te conecta a la consola de mongo
mongoc:
	docker exec -it mongodb bash

# Levanta un contenedor con mongo y la base de datos de classhire inicializada
mongoup:
	docker compose -f ./backend/docker-compose.yaml up -d --build mongodb
	
# Baja el contenedor y borra los volumes (perdida de data)
mongodown:
	docker compose -f ./backend/docker-compose.yaml down --volumes
	
.PHONY: mongoc mongoup mongodown webup
