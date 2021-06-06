import React, {useEffect, useState} from 'react';
import {Input, Space, Table, Tag, Row, Col} from 'antd';
import {transactionAPI} from "../../http/TransactionAPI";
import {bankAccountAPI} from "../../http/BankAccountAPI";
import {APIs} from "../../config";
import moment from "moment";

const {Search} = Input;

const columns = [
    {
        title: 'Дата',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: text => <span>{moment(text).format("LLL")}</span>
    },
    {
        title: 'Тип',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Откуда',
        dataIndex: 'account_from',
        key: 'account_from',
        render: text => <span>№{text}</span>
    },
    {
        title: 'Куда',
        dataIndex: 'account_to',
        key: 'account_to',
        render: text => <span>№{text}</span>
    },
    {
        title: 'Перевод',
        dataIndex: 'transfer',
        key: 'transfer'
    },
    {
        title: "Комиссия",
        dataIndex: 'comission',
        key: 'comission'
    },
    {
        title: 'Чек',
        key: 'docx_filepath',
        dataIndex: 'docx_filepath',
        render: text => <a href={APIs["DocumentAPI"] + "/get_operation_status_doc?filename=" + text}>{text}</a>,
    },
];

export const TransactionHistoryLayout = () => {
    const onSearch = value => console.log(value);

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        bankAccountAPI.GetUserBankAccounts().then(async res => {
            let arr = [];
            for (let elem of res) {
                let r = await transactionAPI.GetTransactionsByBankAccountID(elem.id);
                if (r) {
                    for (let e of r) {
                        e.transfer = `${e.currency_amount_from} ${e.currency_code_from} -> ${e.currency_amount_to} ${e.currency_code_to}`
                        arr.push(e);
                    }
                }
            }

            console.log(arr);
            setTransactions(arr.reverse());
        });

    }, [])

    return (
        <div>
            <Row justify="end" style={{marginTop: 10, marginBottom: 10}}>
                <Col span={4}>
                    <Search allowClear onSearch={onSearch}/>
                </Col>
            </Row>
            <Table columns={columns} dataSource={transactions}/>
        </div>
    );
}
