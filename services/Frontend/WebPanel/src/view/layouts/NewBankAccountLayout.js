import React, {useEffect, useState} from 'react';
import {Button, Form, Select} from "antd";
import history from "../../history";
import {currencyAPI} from "../../http/CurrencyAPI";
import {bankAccountAPI} from "../../http/BankAccountAPI";
import {enumAPI} from "../../http/EnumAPI";

export const NewBankAccountLayout = () => {
    let [currencies, setCurrencies] = useState([]);
    let [accountTypes, setAccountTypes] = useState([]);
    let [errorText, setErrorText] = useState("");

    let [bankAccount, setBankAccount] = useState({});

    const onFormLayoutChange = (values) => {
        let a = Object.assign(bankAccount, values);
        setBankAccount(a);
    };

    useEffect(() => {
        currencyAPI.GetCurrencyList().then(r => {
            setCurrencies(r);
        }).catch(err => setErrorText("Произошла ошибка при получении валют."));

        enumAPI.GetBankAccountTypes().then(r => {
            setAccountTypes(r);
        }).catch(err => setErrorText("Произошла ошибка при получении типов счетов."));
    }, []);

    const createNewBankAccount = async () => {
        await bankAccountAPI.CreateBankAccount(bankAccount.bank_account_type_id, bankAccount.currency_name);
        history.push('/bank_accounts');
    }

    return (
        <div style={{padding: 15}}>
            <h2>Создание нового счёта</h2>
            <br/>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                onValuesChange={onFormLayoutChange}
            >
                <Form.Item name="bank_account_type_id" label="Тип счёта">
                    <Select>
                        {accountTypes.map((at, i) => {
                            return <Select.Option key={i} value={at.ID}>{at.RusName}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="currency_name" label="Валюта">
                    <Select>
                        {currencies.map((c, i) => {
                            return <Select.Option key={i} value={c}>{c}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Button style={{marginLeft: 100}} size={"lg"} onClick={() => createNewBankAccount()}>Создать</Button>
            </Form>
        </div>
    );
}
