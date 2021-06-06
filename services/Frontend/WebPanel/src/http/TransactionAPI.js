import axios from "axios";
import {APIs} from "../config";

export class TransactionAPI {
    RegisterTransaction(transaction={}) {
        return new Promise((resolve, reject) => {
            axios.post(`${APIs["TransactionAPI"]}/register_transaction`, transaction)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }

    ConfirmTransaction(id="", code="", transaction={}) {
        return new Promise((resolve, reject) => {
            axios.post(`${APIs["TransactionAPI"]}/transaction/${id}/confirm/${code}`, transaction)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }

    SaveTransaction(transaction={}) {
        return new Promise((resolve, reject) => {
            axios.post(`${APIs["TransactionAPI"]}/transaction`, transaction)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }

    GetTransactionsByBankAccountID(id=0) {
        return new Promise((resolve, reject) => {
            axios.get(`${APIs["TransactionAPI"]}/transactions_by_bank_account/${id}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }
}

export const transactionAPI = new TransactionAPI();
