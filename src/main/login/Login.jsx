import React, { Component } from 'react';
import { Layout, Input, Form, Button, Divider, Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../scss/login.scss';

class Login extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Layout className='login'>
                <div className='model'>
                    <div className='login-form'>
                        <h3>欢迎登录电子巡更管理系统</h3>
                        <Divider />
                        <Form
                            name="normal_login"
                            initialValues={{ remember: true }}
                            onFinish={this.props.onFinish}>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}>
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"/>
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住密码</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="">
                                    忘记密码？
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                                or <a href="">注册</a>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Login;
