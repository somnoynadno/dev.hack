FROM python:3.8

WORKDIR /services/Backend/CurrencyAPI

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

RUN pip install gunicorn gevent

COPY . .

CMD [ "gunicorn", "--bind", "0.0.0.0:6666", "--worker-class", "gevent", "--worker-connections", "1024", "server:app"]
