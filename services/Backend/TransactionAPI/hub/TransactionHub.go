package hub

import (
	"context"
	"github.com/segmentio/kafka-go"
)

type TransactionHub struct {
	Writer *kafka.Writer
}

func NewTransactionHub() TransactionHub {
	w := &kafka.Writer{
		Addr:     kafka.TCP("95.182.120.116:9092"),
		Balancer: &kafka.LeastBytes{},
	}

	return TransactionHub{Writer: w}
}

func (th *TransactionHub) CreateNewTransaction(transaction string) error {
	// Create topic as side-effect
	conn, err := kafka.DialLeader(context.Background(), "tcp", "95.182.120.116:9092", transaction, 0)
	if err != nil {
		return err
	}

	return conn.Close()
}

func (th *TransactionHub) WriteNewStatus(transaction string, status string, meta *string) error {
	err := th.Writer.WriteMessages(context.Background(),
		// NOTE: Each Message has Topic defined, otherwise an error is returned.
		kafka.Message{
			Topic: transaction,
			Key:   []byte(status),
			Value: []byte(*meta),
		},
	)

	return err
}

func (th *TransactionHub) GetLastStatus(transaction string) (*string, error) {
	return nil, nil
}

func (th *TransactionHub) GetTransactionHistory(transaction string) ([]kafka.Message, error) {
	var messages []kafka.Message
	return messages, nil
}
