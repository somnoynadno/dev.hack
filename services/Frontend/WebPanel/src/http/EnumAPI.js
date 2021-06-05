import axios from 'axios'
import {APIs} from '../config'


export class EnumAPI {
    GetBankAccountTypes() {
        return new Promise((resolve, reject) => {
            axios.get(`${APIs["EnumAPI"]}/bank_account_types`, )
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }

    GetTransactionTypes() {
        return new Promise((resolve, reject) => {
            axios.get(`${APIs["EnumAPI"]}/transaction_types`, )
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }

    GetTransactionTags() {
        return new Promise((resolve, reject) => {
            axios.get(`${APIs["EnumAPI"]}/transaction_tags`, )
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }
}

export const enumAPI = new EnumAPI();
