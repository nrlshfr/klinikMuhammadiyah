import React, { useState } from 'react';
import { Form, Icon, Input, Button, Select, InputNumber, message } from 'antd';
import firebase from 'firebase/app';
import 'firebase/firestore';

const { Option } = Select;

const InputData = () => {
    const [kategori, setKategori] = useState('Layanan');
    const [loading, setLoading] = useState(false);

    const [KDLayanan, setKDLayanan] = useState('');
    const [namaLayanan, setNamaLayanan] = useState('');
    const [hargaLayanan, setHargaLayanan] = useState('');

    const [KDObat, setKDObat] = useState('');
    const [namaObat, setNamaObat] = useState('');
    const [hargaObat, setHargaObat] = useState('');



    const SubmitLayanan = (e) => {
        e.preventDefault();
        setLoading(true);
        firebase.firestore().collection('daftar_harga').doc(KDLayanan).set({
            namaLayanan,
            KDLayanan,
            hargaLayanan,
            Kategori: 'Layanan'
        }).then(() => {
            setLoading(false);
            message.success('Layanan telah dimasukkan');
            setKDLayanan('');
            setNamaLayanan('');
            setHargaLayanan('');
        })
            .catch(err => {
                message.error(err.message);
                setLoading(false);
            })
    }

    const SubmitObat = (e) => {
        e.preventDefault();
        setLoading(true);
        firebase.firestore().collection('daftar_harga').doc(KDObat).set({
            KDObat,
            namaObat,
            hargaObat,
            Kategori: 'Obat'
        }).then(() => {
            setLoading(false);
            message.success('Obat telah dimasukkan');
            setNamaObat('');
            setKDObat('');
            setHargaObat('');
        })
            .catch(err => {
                message.error(err.message);
                setLoading(false);
            })
    }
    return (
        <div>
            <div style={{
                width: 700,
                paddingTop: 50,
                margin: '0 auto'
            }}>
                <h1 style={{ fontSize: '2rem' }}>Input Data</h1>

                <Select defaultValue={kategori} onChange={e => setKategori(e)} style={{ width: 120, marginBottom: 50 }}>
                    <Option value="Layanan">Layanan</Option>
                    <Option value="Obat">Obat</Option>
                </Select>

                {kategori === 'Layanan' ? <Form onSubmit={SubmitLayanan}>
                    <Form.Item>
                        <label>Kode Layanan</label>
                        <Input
                            value={KDLayanan}
                            onChange={e => setKDLayanan(e.target.value)}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Kode Layanan"
                        />

                        <label>Nama Layanan</label>
                        <Input
                            value={namaLayanan}
                            onChange={e => setNamaLayanan(e.target.value)}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Nama Layanan"
                        />

                        <label>Harga Layanan</label>
                        <InputNumber
                            type='number'
                            onChange={(e) => setHargaLayanan(e)}
                            placeholder="Harga Layanan"
                            style={{ width: '100%' }}
                            value={hargaLayanan}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button disabled={KDLayanan === '' || namaLayanan === '' || hargaLayanan === '' ? true : false}
                            loading={loading} type="primary" htmlType="submit" className="login-form-button">
                            Tambah Layanan
                        </Button>
                    </Form.Item>
                </Form> :

                    <Form onSubmit={SubmitObat}>
                        <Form.Item>
                            <label>Kode Obat</label>
                            <Input
                                value={KDObat}
                                onChange={e => setKDObat(e.target.value)}
                                prefix={<Icon type="sliders" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Kode Obat"
                            />

                            <label>Nama Obat</label>
                            <Input
                                value={namaObat}
                                onChange={e => setNamaObat(e.target.value)}
                                prefix={<Icon type="sliders" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Nama Obat"
                            />

                            <label>Harga Obat</label>
                            <InputNumber
                                type='number'
                                onChange={(e) => setHargaObat(e)}
                                placeholder="Harga Layanan"
                                style={{ width: '100%' }}
                                value={hargaObat}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button disabled={KDObat === '' || namaObat === '' || hargaObat === '' ? true : false}
                                loading={loading} type="primary" htmlType="submit" className="login-form-button">
                                Tambah Obat
                        </Button>
                        </Form.Item>
                    </Form>}
            </div>
        </div>
    );
}

export default InputData;