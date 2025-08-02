rb-back: 
	docker-compose up -d --build backend
rb-front: 
	docker-compose up -d --build frontend
logs-back: 
	docker logs artboard-backend-1
logs-front: 
	docker logs artboard-frontend-1
shell-back: 
	docker exec -it logs artboard-backend-1 sh
shell-front: 
	docker exec -it logs artboard-frontend-1 sh
