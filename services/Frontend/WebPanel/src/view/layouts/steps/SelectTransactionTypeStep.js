import React, {useEffect, useState} from 'react';
import {Radio} from "antd";
import {enumAPI} from "../../../http/EnumAPI";
import {DollarCircleOutlined} from "@ant-design/icons";


export const SelectTransactionTypeStep = (props) => {
    let [transactionTags, setTransactionTags] = useState([]);
    let [errorText, setErrorText] = useState("");

    useEffect(() => {
        enumAPI.GetTransactionTags().then(res => {
            setTransactionTags(res)
        }).catch(err => setErrorText("Произошла ошибка"));
    }, []);

    return (
        <div style={{marginTop: 35}}>
            {
                transactionTags.map((tt, j) => {
                    return <div key={j}>
                        <h2><DollarCircleOutlined style={{marginRight: 8}}/>{tt.RusName}</h2>
                        <Radio.Group defaultValue="a" size="large">
                            {tt.TransactionTypes.map((tt, i) => {
                                return <Radio.Button key={i} onClick={() => props.selectTransactionTypeCallback(tt)}>
                                    {tt.RusName}
                                </Radio.Button>
                            })}
                        </Radio.Group>
                    </div>
                })
            }
        </div>
    );
}
