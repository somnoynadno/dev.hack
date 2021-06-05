FROM golang:latest
LABEL maintainer="Alexander Zorkin"

WORKDIR /app
ADD . .

RUN go build -o main .
CMD ["/app/main"]
EXPOSE 4444
