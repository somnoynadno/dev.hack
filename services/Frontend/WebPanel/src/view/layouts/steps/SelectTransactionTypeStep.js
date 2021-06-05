import React, {useEffect, useState} from 'react';
import {Radio} from "antd";
import {enumAPI} from "../../../http/EnumAPI";


export const SelectTransactionTypeStep = (props) => {
    let [transactionTypes, setTransactionTypes] = useState([]);
    let [errorText, setErrorText] = useState("");

    useEffect(() => {
        enumAPI.GetTransactionTypes().then(res => {
            setTransactionTypes(res)
        }).catch(err => setErrorText("Произошла ошибка"));
    }, []);

    return (
        <div style={{marginTop: 35}}>
            <Radio.Group defaultValue="a" size="large">
                {transactionTypes.map((tt, i) => {
                    return <Radio.Button key={i} onClick={() => props.selectTransactionTypeCallback(tt)}>
                        {tt.RusName}
                    </Radio.Button>
                })}
            </Radio.Group>
        </div>
    );
}
