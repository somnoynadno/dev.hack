import React, {useState} from 'react';
import {Alert, Button, Col, Form, Input, Layout, Row, Typography} from 'antd';
import {accountAPI} from "../../http/AccountAPI";
import history from "../../history";

const {Content} = Layout;
const {Title} = Typography;

export const RegisterPage = () => {
    const [errorText, setErrorText] = useState("");

    const onFinish = (values) => {
        setErrorText('');
        accountAPI.RegisterUser(values.username, "", values.password).then((r) => {
            history.push('/login');
        }).catch(err => {
                setErrorText("Произошла непредвиденная ошибка, повторите попытку позже");
            }
        )
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Register failed:', errorInfo);
    };

    return (
        <Layout>
            <Content className="site-layout container">
                <Row gutter={[16, 16]} justify="center">
                    <Col>
                        <Form
                            layout="vertical"
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Title style={{textAlign: "center"}} level={2}>Регистрация</Title>
                            <Form.Item
                                label="Пользователь"
                                name="username"
                                rules={[{required: true, message: 'Пожалуйста, введите имя пользователя'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Пароль"
                                name="password"
                                rules={[{required: true, message: 'Пожалуйста, введите пароль'}]}
                            >
                                <Input.Password/>
                            </Form.Item>
                            {errorText ?
                                <Alert style={{marginBottom: 18}} message={errorText} type="error"/> : ''
                            }
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Продолжить
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};
