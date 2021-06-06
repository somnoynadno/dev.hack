import React, {useEffect, useState} from 'react';
import {Input, Space, Table, Tag, Row, Col} from 'antd';
import {transactionAPI} from "../../http/TransactionAPI";
import {bankAccountAPI} from "../../http/BankAccountAPI";

const {Search} = Input;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
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
                    for (let e of r) arr.push(e);
                }
            }

            console.log(arr);
            setTransactions(arr);
        });

    }, [])

    return (
        <div>
            <Row justify="end" style={{marginTop: 10, marginBottom: 10}}>
                <Col span={4}>
                    <Search allowClear onSearch={onSearch}/>
                </Col>
            </Row>
            <Table columns={columns} dataSource={data}/>
        </div>
    );
}
