# Te conecta a la consola de mongo
mongoc:
	docker exec -it mongodb bash

# Levanta un contenedor con mongo y la base de datos de classhire inicializada
mongoup:
	docker compose -f ./backend/docker-compose.yaml up -d --build mongodb
	
# Baja el contenedor y borra los volumes (perdida de data)
mongodown:
	docker compose -f ./backend/docker-compose.yaml down --volumes
	
.PHONY: mongoc mongoup mongodown
