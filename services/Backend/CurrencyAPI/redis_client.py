import redis
import os

redis_host = os.environ.get("REDIS_HOST", "localhost")
redis_port = os.environ.get("REDIS_PORT", "6379")

r = redis.StrictRedis(host=redis_host, port=redis_port, db=0)

accuracy = 10**2
comission_part = 0.01

#temp_dict = {}

def get_bank_comission(cur_code_from, cur_code_to, value):
    return int(convert_currency_to_gold(cur_code_from, value)*comission_part*accuracy)/accuracy

def set_currency_value_in_gold(cur_code, cur_price):
    # we got float, but need keep some signs after comma
    cur_price_int = int(float(cur_price)*accuracy)
    r.set(cur_code,cur_price)
    #temp_dict[cur_code]=cur_price_int   

def _get_currency_value(cur_code):
    #return int(temp_dict[cur_code])
    return int(r.get(cur_code).decode())

def convert_currency_to_gold(cur_code, cur_value):
    cur_price_int = _get_currency_value(cur_code)
    cur_value_int = int(cur_value * accuracy * cur_price_int)
    return cur_value_int / accuracy

def convert_gold_to_currency(cur_code, gold_value):
    cur_price_int = _get_currency_value(cur_code)
    cur_value_int = int(gold_value * accuracy / cur_price_int)
    return cur_value_int / accuracy

def convert_currency_to_currency(cur_code_from, cur_code_to, value):
    gold_value = convert_currency_to_gold(cur_code_from, value)
    return convert_gold_to_currency(cur_code_to, value), get_bank_comission(cur_code_from, cur_code_to, value)

def get_all_currency_prices():
    ans = {}
    for key in r.keys():
        ans[key] = _get_currency_value(key)
    return ans

def get_keys():
    return r.keys()
