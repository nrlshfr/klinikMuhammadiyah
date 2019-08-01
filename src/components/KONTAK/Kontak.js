import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message, Icon } from 'antd';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Kontak = () => {

    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [pesan, setPesan] = useState('');
    const [loading, setLoading] = useState(false);

    const allKontak = [
        {
            icon: 'home',
            title: 'address',
            body: '198 West 21th Street, Suite 721 New York NY 10016',
        },
        {
            icon: 'home',
            title: 'address',
            body: '198 West 21th Street, Suite 721 New York NY 10016',
        },
        {
            icon: 'home',
            title: 'address',
            body: '198 West 21th Street, Suite 721 New York NY 10016',
        },
        {
            icon: 'home',
            title: 'address',
            body: '198 West 21th Street, Suite 721 New York NY 10016',
        }
    ]

    const submitPesan = () => {
        setLoading(true);
        const d = new Date();
        const tanggal = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
        const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const bulan = namaBulan[d.getMonth()];
        const bulanIndex = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
        const tahun = d.getFullYear();
        const menit = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
        const detik = d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds();
        firebase.firestore().collection('pesan').add({
            nama: nama,
            email: email,
            subjek: subject,
            pesan: pesan,
            tanggal: `${tanggal}, ${bulan} ${tahun}`,
            index: `${tahun}${bulanIndex}${tanggal}${menit}${detik}`
        })
            .then(() => {
                setLoading(false);
                message.success('Pesan terkirim');
                setNama('');
                setEmail('');
                setSubject('');
                setPesan('');
            })
            .catch((err) => {
                setLoading(false);
                message.error(err.message);
            })
    }

    return (
        <div style={{ paddingTop: 150 }}>
            <h1 style={{ textAlign: 'center', fontSize: '3rem', margin: '50px 0' }}>KONTAK</h1>
            <Row style={{ justifyContent: 'space-between', display: 'flex', flexWrap: 'wrap', marginBottom: 50 }}>
                {allKontak.map((item, index) => (
                    <Col key={index} xs={23} sm={11} md={5}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            background: '#f8f9fa',
                            padding: 20
                        }}>
                            <Icon type={item.icon} style={{ fontSize: '2rem', background: '#fff', padding: 20, color: '#217dfe', borderRadius: '50%' }} />
                            <h2>{item.title}</h2>
                            <p style={{ textAlign: 'center' }}>
                                {item.body}
                            </p>
                        </div>
                    </Col>
                ))}
            </Row>

            <Row>
                <Col sm={24} md={12} style={{ padding: '20px 50px', }} >
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3960.883163646827!2d107.6186251!3d-6.9045727!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64b004ff221%3A0x1444a06ec346de5!2sSejiwa!5e0!3m2!1sen!2sid!4v1563799948056!5m2!1sen!2sid" width="100%" height="450" frameborder="0" style={{ border: 0 }}></iframe>
                </Col>

                <Col sm={24} md={12} style={{ padding: '20px 50px', }}>
                    <Form
                        onSubmit={submitPesan}>
                        <Form.Item>
                            <Input
                                value={nama}
                                onChange={e => setNama(e.target.value)}
                                placeholder='Nama' />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='Email' type='email' />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                                placeholder='Subjek' />
                        </Form.Item>
                        <Form.Item>
                            <Input.TextArea style={{ height: 150 }}
                                value={pesan}
                                onChange={e => setPesan(e.target.value)}
                                placeholder='Pesan' />
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={submitPesan} loading={loading} type='primary'>Kirim Pesan</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Kontak;