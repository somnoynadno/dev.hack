import React from 'react';
import {Button, Result} from "antd";
import history from "../../../history";
import {APIs} from "../../../config";


export const TransactionDoneStep = (props) => {
    console.log(props.transaction);

    return (
        <div style={{margin: 20}}>
            <Result
                status="success"
                title="Успешно! Ваш чек доступен ниже."
                subTitle={`Номер транзакции: ${props.transaction.id}.`}
                extra={[
                    <Button onClick={() => {
                        history.push('/new_transaction');
                        window.location.reload();
                    }}>
                        Вернуться в начало
                    </Button>,
                    <Button
                        onClick={() => window.location.replace(APIs["DocumentAPI"] + "/get_operation_status_doc?filename=" + props.transaction.docx_filepath)}
                        type="primary">Скачать чек</Button>,
                ]}
            />,
        </div>
    );
}
