import axios from 'axios'
import {APIs} from '../config'


export class BankAccountAPI {
    CreateBankAccount(bankAccountTypeID=1, currencyName="") {
        return new Promise((resolve, reject) => {
            axios.post(`${APIs["BankAccountAPI"]}/new_account`, {
                bank_account_type_id: bankAccountTypeID,
                currency_name: currencyName,
            })
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }

    FindBankAccountByID(bankAccountID) {
        return new Promise((resolve, reject) => {
            axios.get(`${APIs["BankAccountAPI"]}/find_account?id=${bankAccountID}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }
}

export const bankAccountAPI = new BankAccountAPI();
