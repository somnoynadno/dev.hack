package utils

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

var (
	PromResponseOK = promauto.NewCounter(prometheus.CounterOpts{
		Name: "http_response_200",
		Help: "Total number of 200 requests",
	})
)

var (
	PromResponseBadRequest = promauto.NewCounter(prometheus.CounterOpts{
		Name: "http_response_400",
		Help: "Total number of 400 requests",
	})
)

var (
	PromResponseNotFound = promauto.NewCounter(prometheus.CounterOpts{
		Name: "http_response_404",
		Help: "Total number of 404 requests",
	})
)

var (
	PromResponseInternalError = promauto.NewCounter(prometheus.CounterOpts{
		Name: "http_response_500",
		Help: "Total number of 500 requests",
	})
)