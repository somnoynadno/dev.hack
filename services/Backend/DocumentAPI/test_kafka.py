from kafka import KafkaProducer, KafkaConsumer
import json
import unittest

producer = KafkaProducer(bootstrap_servers=['somnoynadno.ru:9092'], retries=5)
trans_id = b"TEST_TEST_TEST"

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

def send():
    val = json.dumps(dic).encode()
    for i in range(4):
        producer.send('AwaitingForReceiptGeneration',  val, key=trans_id)

    producer.flush()
    print("ok")

def wait_for_success():
    consumer = KafkaConsumer("TransactionSucceed",
                         bootstrap_servers=['somnoynadno.ru:9092'], consumer_timeout_ms=5000)
    for message in consumer:
        trans_key = message.key
        if trans_key == trans_id:
            return True


class TestDocumentAPI(unittest.TestCase):
    def test_one_trans(self):
        send()
        res = wait_for_success()
        self.assertTrue(res)