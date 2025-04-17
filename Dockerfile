# Which OS are we gonna use
FROM "python:3.11"

WORKDIR /app

ENV PYTHONUNBUFFERED=1

# Install pip and poetry
COPY . /app

RUN pip install poetry && poetry install

CMD ["poetry", "run", "python", "main.py", "runserver", "0.0.0.0:8000", "--noreload"]

EXPOSE 8000