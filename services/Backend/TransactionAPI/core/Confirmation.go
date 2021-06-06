package core

import (
	"context"
	"dev-hack/services/Backend/TransactionAPI/hub"
	"dev-hack/services/Backend/TransactionAPI/models"
	"github.com/segmentio/kafka-go"
	log "github.com/sirupsen/logrus"
)

func AwaitConfirmationForever() {
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:   []string{"95.182.120.116:9092"},
		Topic:     models.HubMap["Транзакция подтверждена"],
		Partition: 0,
		MinBytes:  0,    // 0KB
		MaxBytes:  10e6, // 10MB
	})

	h := hub.GetHub()

	log.Debug("Serving messages...")
	for {
		m, err := r.ReadMessage(context.Background())
		if err != nil {
			break
		}

		meta := string(m.Value)
		err = h.UpdateTransaction(string(m.Key), models.HubMap["Ожидание перевода денежных средств"], &meta)
		if err != nil {
			log.Error(err)
			e := err.Error()
			_ = h.UpdateTransaction(string(m.Key), models.HubMap["Произошла ошибка в транзакции"], &e)
		}
	}

	_ = r.Close()
}
