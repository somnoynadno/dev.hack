from kafka import KafkaProducer
import json

producer = KafkaProducer(bootstrap_servers=['somnoynadno.ru:9092'], retries=5)

dic = {
  "json_ver": 2,
  "account_id_from": "frrr",
  "account_id_to": "tttt",
  "currency_code_from": "eur",
  "currency_code_to": "eur",
  "currency_amount_from":10,
  "currency_amount_to":9,
  "comission":1,
  "docx_filepath": "",
  "amount_of_hold": 0,
  "type": "SomeEnumValue",
  "status": "SomeEnumValue"
}

val = json.dumps(dic).encode()
for i in range(4):
    producer.send('AwaitingForReceiptGeneration',  val,key=b'a'*i)

producer.flush()
print("ok")