package main

import (
	"dev-hack/services/Backend/TransactionAPI/controller"
	u "dev-hack/services/Backend/TransactionAPI/utils"
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
	router.HandleFunc("/api/{any1}/{any2}/{any3}", u.HandleOptions).Methods(http.MethodOptions)
	router.HandleFunc("/api/{any1}/{any2}/{any3}/{any4}", u.HandleOptions).Methods(http.MethodOptions)

	router.HandleFunc("/api/register_transaction", controller.RegisterTransaction).Methods(http.MethodPost)
	router.HandleFunc("/api/transaction/{id}/confirm/{code}", controller.ConfirmTransaction).Methods(http.MethodPost)


	router.HandleFunc("/api/transaction", controller.CreateTransaction).Methods(http.MethodPost)
	router.HandleFunc("/api/transaction/{id}", controller.GetTransactionByID).Methods(http.MethodGet)
	router.HandleFunc("/api/transactions_by_bank_account/{id}", controller.GetTransactionsByBankAccountID).Methods(http.MethodGet)

	router.Handle("/metrics", promhttp.Handler())

	router.Use(CORS)    // enable CORS headers
	router.Use(LogPath) // useful logging

	port := os.Getenv("PORT")
	if port == "" {
		port = "5555" // localhost
	}

	log.Info("listening on:", port)

	err := http.ListenAndServe(":"+port, router)
	if err != nil {
		log.Panic(err)
	}
}
