package main

import (
	"dev-hack/services/Backend/EnumAPI/controller"
	u "dev-hack/services/Backend/EnumAPI/utils"
	"github.com/gorilla/mux"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	log "github.com/sirupsen/logrus"
	"net/http"
	"os"
)

func init() {
	log.SetOutput(os.Stdout)
	log.SetLevel(log.DebugLevel)
}

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/api/{any}", u.HandleOptions).Methods(http.MethodOptions)
	router.HandleFunc("/api/{any1}/{any2}", u.HandleOptions).Methods(http.MethodOptions)

	router.HandleFunc("/api/account_types", controller.AccountTypeQuery).Methods(http.MethodGet)
	router.HandleFunc("/api/account_types/{id}", controller.AccountTypeRetrieve).Methods(http.MethodGet)

	router.HandleFunc("/api/bank_account_types", controller.BankAccountTypeQuery).Methods(http.MethodGet)
	router.HandleFunc("/api/bank_account_types/{id}", controller.BankAccountTypeRetrieve).Methods(http.MethodGet)

	router.HandleFunc("/api/transaction_types", controller.TransactionTypeQuery).Methods(http.MethodGet)
	router.HandleFunc("/api/transaction_types/{id}", controller.TransactionTypeRetrieve).Methods(http.MethodGet)

	router.HandleFunc("/api/transaction_tags", controller.TransactionTagsQuery).Methods(http.MethodGet)
	router.HandleFunc("/api/transaction_tags/{id}", controller.TransactionTagsRetrieve).Methods(http.MethodGet)

	router.HandleFunc("/api/ping", u.HandlePing).Methods(http.MethodGet, http.MethodPost)

	router.Handle("/metrics", promhttp.Handler())

	router.Use(CORS)    // enable CORS headers
	router.Use(LogPath) // useful logging

	port := os.Getenv("PORT")
	if port == "" {
		port = "4444" // localhost
	}

	log.Info("listening on:", port)

	err := http.ListenAndServe(":"+port, router)
	if err != nil {
		log.Panic(err)
	}
}
