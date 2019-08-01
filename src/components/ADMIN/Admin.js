import React, { useState } from 'react';
import { Form, Icon, Input, message, Spin, } from 'antd';
import firebase from 'firebase/app';
import 'firebase/auth';




const Admin = () => {
    const [loading, setLoading] = useState(false);
    const [email] = useState('km@admin.com');
    const [password, setPassword] = useState('');
    const loginEvent = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            message.warn('Password tidak boleh kosong!');
        } else {
            setLoading(true);
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    message.info('Welcome');
                    setLoading(false);
                })
                .catch(err => {
                    message.error(err.message);
                    setLoading(false);
                })
        }
    }
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <h1 style={{ fontWeight: 'bold', marginBottom: 20 }}>ADMIN KLINIK MUHAMMADIYAH</h1>
            {loading ?
                <Spin size='large' /> :
                <Form onSubmit={loginEvent} className="login-form" style={{ width: 400 }}>
                    <Form.Item>
                        <Input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>

                    </Form.Item>
                </Form>}
        </div>
    );
}

export default Admin;