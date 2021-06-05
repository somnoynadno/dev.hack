package hub

type Hub struct {
	TransactionHub       TransactionHub
	TransactionStatusHub TransactionStatusHub
}

func (h *Hub) CreateTransaction(transaction string, status string, meta *string) error {
	err := h.TransactionHub.CreateNewTransaction(transaction)
	if err != nil {
		return err
	}

	return h.UpdateTransaction(transaction, status, meta)
}

func (h *Hub) UpdateTransaction(transaction string, status string, meta *string) error{
	err := h.TransactionHub.WriteNewStatus(transaction, status, meta)
	if err != nil {
		return err
	}

	return h.TransactionStatusHub.WriteNewStatus(transaction, status, meta)
}

var hub *Hub

func init() {
	hub = &Hub{
		TransactionStatusHub: NewTransactionStatusHub(),
		TransactionHub: NewTransactionHub(),
	}
}

func GetHub() *Hub {
	return hub
}
