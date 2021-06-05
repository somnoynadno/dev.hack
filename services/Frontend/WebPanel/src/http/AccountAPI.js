import axios from 'axios'
import {APIs} from '../config'


export class AccountAPI {
    LoginUser(username = "", email = "", password = "") {
        return new Promise((resolve, reject) => {
            axios.post(`${APIs["AccountAPI"]}/login`, {
                username: username,
                password: password,
                email: email
            })
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }

    GetUserBankAccounts() {
        return new Promise((resolve, reject) => {
            axios.get(`${APIs["AccountAPI"]}/bank_accounts`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }
}

export const accountAPI = new AccountAPI();
