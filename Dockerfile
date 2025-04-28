# Which OS are we gonna use
FROM "python:3.11"

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip \
 && pip install fastapi uvicorn sqlalchemy jinja2

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
