import React from 'react';
import Login from './Login';
import GameArea from './GameArea';
import './App.css';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
        this.setIsLogin = this.setIsLogin.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    componentDidMount() {
        fetch("http://localhost:8421/api.authentication.check", {
            method: 'GET',
            credentials: "include"
        })
        .then(res => {
            if (res.status !== 200) {
                console.log(`Error ${res.status}. User not logined!`);
                return this.setState({isLogin: false});
            }
            return this.setState({isLogin: true});
        });
    }
    setIsLogin(bul) {
        this.setState({isLogin: bul});
    }
    logOut() {
        fetch("http://localhost:8421/api.authentication.signout", {method: "GET", credentials: "include"})
            .then(res => {
                if (res.status === 200) return this.setState({isLogin: false});
                return console.log(`Error ${res.status}. Not correct logging out`);
            });
    }
    render() {
        return (
            <div id="App">
                {this.state.isLogin ? <GameArea logout={this.logOut} /> : <Login isLogin={this.setIsLogin} />}
            </div>
        );
    }
    
}