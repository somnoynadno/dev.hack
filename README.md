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

### CI/CD

- **CI** based on Github Actions
- **CD** based on crontab: follow ```cd.sh```
