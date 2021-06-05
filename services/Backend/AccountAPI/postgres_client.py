import os
import psycopg2

postgres_host = os.environ.get('POSTGRES_HOST', 'localhost')


class DatabaseClient:
    def __init__(self):
        pass

    def __enter__(self):
        self.conn = psycopg2.connect(dbname='account_db', user='postgres',
                                     password='postgres', host=postgres_host)
        self.cursor = self.conn.cursor()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.cursor:
            self.conn.close()

    def create_table(self):
        self.cursor.execute("""create table if not exists accounts(
id int generated always as identity,
account_type_id int not null,
login varchar(255) not null,
email varchar(255),
password_hash varchar(255) not null);""")
        self.conn.commit()

    def drop_table(self):
        self.cursor.execute("drop table if exists accounts;")
        self.conn.commit()

    def get_user(self, login):
        self.cursor.execute(
            'select * from accounts where login = %s', (str(login),))
        return self.cursor.fetchone()

    def create_user(self, account_type_id, login, email, password_hash):
        self.cursor.execute(
            'INSERT INTO accounts (account_type_id, login, email, password_hash) VALUES (%s, %s, %s, %s)', (account_type_id, login, email, password_hash))
        self.conn.commit()
