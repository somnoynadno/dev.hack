from kafka import KafkaConsumer, KafkaProducer
import json
import requests

consumer = KafkaConsumer("AwaitingForRollback",
                         bootstrap_servers=['somnoynadno.ru:9092'])

producer = KafkaProducer(bootstrap_servers=['somnoynadno.ru:9092'], retries=5)
#user_cancell = "TransactionCancelledByUser"
bank_cancel = "TransactionDeclinedByBank"

def add_money_to_bank_account(id, delta):
    r = requests.post(url="http://bank-account.somnoynadno.ru/add_money", url={"id":id, "delta":delta})
    if r.text == "ok":
        return True
    else:
        return False


for message in consumer:
    trans_key = message.key
    trans_dict = json.loads(message.value)
    if trans_dict["amount_of_hold"] > 0:
        add_money_to_bank_account(trans_dict["account_from"], trans_dict["amount_of_hold"])
    trans_dict["status"] = bank_cancel
    producer.send(bank_cancel, key=trans_key, value=json.dumps(trans_dict).encode())
