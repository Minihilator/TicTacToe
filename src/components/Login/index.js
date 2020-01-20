import React from 'react';
import LoginForm from './LoginForm';

export default function Login (props) {
    return (
        <div id="login">
            <LoginForm isLogin={props.isLogin} />
        </div>
    );
}