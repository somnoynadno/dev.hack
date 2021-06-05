import axios from 'axios'
import {APIs} from '../config'


export class CurrencyAPI {
    ConvertCurrencyToCurrency(from="", to="", value=0) {
        return new Promise((resolve, reject) => {
            axios.get(`${APIs["CurrencyAPI"]}/convert_currency_to_currency?cur_code_from=${from}&cur_code_to=${to}&value=${value}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }

    GetCurrencyList() {
        return new Promise((resolve, reject) => {
            axios.get(`${APIs["CurrencyAPI"]}/get_currency_list`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }
}

export const currencyAPI = new CurrencyAPI();
