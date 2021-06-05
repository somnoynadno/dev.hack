import React from 'react';
import {Button, Result} from "antd";
import history from "../../../history";


export const TransactionDoneStep = (props) => {
    return (
        <div style={{margin: 20}}>
            <Result
                status="success"
                title="Успешно!"
                subTitle="Номер транзакции: 2017182818828182881. Ваш чек доступен ниже."
                extra={[
                    <Button onClick={() => {
                        history.push('/new_transaction');
                        window.location.reload();
                    }}>
                        Вернуться в начало
                    </Button>,
                    <Button onClick={() => console.log("TODO")} type="primary">Скачать чек</Button>,
                ]}
            />,
        </div>
    );
}
