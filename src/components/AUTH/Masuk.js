import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

const Masuk = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);

    const LOGIN = (e) => {
        e.preventDefault();
        setLoading(true);
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(() => {
                window.location.pathname = '/'
            })
            .catch(err => {
                message.error(err.message);
                setLoading(false);
            })
    }
    return (
        <div className='pala' style={{ paddingTop: 150, }}>
            <div style={{
                minHeight: '80vh',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Form onSubmit={LOGIN} style={{ width: 400, background: '#f3f3f3', height: 450, padding: 20 }}>
                    <div>
                        <h2 style={{ textAlign: 'center', color: '#333', fontWeight: 'bolder', marginBottom: 20 }}>Masuk</h2>
                        <Form.Item>
                            <label>Email</label>
                            <Input value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Item>
                        <label>Password</label>
                        <Form.Item>
                            <Input.Password value={pass} onChange={e => setPass(e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <Button loading={loading} type='primary' htmlType="submit" style={{ width: '100%' }}>Masuk</Button>
                        </Form.Item>
                        <Form.Item>
                            <Link to='/daftar'>
                                <Button type='default' style={{ width: '100%' }}>Buat Akun</Button>
                            </Link>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Masuk;