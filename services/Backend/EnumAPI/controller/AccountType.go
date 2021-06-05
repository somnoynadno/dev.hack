package controller

import (
	u "dev-hack/services/Backend/EnumAPI/utils"
	"encoding/json"
	"errors"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

type AccountType struct {
	ID      int
	Name    string
	RusName string
}

var accountTypes = []AccountType{
	{ID: 1, Name: "User", RusName: "Пользователь"},
	{ID: 2, Name: "BankEmployee", RusName: "Сотрудник банка"},
	{ID: 3, Name: "Administrator", RusName: "Администратор системы"},
}

var AccountTypeRetrieve = func(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	id, err := strconv.Atoi(params["id"])
	if err != nil {
		u.HandleBadRequest(w, err)
	}

	for _, a := range accountTypes {
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

var AccountTypeQuery = func(w http.ResponseWriter, r *http.Request) {
	res, err := json.Marshal(accountTypes)

	if err != nil {
		u.HandleInternalError(w, err)
	} else {
		u.RespondJSON(w, res)
	}
}
