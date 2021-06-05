package models

import "github.com/jinzhu/gorm"

type AccountID int
type CurrencyID int
type TransactionTypeID int

type Transaction struct {
	gorm.Model
	From            AccountID
	To              AccountID
	Currency        CurrencyID
	TransactionType TransactionTypeID
	Amount          float64
}
