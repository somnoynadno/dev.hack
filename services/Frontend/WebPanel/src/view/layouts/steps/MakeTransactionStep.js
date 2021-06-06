import React, {useEffect, useState} from 'react';

import {Button, Form, Input, InputNumber, Select,} from 'antd';
import {bankAccountAPI} from "../../../http/BankAccountAPI";
import {currencyAPI} from "../../../http/CurrencyAPI";


export const MakeTransactionStep = (props) => {
    const defaultTransaction = {
        "json_ver": 2,
        "docx_filepath": "",
        "amount_of_hold": 0,
        "status": "Created",
        "type": props.selectedTransactionType.RusName,
    }

    let [transaction, setTransaction] = useState(defaultTransaction);
    let [accountFrom, setAccountFrom] = useState(null);
    let [accountTo, setAccountTo] = useState(null);
    let [accountToIsNotExist, setAccountToIsNotExist] = useState(false);

    let [accounts, setAccounts] = useState([]);
    let [errorText, setErrorText] = useState("");

    let [nextStep, setNextStep] = useState(false);
    let [nextNextStep, setNextNextStep] = useState(false);
    let [invalidBalance, setInvalidBalance] = useState(false);

    useEffect(() => {
        bankAccountAPI.GetUserBankAccounts().then(r => {
            setAccounts(r)
        }).catch(err => setErrorText("Произошла ошибка при получении счетов."))
    }, []);

    const onFormLayoutChange = async (values) => {
        if (values["account_from"]) {
            values["account_from"] = parseInt(values["account_from"]);
            console.log(values["account_from"], accounts)
            if (accounts) {
                for (let a of accounts) {
                    if (a.id === values["account_from"]) {
                        setAccountFrom(a);
                        console.log('set account from')
                        break;
                    }
                }
            }
        }

        if (values["account_to"]) {
            values["account_to"] = parseInt(values["account_to"]);
            bankAccountAPI.FindBankAccountByID(parseInt(values["account_to"])).then(r => {
                setAccountTo(r);
                setAccountToIsNotExist(false);
                console.log('set account to');
            }).catch((err) => setAccountToIsNotExist(true));
        }

        transaction = Object.assign(transaction, values);
        console.log(transaction);

        if (transaction["currency_amount_from"] && accountTo && accountFrom) {
            currencyAPI.ConvertCurrencyToCurrency(accountFrom.currency_name,
                accountTo.currency_name, values["currency_amount_from"]).then(r => {
                transaction["currency_amount_to"] = r.converted;
                transaction["comission"] = r.comission;
                transaction["currency_code_from"] = accountFrom.currency_name;
                transaction["currency_code_to"] = accountTo.currency_name;

                transaction["account_id_from"] = transaction["account_from"];
                transaction["account_id_to"] = transaction["account_to"];

                setTransaction(transaction);

                if (transaction["currency_amount_to"] > accountFrom.balance || transaction["currency_amount_to"] <= 0) {
                    setInvalidBalance(true);
                    setNextNextStep(false);
                } else {
                    setInvalidBalance(false);
                    setNextNextStep(true);
                }
            }).catch(err => {
                setErrorText("Ошибка конвертации.");
                setNextNextStep(false);
            })
        } else {
            setNextNextStep(false);
            setTransaction(transaction);
            if (transaction["account_to"] && transaction["account_from"]) setNextStep(true);
        }
    };

    return (
        <div style={{margin: 20}}>
            <h2>{props.selectedTransactionType ? props.selectedTransactionType["RusName"] : ''}</h2>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                onValuesChange={onFormLayoutChange}
            >
                <Form.Item validateStatus={accountToIsNotExist ? "error" : "success"} name="account_to"
                           label="Счёт получателя">
                    <Input/>
                </Form.Item>
                <Form.Item name="account_from" label="Счёт списания">
                    <Select>
                        {accounts.map((a, i) => {
                            return <Select.Option key={i} value={a.id}>{a.id}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                {nextStep ? (
                    <div>
                        <Form.Item
                            validateStatus={invalidBalance ? "error" : "success"}
                            name="currency_amount_from" label="Сумма перевода">
                            <InputNumber/>
                        </Form.Item>
                        <Button disabled={!nextNextStep}
                                onClick={() => props.setTransactionCallback(transaction)}>Далее</Button>
                        {
                            nextNextStep ?
                                <div>
                                    <br/>
                                    <i>Получателю
                                        придёт: {transaction["currency_amount_to"]} {accountTo.currency_name}</i>
                                    <br/>
                                    <i>Комиссия операции: {transaction["comission"]} {accountFrom.currency_name}</i>
                                </div> : ''
                        }
                    </div>
                ) : ''}
            </Form>
        </div>
    );
}
