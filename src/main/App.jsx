import React from 'react';
import AdminLayout from './admin/AdminLayout';
import Login from './login/Login';
import axios from 'axios';
import {message} from 'antd';

const ipAddress = 'http://10.128.230.82:8080';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLogin: false,
        };
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(value){
        let data = {
            name: value.username,
            password: value.password,
            type: 0,
        }
        axios.post(ipAddress + '/user/login', data).then(resp=>{
            if(resp !== null){
                console.log(resp.data.msg);
                if(resp.data.state === 1){
                    this.setState({
                        isLogin: true,
                    });
                    message.success("登录成功");
                }else{
                    message.error(resp.data.msg);
                }
            }else{
                console.log("登录失败");
                message.error("用户名或密码错误")
            }
        })
    }

    render(){
        const isLogin = this.state.isLogin;
        return(
            <div>
                {isLogin ? <AdminLayout/> : <Login onFinish={this.onLogin}/>}
            </div>
        );
    }
}

export default App;