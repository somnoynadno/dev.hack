package main

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"net/http"
)

var CORS = func(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")

		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Headers", "*")
		w.Header().Add("Access-Control-Allow-Methods", "GET, OPTIONS")

		next.ServeHTTP(w, r) // proceed in the middleware chain
	})
}

var LogPath = func(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/api/ping" && r.URL.Path != "/metrics" {
			IP := r.Header.Get("X-Real-IP") // depends on nginx
			log.Info(fmt.Sprintf("%s: %s %s (%s)", IP, r.Method, r.RequestURI, r.Host))
		}
		next.ServeHTTP(w, r)
	})
}