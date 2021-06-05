package controller

import (
	u "dev-hack/services/Backend/EnumAPI/utils"
	"encoding/json"
	"errors"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

type BankAccountType struct {
	ID      int
	Name    string
	RusName string
}

var bankAccountTypes = []BankAccountType{
	{ID: 1, Name: "DepositAccount", RusName: "Депозитный счёт"},
	{ID: 2, Name: "CreditAccount", RusName: "Кредитный счёт"},
	{ID: 3, Name: "BrokerAccount", RusName: "Брокерский счёт"},
	{ID: 4, Name: "CompanyAccount", RusName: "Счёт для юридеческого лица"},
}

var BankAccountTypeRetrieve = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	id, err := strconv.Atoi(params["id"])
	if err != nil {
		u.HandleBadRequest(w, err)
	}

	for _, a := range bankAccountTypes {
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

var BankAccountTypeQuery = func(w http.ResponseWriter, r *http.Request) {
	res, err := json.Marshal(bankAccountTypes)

	if err != nil {
		u.HandleInternalError(w, err)
	} else {
		u.RespondJSON(w, res)
	}
}
