package controller

import (
	u "dev-hack/services/Backend/EnumAPI/utils"
	"encoding/json"
	"errors"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

type TransactionTags struct {
	ID      int
	Name    string
	RusName string
	TransactionTypes []TransactionType
}

var transactionTags = []TransactionTags{
	{ID: 1, Name: "Transfers", RusName: "Переводы", TransactionTypes: transactionTypes},
}

var TransactionTagsRetrieve = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	id, err := strconv.Atoi(params["id"])
	if err != nil {
		u.HandleBadRequest(w, err)
	}

	for _, a := range transactionTags {
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

var TransactionTagsQuery = func(w http.ResponseWriter, r *http.Request) {
	res, err := json.Marshal(transactionTags)

	if err != nil {
		u.HandleInternalError(w, err)
	} else {
		u.RespondJSON(w, res)
	}
}
