FROM python:3.8.5-slim

EXPOSE 8000

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

# Download WordNet database
RUN python -c "import wn; wn.download('ewn:2020')"

CMD ["flask", "run"]

