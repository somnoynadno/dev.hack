package db

import (
	"context"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


var db *mongo.Database

func init() {
	DBName := "transactions"
	URL := "mongodb://mongo:mongo@95.182.120.116:27017"

	ctx := context.Background()
	clientOpts := options.Client().ApplyURI(URL)

	client, err := mongo.Connect(ctx, clientOpts)
	if err != nil {
		panic(err)
	}

	db = client.Database(DBName)
	log.Info("Connected to:", db.Name())
}

func GetDB() *mongo.Database {
	return db
}
