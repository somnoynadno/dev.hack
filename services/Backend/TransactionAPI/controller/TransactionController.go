package controller

import (
	"dev-hack/services/Backend/TransactionAPI/models"
	u "dev-hack/services/Backend/TransactionAPI/utils"
	"encoding/json"
	"net/http"
)

var CreateTransaction = func(w http.ResponseWriter, r *http.Request) {
	transaction := &models.Transaction{}
	err := json.NewDecoder(r.Body).Decode(transaction)

	// TODO: create transaction

	if err != nil {
		u.HandleInternalError(w, err)
	} else {
		res, _ := json.Marshal(transaction)
		u.RespondJSON(w, res)
	}
}

