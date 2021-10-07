DOCKER_EXEC=docker exec -it wordbrew_backend_1

format:
	$(DOCKER_EXEC) black /app

lint:
	$(DOCKER_EXEC) flake8 /app

build:
	docker compose build

up:
	docker compose up

shell:
	$(DOCKER_EXEC) python

deploy:
	gcloud run deploy --source=./backend --port=8000 --region=us-west2 wordbrew-api

build-frontend:
	docker build ./frontend --target=prod
	
clean:
	rm -rf backend/__pycache__
	rm -rf frontend/dist
	rm -rf frontend/node_modules

.PHONY: clean