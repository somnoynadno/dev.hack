package controller

import (
	"dev-hack/services/Backend/TransactionAPI/hub"
	"dev-hack/services/Backend/TransactionAPI/models"
	u "dev-hack/services/Backend/TransactionAPI/utils"
	"encoding/json"
	"errors"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"net/http"
)

var RegisterTransaction = func(w http.ResponseWriter, r *http.Request) {
	var transaction models.Transaction
	err := json.NewDecoder(r.Body).Decode(&transaction)
	if err != nil {
		u.HandleBadRequest(w, err)
		return
	}

	h := hub.GetHub()

	id := uuid.New().String()
	meta, err := json.Marshal(transaction)
	m := string(meta)

	err = h.CreateTransaction(id, models.HubMap["Ожидание СМС-подтверждения"], &m)

	if err != nil {
		u.HandleInternalError(w, err)
	} else {
		u.Respond(w, u.Message(true, id))
	}
}

var ConfirmTransaction = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	id := params["id"]
	code := params["code"]

	var transaction models.Transaction
	err := json.NewDecoder(r.Body).Decode(&transaction)
	if err != nil {
		u.HandleBadRequest(w, err)
		return
	}

	meta, _ := json.Marshal(transaction)
	m := string(meta)

	if code == "0000" {
		err := hub.GetHub().UpdateTransaction(id, models.HubMap["Транзакция подтверждена"], &m)
		if err != nil {
			u.HandleInternalError(w, err)
		}
	} else {
		u.HandleBadRequest(w, errors.New("wrong code"))
	}
}
