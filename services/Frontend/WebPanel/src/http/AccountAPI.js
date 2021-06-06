import axios from 'axios'
import {APIs} from '../config'


export class AccountAPI {
    RegisterUser(username = "", email = "", password = "") {
        return new Promise((resolve, reject) => {
            axios.post(`${APIs["AccountAPI"]}/register`, {
                username: username,
                password: password,
                email: email,
                account_type_id: 1,
            })
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }

    LoginUser(username = "", email = "", password = "") {
        return new Promise((resolve, reject) => {
            axios.post(`${APIs["AccountAPI"]}/login`, {
                username: username,
                password: password,
                email: email,
            })
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }
}

export const accountAPI = new AccountAPI();
