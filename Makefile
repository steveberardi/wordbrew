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
	gcloud builds submit

frontend-prod:
	docker run --rm -it -v $(shell pwd)/frontend:/app $(shell docker build ./frontend -q --target=prod)

clean:
	rm -rf backend/__pycache__
	rm -rf frontend/build
	rm -rf frontend/node_modules

.PHONY: clean