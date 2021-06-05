import React, {useLayoutEffect, useState} from 'react';
import { Steps, Button, message } from 'antd';

const { Step } = Steps;

const steps = [
    {
        title: 'Выбор операции',
        content: 'First-content',
    },
    {
        title: 'Настройка',
        content: 'Second-content',
    },
    {
        title: 'Подтверждение',
        content: 'Hoba',
    },
    {
        title: 'Завершение',
        content: 'Last-content',
    },
];

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

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <div style={{marginLeft: "5%", marginRight: "5%", marginTop: 20, marginBottom: 30}}>
            <Steps direction={width < 1000 ? "vertical" : "horizontal"} current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
}
