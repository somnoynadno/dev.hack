import os
import psycopg2

postgres_host = os.environ.get('POSTGRES_HOST', 'localhost')


class DatabaseClient:
    def __init__(self):
        pass

    def __enter__(self):
        self.conn = psycopg2.connect(dbname='bank_account_db', user='postgres',
                                     password='postgres', host=postgres_host)
        self.cursor = self.conn.cursor()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.cursor:
            self.conn.close()

    def create_table(self):
        self.cursor.execute("""create table if not exists bank_accounts(
id int generated always as identity,
account_id int not null,
balance decimal not null,
type_id int not null,
currency_name varchar(64) not null);""")
        self.conn.commit()

    def drop_table(self):
        self.cursor.execute("drop table if exists bank_accounts;")
        self.conn.commit()

    def get_account(self, id):
        self.cursor.execute(
            'select * from bank_accounts where id = %s', (str(id),))
        return self.cursor.fetchone()

    def get_accounts_by_parent_id(self, id):
        self.cursor.execute(
            'select * from bank_accounts where account_id = %s', (str(id),))
        return self.cursor.fetchall()

    def create_account(self, account_id, type_id, currency_name):
        self.cursor.execute(
            'INSERT INTO bank_accounts (account_id, balance, type_id, currency_name) VALUES (%s, 100, %s, %s)', (account_id, type_id, currency_name))
        self.conn.commit()

    def set_balance(self, balance, account_id):
        self.cursor.execute(
            'update bank_accounts set balance=%s where account_id=%s', ((balance, account_id)))
        self.conn.commit()

    def update_balance(self, delta, account_id):
        old_balance = self.get_account(account_id)[3]
        balance = old_balance + delta
        self.cursor.execute(
            'update bank_accounts set balance=%s where account_id=%s', ((balance, account_id)))
        self.conn.commit()
