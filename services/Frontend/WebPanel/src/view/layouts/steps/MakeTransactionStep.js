import React, {useState} from 'react';

import {Button, Form, Input, InputNumber, Select,} from 'antd';


export const MakeTransactionStep = (props) => {
    let [transaction, setTransaction] = useState({});

    const onFormLayoutChange = (values) => {
        transaction = Object.assign(transaction, values);
        console.log(transaction);
        setTransaction(transaction);
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
                <Form.Item name="account_to" label="Счёт получателя">
                    <Input/>
                </Form.Item>
                <Form.Item name="account_from" label="Счёт списания">
                    <Select>
                        <Select.Option value="demo1">Demo</Select.Option>
                        <Select.Option value="demo2">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="currency_amount_from" label="Сумма перевода">
                    <InputNumber/>
                </Form.Item>
                <Button onClick={() => props.setTransactionCallback(transaction)}>Далее</Button>
            </Form>
        </div>
    );
}
