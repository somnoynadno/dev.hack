package hub

import (
	"context"
	"dev-hack/services/Backend/TransactionAPI/models"
	"github.com/segmentio/kafka-go"
	log "github.com/sirupsen/logrus"
)

type TransactionStatusHub struct {
	Writer *kafka.Writer
}

func NewTransactionStatusHub() TransactionStatusHub {
	w := &kafka.Writer{
		Addr:     kafka.TCP("95.182.120.116:9092"),
		Balancer: &kafka.LeastBytes{},
	}

	tsh := TransactionStatusHub{Writer: w}
	tsh.createAllStatuses()

	return tsh
}

func (tsh *TransactionStatusHub) createAllStatuses() {
	// Create topic as side-effect
	for _, v := range models.HubMap {
		conn, err := kafka.DialLeader(context.Background(), "tcp", "95.182.120.116:9092", v, 0)
		if err != nil {
			log.Error(err)
		}

		_ = conn.Close()
	}
}

func (tsh *TransactionStatusHub) WriteNewStatus(transaction string, status string, meta *string) error {
	err := tsh.Writer.WriteMessages(context.Background(),
		// NOTE: Each Message has Topic defined, otherwise an error is returned.
		kafka.Message{
			Topic: status,
			Key:   []byte(transaction),
			Value: []byte(*meta),
		},
	)

	return err
}
