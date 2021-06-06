# Dev.Hack

Bank core processing in a microservice architecture.

![Screenshot at 2021-06-06 14-43-10](https://user-images.githubusercontent.com/46386987/120916854-8051b100-c69b-11eb-9a5a-e9d158fb5d0e.png)


## Services

- **AccountAPI** - users and administrators
- **BankAccountAPI** - main money storage
- **CurrencyAPI** - currency conversions
- **DocumentAPI** - receipt generator
- **EnumAPI** - all other entities as mockups
- **RollbackService** - operations cancellation
- **TransactionAPI** - banking core operations
- **WebPanel** - main frontend (SPA-application)

## Deployment

### For developer

To deploy your own service:

1. Register domain for it
2. Create Dockerfile and introduce it to ```docker-compose.yml```
3. Add upstream and server location in ```nginx.conf```
4. Append a new target to ```prometheus.yml```

### Transaction JSON Kafka format

```
{
  "json_ver": 2,
  "account_id_from": "",
  "account_id_to": "",
  "currency_code_from": "",
  "currency_code_to": "",
  "currency_amount_from":0,
  "currency_amount_to":0,
  "comission":0,
  "docx_filepath": "",
  "amount_of_hold": 0,
  "type": "SomeEnumValue", 
  "status": "SomeEnumValue"
}
```
- **type** and **status** - enum value
- **amount_of_hold** - will be added to account_from in case of rollback

### CI/CD

- **CI** based on Github Actions
- **CD** based on crontab: follow ```cd.sh```
