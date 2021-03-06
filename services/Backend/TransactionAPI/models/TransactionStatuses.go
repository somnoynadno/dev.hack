package models

var HubMap = make(map[string]string)

func init() {
	// Normal flow
	HubMap["Ожидание конвертации"] = "ConversionRequired"
	HubMap["Ожидание подтверждения пользователем"] = "UserConfirmationRequired"
	HubMap["Ожидание СМС-подтверждения"] = "SMSConfirmationRequired"
	HubMap["Ожидание подтверждения сотрудником банка"] = "BankEmployeeConfirmationRequired"
	HubMap["Транзакция подтверждена"] = "TransactionConfirmed"
	HubMap["Ожидание перевода денежных средств"] = "AwaitingForMoneyTransfer"
	HubMap["Ожидание создание чека"] = "AwaitingForReceiptGeneration"
	// Success
	HubMap["Успешная обработка"] = "TransactionSucceed"

	// Error flow
	HubMap["Ожидание отката транзакции"] = "AwaitingForRollback"
	// Error/Cancellation
	HubMap["Транзакция отменена пользователем"] = "TransactionCancelledByUser"
	HubMap["Транзакция отклонена банком"] = "TransactionDeclinedByBank"
	HubMap["Произошла ошибка в транзакции"] = "TransactionFailed"
}
