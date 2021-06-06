import React, {useState, useEffect} from 'react';
import {Button, List} from 'antd';
import {WalletOutlined} from '@ant-design/icons';
import history from "../../history";
import {bankAccountAPI} from "../../http/BankAccountAPI";
import {enumAPI} from "../../http/EnumAPI";

export const BankAccountsLayout = () => {
    let [accounts, setAccounts] = useState([]);
    let [accountTypes, setAccountTypes] = useState({});
    let [errorText, setErrorText] = useState("");

    useEffect(() => {
        enumAPI.GetBankAccountTypes().then(r => {
            let res = {};
            for (let e of r) {
                res[e.ID] = e.RusName;
            }
            setAccountTypes(res);
        })
        bankAccountAPI.GetUserBankAccounts().then(r => {
            setAccounts(r)
        }).catch(err => setErrorText("Произошла ошибка при получении счетов."))
    }, [])

    return (
        <>
            <List
                style={{marginLeft: 15, marginTop: 10, padding: 5}}
                itemLayout="horizontal"
                dataSource={accounts}
                renderItem={item => (
                    <List.Item className="clickable"
                               onClick={() => history.push(`/bank_account/${item.id}`)}>
                        <List.Item.Meta
                            avatar={<WalletOutlined style={{fontSize: "3em"}}/>}
                            title={<h3>{`${accountTypes[item.type_id]} №${item.id}`}</h3>}
                            description={<h3>{item.balance} {item.currency_name}</h3>}
                        />
                    </List.Item>
                )}
            />
            <Button size={"lg"} onClick={() => history.push('/new_bank_account')}>Добавить новый</Button>
        </>
    );
}
