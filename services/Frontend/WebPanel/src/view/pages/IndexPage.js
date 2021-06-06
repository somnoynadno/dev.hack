import React, {useState} from 'react';
import {Card, Layout, Menu} from 'antd';
import {AppstoreOutlined, DollarCircleOutlined, PlusCircleOutlined, SettingOutlined} from '@ant-design/icons';
import {Route} from "react-router-dom";
import logo from '../../assets/logo.png'
import {BankAccountsLayout} from "../layouts/BankAccountsLayout";
import {TransactionHistoryLayout} from "../layouts/TransactionHistoryLayout";
import history from "../../history";
import {MyProfileLayout} from "../layouts/MyProfileLayout";
import {NewTransactionLayout} from "../layouts/NewTransactionLayout";
import {NewBankAccountLayout} from "../layouts/NewBankAccountLayout";

const {Content} = Layout;


export const IndexPage = () => {
    let [current, setCurrent] = useState("bank_account");

    const handleMenuClick = (e) => {
        setCurrent(e.key);
        history.push("/" + e.key);
    };

    if (!localStorage.getItem("id")) {
        history.push('/login');
    }

    return (
        <Layout>
            <Content className="site-layout container">
                <Card className="card" size="small">
                    <Menu onClick={event => handleMenuClick(event)} selectedKeys={[current]} mode="horizontal">
                        <Menu.Item key="home">
                            <img
                                alt={"logo"}
                                width={82}
                                src={logo}
                            />
                        </Menu.Item>
                        <Menu.Item key="bank_accounts" icon={<DollarCircleOutlined/>}>
                            Мои счета
                        </Menu.Item>
                        <Menu.Item key="new_transaction" icon={<PlusCircleOutlined/>}>
                            Новая операция
                        </Menu.Item>
                        <Menu.Item key="transactions" icon={<AppstoreOutlined/>}>
                            История транзакций
                        </Menu.Item>
                        <Menu.Item key="my_profile" icon={<SettingOutlined/>}>
                            Мой профиль
                        </Menu.Item>
                    </Menu>
                    <Route exact path="/bank_accounts" component={BankAccountsLayout}/>
                    <Route exact path="/new_bank_account" component={NewBankAccountLayout}/>
                    <Route exact path="/transactions" component={TransactionHistoryLayout}/>
                    <Route exact path="/new_transaction" component={NewTransactionLayout}/>
                    <Route exact path="/my_profile" component={MyProfileLayout}/>
                </Card>
            </Content>
        </Layout>
    );
}
