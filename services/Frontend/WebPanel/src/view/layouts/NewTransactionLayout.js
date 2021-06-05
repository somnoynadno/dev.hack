import React, {useLayoutEffect, useState} from 'react';
import {Button, Steps} from 'antd';
import {SelectTransactionTypeStep} from "./steps/SelectTransactionTypeStep";
import {MakeTransactionStep} from "./steps/MakeTransactionStep";
import {ConfirmTransactionStep} from "./steps/ConfirmTransactionStep";
import {TransactionDoneStep} from "./steps/TransactionDoneStep";

const {Step} = Steps;

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export const NewTransactionLayout = () => {
    const [width, height] = useWindowSize();
    const [current, setCurrent] = React.useState(0);

    const [selectedTransactionType, setSelectedTransactionType] = useState(null);
    const [transaction, setTransaction] = useState(null);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const selectTransactionTypeCallback = (tt) => {
        setSelectedTransactionType(tt);
        next();
    }

    const setTransactionCallback = (t) => {
        setTransaction(t);
        next();
    }

    const transactionConfirmedCallback = (t) => {
        setTransaction(t);
        next();
    }

    const steps = [
        {
            title: 'Выбор',
            content: <SelectTransactionTypeStep selectTransactionTypeCallback={selectTransactionTypeCallback}/>,
        },
        {
            title: 'Создание',
            content: <MakeTransactionStep setTransactionCallback={setTransactionCallback}
                                          selectedTransactionType={selectedTransactionType}/>,
        },
        {
            title: 'Подтверждение',
            content: <ConfirmTransactionStep transactionConfirmedCallback={transactionConfirmedCallback}
                                             transaction={transaction}/>,
        },
        {
            title: 'Завершение',
            content: <TransactionDoneStep transaction={transaction}/>,
        },
    ];

    return (
        <div style={{marginLeft: "5%", marginRight: "5%", marginTop: 20, marginBottom: 30}}>
            <Steps direction={width < 1000 ? "vertical" : "horizontal"} current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title}/>
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {current > 0 && current < 3 && (
                    <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                        Назад
                    </Button>
                )}
            </div>
        </div>
    );
}
