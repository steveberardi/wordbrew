FROM python:3.8.5-slim

EXPOSE 8000

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

# Download WordNet database
RUN python -c "import wn; wn.download('pwn:3.1')"

CMD exec gunicorn --bind :8000 --workers 1 --threads 8 --timeout 0 server:app
