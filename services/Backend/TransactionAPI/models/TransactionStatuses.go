package models

var HubMap map[string]string

func init() {
	// Normal flow
	HubMap["Ожидание конвертации"] = "ConversionRequired"
	HubMap["Ожидание подтверждения пользователем"] = "UserConfirmationRequired"
	HubMap["Ожидание СМС-подтверждения"] = "SMSConfirmationRequired"
	HubMap["Ожидание подтверждения сотрудником банка"] = "BankEmployeeConfirmationRequired"
	HubMap["Ожидание транзакции инициатора"] = "AwaitingForSenderTransaction"
	HubMap["Ожидание транзакции получателя"] = "AwaitingForReceiverTransaction"
	HubMap["Ожидание создание чека"] = "AwaitingForReceiptGeneration"
	// Success
	HubMap["Успешная обработка"] = "TransactionSucceed"

	// Error flow
	HubMap["Ожидание отката транзакции"] = "AwaitingForRollback"
	// Error/Cancellation
	HubMap["Транзакция отменена пользователем"] = "TransactionCancelledByUser"
	HubMap["Транзакция отклонена банком"] = "TransactionDeclinedByBank"
	HubMap["Транзакция не удалась"] = "TransactionFailed"
}
