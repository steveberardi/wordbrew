VENV=venv
BIN=$(VENV)/bin
PIP=$(BIN)/pip
PYTHON=$(BIN)/python

run: $(VENV)/bin/activate
	$(PYTHON) src/backend/app.py

venv/bin/activate: requirements.txt requirements-dev.txt
	python -m venv $(VENV)
	$(PIP) install -r requirements.txt
	$(PIP) install -r requirements-dev.txt

envfile:
	cp .env.dev .env

shell: $(VENV)/bin/activate
	$(PYTHON)

format: $(VENV)/bin/activate
	$(BIN)/black src/backend/*

lint: $(VENV)/bin/activate
	$(BIN)/flake8 src/backend/*

docker-build:
	docker image build -t wordbrew .

docker-run:
	docker run -p 5001:5000 -d wordbrew

server:
	$(BIN)/flask run

start:
	$(BIN)/honcho -e .env,.env.dev start

clean:
	rm -rf __pycache__
	rm -rf $(VENV)

.PHONY: run clean