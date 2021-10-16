PROJECT_ID:=$(shell gcloud config get-value core/project)
REPO_NAME:=$(shell basename $(CURDIR))
SHORT_SHA:=$(shell git rev-parse --short head)
DOCKER_EXEC=docker exec -it wordbrew_backend

format:
	$(DOCKER_EXEC) black /app

lint:
	$(DOCKER_EXEC) flake8 /app

test:
	$(DOCKER_EXEC) pytest --cov=/app --cov-report=term --cov-report=html /app

build:
	docker compose build

up:
	docker compose up

shell:
	$(DOCKER_EXEC) python

deploy:
	$(info Deploying [$(REPO_NAME):$(SHORT_SHA)] to [$(PROJECT_ID)])
	gcloud builds submit --substitutions REPO_NAME=$(REPO_NAME),SHORT_SHA=$(SHORT_SHA)

frontend-prod:
	docker run --rm -it -v $(shell pwd)/frontend:/app $(shell docker build ./frontend -q --target=prod)

clean:
	rm -rf backend/__pycache__
	rm -rf frontend/build
	rm -rf frontend/node_modules

.PHONY: clean deploy