import React from 'react';
import {Button} from "antd";


export const ConfirmTransactionStep = (props) => {
    return (
        <div style={{margin: 20}}>
            {JSON.stringify(props.transaction)}
            <br/>
            <Button onClick={() => props.transactionConfirmedCallback(props.transaction)}>Подтвердить</Button>
        </div>
    );
}
