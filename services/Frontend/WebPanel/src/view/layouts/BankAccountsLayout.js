import React, {useState, useEffect} from 'react';
import {Button, List} from 'antd';
import {WalletOutlined} from '@ant-design/icons';
import history from "../../history";
import {bankAccountAPI} from "../../http/BankAccountAPI";

const data = [
    {
        title: '123412351234',
    },
    {
        title: '123412351234',
    },
    {
        title: '123412351234',
    },
    {
        title: '123412351234',
    },
];

export const BankAccountsLayout = () => {
    let [accounts, setAccounts] = useState([]);
    let [errorText, setErrorText] = useState("");

    useEffect(() => {
        bankAccountAPI.GetUserBankAccounts().then(r => {
            setAccounts(r)
        }).catch(err => setErrorText("Произошла ошибка при получении счетов."))
    }, [])

    return (
        <>
            <List
                style={{marginLeft: 15, marginTop: 10, padding: 5}}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item className="clickable"
                               onClick={() => history.push(`/bank_account/${item.title}`)}>
                        <List.Item.Meta
                            avatar={<WalletOutlined style={{fontSize: "3em"}}/>}
                            title={<h3>{"Депозитный счёт №" + item.title}</h3>}
                            description={<h3>534 rub</h3>}
                        />
                    </List.Item>
                )}
            />
            <Button size={"lg"} onClick={() => history.push('/new_bank_account')}>Добавить новый</Button>
        </>
    );
}
