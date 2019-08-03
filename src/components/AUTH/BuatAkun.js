import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const { Option } = Select;
const BuatAkun = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [namalengkap, setNamaLengkap] = useState('');
    const [nohandphone, setNoHandphone] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);

    const SIGNUP = (e) => {
        e.preventDefault();
        setLoading(true);

        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(() => {
                firebase.auth().currentUser.updateProfile({
                    displayName: namalengkap
                })
                firebase.firestore().collection('data_pasien').doc(firebase.auth().currentUser.uid).set({
                    email,
                    namalengkap,
                    nohandphone,
                    gender,
                })
                setLoading(false);
            })
            .catch(err => {
                message.error(err.message);
                setLoading(false);
            })
    }

    return (
        <div style={{ paddingTop: 150, margin: '0 0 50px 0' }}>
            <div style={{
                minHeight: '80vh',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Form onSubmit={SIGNUP} style={{ width: 400, background: '#f3f3f3', padding: 20 }}>
                    <div>
                        <h2 style={{ textAlign: 'center', color: '#333', fontWeight: 'bolder', marginBottom: 20 }}>Buat Akun</h2>
                        <Form.Item>
                            <label>Email</label>
                            <Input value={email} onChange={e => setEmail(e.target.value)} />

                            <label>Password</label>
                            <Input.Password value={pass} onChange={e => setPass(e.target.value)} />

                            <label>Nama Lengkap</label>
                            <Input value={namalengkap} onChange={e => setNamaLengkap(e.target.value)} />

                            <label>Jenis Kelamin</label>

                            <Select defaultValue={gender} style={{ width: '100%', display: 'block' }} onChange={e => setGender(e)}>
                                <Option value="LakiLaki">Laki-laki</Option>
                                <Option value="Perempuan">Perempuan</Option>
                            </Select>

                            <label>No Handphone</label>
                            <Input type='number' value={nohandphone} onChange={e => setNoHandphone(e.target.value)} style={{ display: 'block', width: '100%' }} />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                loading={loading}
                                disabled={email === '' || pass === '' || namalengkap === '' || nohandphone === '' || gender === '' ? true : false}
                                type='primary' htmlType="submit" style={{ width: '100%' }}>Buat Akun</Button>
                        </Form.Item>
                        <Form.Item>
                            <Link to='/masuk'>
                                <Button type='default' style={{ width: '100%' }}>Masuk</Button>
                            </Link>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default BuatAkun;