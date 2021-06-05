import React from 'react';
import {Avatar, Button} from "antd";
import history from "../../history";

import {UserOutlined} from '@ant-design/icons';


export const MyProfileLayout = () => {
    return (
        <div style={{margin: 20}}>
            <Avatar style={{float: "left", marginRight: 20}} size={128} icon={<UserOutlined/>}/>
            <h1>Username</h1>
            <h3>User role</h3>
            <br/>
            <Button type="link" onClick={() => history.push('/logout')}>Выход</Button>
        </div>
    );
}
