package models

type AccountID int
type TransactionTypeID int

type Transaction struct {
	From            AccountID
	To              AccountID
	TransactionType TransactionTypeID
	Amount          float64
	FilePath        *string
}
