package controller

import (
	"context"
	"dev-hack/services/Backend/TransactionAPI/db/dao"
	"dev-hack/services/Backend/TransactionAPI/models"
	u "dev-hack/services/Backend/TransactionAPI/utils"
	"encoding/json"
	"errors"
	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
	"strconv"
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

var GetTransactionByID = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	id := params["id"]
	result := dao.GetTransactionByID(id)

	if result != nil {
		var transaction models.Transaction
		_ = result.Decode(transaction)

		res, _ := json.Marshal(transaction)
		u.RespondJSON(w, res)
	} else {
		u.HandleNotFound(w, errors.New("not found"))
	}
}

var GetTransactionsByBankAccountID = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	id, _ := strconv.Atoi(params["id"])
	result, err := dao.GetTransactionsByBankAccountID(id)
	if err != nil {
		u.HandleInternalError(w, err)
		return
	}

	if result != nil {
		var transactions []bson.M
		err = result.All(context.TODO(), &transactions)
		if err != nil {
			u.HandleInternalError(w, err)
		}

		res, _ := json.Marshal(transactions)
		u.RespondJSON(w, res)
	} else {
		u.HandleNotFound(w, errors.New("not found"))
	}
}
