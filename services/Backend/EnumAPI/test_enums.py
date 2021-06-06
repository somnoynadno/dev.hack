import unittest
import requests
import json

class TestEnumAPI(unittest.TestCase):
    def test_account_types(self):
        enc = requests.get("http://enum.dev.somnoynadno.ru/api/bank_account_types/1").json()
        r = json.loads(enc)
        self.assertEqual(r["ID"],1)
        self.assertEqual(r["Name"],"DepositAccount")
