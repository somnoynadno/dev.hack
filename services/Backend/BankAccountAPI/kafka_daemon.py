from kafka import KafkaConsumer, KafkaProducer
import json
from postgres_client import DatabaseClient

def runner():
    consumer = KafkaConsumer("AwaitingForMoneyTransfer",
                             bootstrap_servers=['somnoynadno.ru:9092'])

    producer = KafkaProducer(bootstrap_servers=['somnoynadno.ru:9092'], retries=5)
    success_topic = "AwaitingForReceiptGeneration"
    fail_topic = "TransactionFailed"


    for message in consumer:
        trans_key = message.key
        trans_dict = json.loads(message.value)
        print(f"new transaction got: {trans_dict}")
        try:
            with DatabaseClient() as db:
                db.update_balance(-trans_dict["currency_amount_from"], trans_dict["account_id_from"])
                db.update_balance(trans_dict["currency_amount_to"], trans_dict["account_id_to"])
                trans_dict["status"] = "AwaitingForReceiptGeneration"
                producer.send(success_topic, key=trans_key, value=json.dumps(trans_dict).encode())
        except Exception as e:
            print(e)
            trans_dict["status"] = "TransactionFailed"
            producer.send(fail_topic, key=trans_key, value=json.dumps(trans_dict).encode())
        print(trans_dict["status"])
        producer.flush()
