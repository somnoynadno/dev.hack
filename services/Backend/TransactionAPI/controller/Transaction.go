package controller

import (
	"dev-hack/services/Backend/TransactionAPI/db/dao"
	"dev-hack/services/Backend/TransactionAPI/models"
	u "dev-hack/services/Backend/TransactionAPI/utils"
	"encoding/json"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
)

var CreateTransaction = func(w http.ResponseWriter, r *http.Request) {
	var transaction models.Transaction
	err := json.NewDecoder(r.Body).Decode(&transaction)
	if err != nil {
		u.HandleBadRequest(w, err)
		return
	}

	result, err := dao.CreateTransaction(transaction)
	if err != nil {
		u.HandleBadRequest(w, err)
	} else {
		objectID := result.InsertedID.(primitive.ObjectID)
		log.Debug("Created ID: ", objectID.Hex())

		res, _ := json.Marshal(transaction)
		u.RespondJSON(w, res)
	}
}
