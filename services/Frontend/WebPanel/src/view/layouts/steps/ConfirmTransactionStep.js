import React, {useState} from 'react';
import {Button, Form, InputNumber} from "antd";
import {transactionAPI} from "../../../http/TransactionAPI";


export const ConfirmTransactionStep = (props) => {
    let [errorText, setErrorText] = useState("");
    let [transactionID, setTransactionID] = useState("");
    let [code, setCode] = useState("");

    const createConfirmationRequest = () => {
        transactionAPI.RegisterTransaction(props.transaction).then((r) => {
            console.log(r);
            setTransactionID(r.message);
        }).catch((err) => setErrorText("Повторите попытку позже."));
    }

    const sendVerificationCode = () => {
        transactionAPI.ConfirmTransaction(transactionID, code, props.transaction).then((r) => {
            console.log(r);
            setTransactionID(r.message);
        }).catch((err) => setErrorText("Повторите попытку позже."));
    }

    const onFormLayoutChange = (values) => {
        setCode(values.code.toString());
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
                        <Form.Item
                            name="code" label="Код">
                            <InputNumber/>
                        </Form.Item>
                        <Button onClick={() => sendVerificationCode()}>Продолжить</Button>
                    </Form>
                    : ''
            }
        </div>
    );
}
