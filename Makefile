PROJECT_ID=$(shell gcloud config get-value core/project)
REPO_NAME=$(shell basename $(CURDIR))
SHORT_SHA=$(shell git rev-parse --short head)
DOCKER_EXEC=docker exec -it wordbrew_backend
DOCKER_RUN=docker run -v $(shell pwd)/backend/src:/app/src wordbrew_backend bash -c

format:
	$(DOCKER_RUN) "black /app/src"

lint:
	$(DOCKER_RUN) "flake8 /app/src"

test:
	$(DOCKER_RUN) "pytest --cov=/app/src --cov-report=term --cov-report=html /app/src"

build:
	docker compose build

up:
	docker compose up

shell:
	$(DOCKER_EXEC) python

bash:
	$(DOCKER_EXEC) bash

gcp-test:
	$(info Running GCP Test Build [$(REPO_NAME):$(SHORT_SHA)] in [$(PROJECT_ID)])
	gcloud builds submit --substitutions REPO_NAME=$(REPO_NAME),SHORT_SHA=$(SHORT_SHA) --config=./cloudbuild/test.yml

gcp-deploy:
	$(info Running GCP Deploy Build [$(REPO_NAME):$(SHORT_SHA)] in [$(PROJECT_ID)])
	gcloud builds submit --substitutions REPO_NAME=$(REPO_NAME),SHORT_SHA=$(SHORT_SHA) --config=./cloudbuild/deploy.yml

frontend-prod:
	docker run --rm -it -v $(shell pwd)/frontend/build:/app/build $(shell docker build ./frontend -q --target=prod)

clean:
	rm -rf backend/__pycache__ backend/htmlcov
	rm -rf frontend/build frontend/dist
	rm -rf frontend/node_modules

.PHONY: clean gcp-test gcp-deploy