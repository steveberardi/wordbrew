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

up:
	docker compose up

shell:
	docker exec -it wordbrew_backend_1 python

clean:
	rm -rf __pycache__
	rm -rf $(VENV)

.PHONY: run clean