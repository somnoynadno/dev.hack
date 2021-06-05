package utils

import (
	"encoding/json"
	"net/http"
)

func Message(status bool, message string) map[string]interface{} {
	return map[string]interface{}{"status": status, "message": message}
}

func Respond(w http.ResponseWriter, data map[string]interface{}) {
	PromResponseOK.Inc()
	_ = json.NewEncoder(w).Encode(data)
}

func RespondJSON(w http.ResponseWriter, data []byte) {
	PromResponseOK.Inc()
	_, _ = w.Write(data)
}

var HandleOptions = func(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

var HandlePing = func(w http.ResponseWriter, r *http.Request) {
	_ = json.NewEncoder(w).Encode(Message(true, "pong"))
}
