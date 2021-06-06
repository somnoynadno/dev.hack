import unittest
import requests

class TestEnumAPI(unittest.TestCase):
    def test_account_types(self):
        r = requests.get("http://enum.dev.somnoynadno.ru/api/bank_account_types/1").json
        self.assertEqual(r["ID"],1)
        self.assertEqual(r["Name"],"DepositAccount")
