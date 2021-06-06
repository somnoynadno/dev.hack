FROM python:3.8

WORKDIR /services/Backend/BankAccountAPI

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python3", "server.py"]
