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

format: $(VENV)/bin/activate
	$(BIN)/black src/backend/*

lint: $(VENV)/bin/activate
	$(BIN)/flake8 src/backend/*

devserver: export FLASK_ENV=development
devserver: export FLASK_APP=src/backend/devserver
devserver: export FLASK_RUN_PORT=8000
devserver:
	$(BIN)/flask run	

start:
	$(BIN)/honcho start

clean:
	rm -rf __pycache__
	rm -rf $(VENV)

.PHONY: run clean