package controller

import (
	u "dev-hack/services/Backend/EnumAPI/utils"
	"encoding/json"
	"errors"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

type TransactionType struct {
	ID      int
	Name    string
	RusName string
}

var transactionTypes = []TransactionType{
	{ID: 1, Name: "TransferBetweenAccounts", RusName: "Перевод между своими счетами"},
	{ID: 2, Name: "CurrencyConversion", RusName: "Обмен валюты"},
	{ID: 3, Name: "TransferToAnotherUser", RusName: "Перевод другому пользователю"},
}

var TransactionTypeRetrieve = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	id, err := strconv.Atoi(params["id"])
	if err != nil {
		u.HandleBadRequest(w, err)
	}

	for _, a := range transactionTypes {
		if a.ID == id {
			res, err := json.Marshal(a)

			if err != nil {
				u.HandleInternalError(w, err)
			} else {
				u.RespondJSON(w, res)
			}

			return
		}
	}

	u.HandleNotFound(w, errors.New("not found"))
}

var TransactionTypeQuery = func(w http.ResponseWriter, r *http.Request) {
	res, err := json.Marshal(transactionTypes)

	if err != nil {
		u.HandleInternalError(w, err)
	} else {
		u.RespondJSON(w, res)
	}
}
