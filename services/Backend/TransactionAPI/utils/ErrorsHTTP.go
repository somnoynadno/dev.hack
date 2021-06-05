package utils

import (
	log "github.com/sirupsen/logrus"
	"net/http"
)

// 400
func HandleBadRequest(w http.ResponseWriter, err error) {
	log.Error(err)
	PromResponseBadRequest.Inc()
	w.WriteHeader(http.StatusBadRequest)
	Respond(w, Message(false, "invalid request"))
}

// 404
func HandleNotFound(w http.ResponseWriter, err error) {
	log.Warning(err)
	PromResponseNotFound.Inc()
	w.WriteHeader(http.StatusNotFound)
	Respond(w, Message(false, "not found"))
}

// 500
func HandleInternalError(w http.ResponseWriter, err error) {
	log.Error(err)
	PromResponseInternalError.Inc()
	w.WriteHeader(http.StatusInternalServerError)
	Respond(w, Message(false, err.Error()))
}