import React, {useState} from 'react';
import {Button, Form, Input, InputNumber} from "antd";
import {transactionAPI} from "../../../http/TransactionAPI";


export const ConfirmTransactionStep = (props) => {
    let [errorText, setErrorText] = useState("");
    let [transactionID, setTransactionID] = useState("");
    let [code, setCode] = useState("");

    let [wrongCode, setWrongCode] = useState(false);

    const createConfirmationRequest = () => {
        transactionAPI.RegisterTransaction(props.transaction).then((r) => {
            console.log(r);
            setTransactionID(r.message);
        }).catch((err) => setErrorText("Повторите попытку позже."));
    }

    const sendVerificationCode = () => {
        transactionAPI.ConfirmTransaction(transactionID, code, props.transaction).then((r) => {
            props.transactionConfirmedCallback(Object.assign(props.transaction, {id: transactionID}));
        }).catch((err) => {
            setWrongCode(true);
        });
    }

    const onFormLayoutChange = (values) => {
        console.log(values)
        setCode(values.code);
    }

    return (
        <div style={{margin: 20}}>
            <h2>Проверьте правильность заполненных данных</h2>
            <pre>
            {JSON.stringify(props.transaction, null, "\t")}
            </pre>
            <br/>
            <Button disable={transactionID} onClick={() => createConfirmationRequest()}>Подтвердить</Button>
            {
                transactionID ?
                    <Form style={{marginTop: 10}} onValuesChange={onFormLayoutChange}>
                        <h4>Введите код подтверждения</h4>
                        <h6>Он был отправлен на ваш телефон</h6>
                        <Form.Item validateStatus={wrongCode ? 'error' : 'success'} style={{maxWidth: 180}}
                            name="code" label="Код">
                            <Input/>
                        </Form.Item>
                        <Button onClick={() => sendVerificationCode()}>Продолжить</Button>
                    </Form>
                    : ''
            }
        </div>
    );
}
