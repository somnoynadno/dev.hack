from kafka import KafkaConsumer, KafkaProducer
import json
import docx_controller

consumer = KafkaConsumer("AwaitingForReceiptGeneration",
                         bootstrap_servers=['somnoynadno.ru:9092'])

producer = KafkaProducer(bootstrap_servers=['somnoynadno.ru:9092'], retries=5)
success_topic = "TransactionSucceed"
fail_topic = "TransactionFailed"

def create_document_from_message(trans_dict):
    if trans_dict["json_ver"] != 2:
        raise Exception("Wrong json ver")

    filename = trans_dict["docx_filepath"]
    
    account_from = trans_dict["account_id_from"]
    account_to = trans_dict["account_id_to"]
    currency_code_from = trans_dict["currency_code_from"]
    currency_code_to = trans_dict["currency_code_to"]
    currency_value_from = trans_dict["currency_amount_from"]
    currency_value_to = trans_dict["currency_amount_to"]
    comission = trans_dict["comission"]
    status = trans_dict["status"]

    docx_controller.create_operation_status_docx(account_from, account_to, currency_code_from, currency_code_to, currency_value_from, currency_value_to, status, comission, filename)

for message in consumer:
    trans_key = message.key
    trans_dict = json.loads(message.value)
    print(f"new transaction got: {trans_dict}")
    try:
        trans_dict["status"] = "Успешная обработка"
        create_document_from_message(trans_dict)
        trans_dict["status"] = "TransactionSucceed"
        producer.send(success_topic, key=trans_key, value=json.dumps(trans_dict).encode())
    except Exception:
        trans_dict["status"] = "TransactionFailed"
        producer.send(fail_topic, key=trans_key, value=json.dumps(trans_dict).encode())
    print(trans_dict["status"])
    producer.flush()
