package dao

import (
	"context"
	"dev-hack/services/Backend/TransactionAPI/db"
	"dev-hack/services/Backend/TransactionAPI/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateTransaction(transaction models.Transaction) (*mongo.InsertOneResult, error) {
	transactionsDB := db.GetDB().Collection("transactions")
	return transactionsDB.InsertOne(context.TODO(), transaction)
}

func GetTransactionByID(transactionID string) *mongo.SingleResult {
	transactionsDB := db.GetDB().Collection("transactions")
	objID, _ := primitive.ObjectIDFromHex(transactionID)
	return transactionsDB.FindOne(context.TODO(), bson.M{"_id": objID})
}

func GetTransactionsByBankAccountID(bankAccountID int) (*mongo.Cursor, error) {
	transactionsDB := db.GetDB().Collection("transactions")
	return transactionsDB.Find(context.TODO(), bson.M{"account_id_from": bankAccountID})
}