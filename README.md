# Dev.Hack

Bank core processing in a microservice architecture.

## Services

*Will be here very soon*

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
  "json_ver": 1,
  "account_id_from": "",
  "account_id_to": "",
  "currency_code_from": "",
  "currency_code_to": "",
  "docx_filepath": "",
  "amount_of_hold": 0,
  "type": 0,
  "status": 0
}
```
type, status - enum value
amount_of_hold - will be added to account_from in case of rollback

### CI/CD

- **CI** based on Github Actions
- **CD** based on crontab: follow ```cd.sh```
