import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    message, Tag, Select
} from 'antd';

import firebase from 'firebase/app';
import 'firebase/firestore';





const TambahDokter = () => {
    const [loading, setLoading] = useState(false);

    const [ID, setID] = useState('');
    const [Nama, setNama] = useState('');
    const [Poli, setPoli] = useState('');
    const [Alamat, setAlamat] = useState('');
    const [NoHP, setNoHP] = useState();
    const [Jadwal, setJadwal] = useState([]);
    const [indexJadwal, setIndexJadwal] = useState([]);
    const [hari, setHari] = useState('Senin');
    const [InputJadwal, setInputJadwal] = useState('');
    const [Harga, setHarga] = useState('');

    const formField = [
        {
            placeholder: 'ID',
            value: ID,
            onChange: setID
        },
        {
            placeholder: 'Nama',
            value: Nama,
            onChange: setNama
        },
        {
            placeholder: 'Poli',
            value: Poli,
            onChange: setPoli
        },
        {
            placeholder: 'Alamat',
            value: Alamat,
            onChange: setAlamat
        },
        {
            placeholder: 'No HP',
            value: NoHP,
            onChange: setNoHP
        },
        {
            placeholder: 'Harga',
            value: Harga,
            onChange: setHarga
        },
    ]

    const resetField = () => {
        formField.map(item => {
            return item.onChange('');
        })
        setInputJadwal('');
        setJadwal([]);
        setHari('Senin');
    }

    const addDokterEvent = () => {
        if (ID === '' || Nama === '' || Poli === '' || Alamat === '' || NoHP === '' || Jadwal === '' || Harga === '') {
            message.warning('Semua kolom harus diisi !');
        } else {
            setLoading(true);

            const ref = firebase.firestore().collection('nama_dokter');
            ref.doc(ID).set({
                ID: ID,
                Nama: Nama,
                Poli: Poli,
                Alamat: Alamat,
                NoHP: NoHP,
                Jadwal: Jadwal,
                semua_pasien: [],
                key: ID,
                Harga: Harga,
                indexJadwal: indexJadwal
            })
                .then(() => {
                    message.success('Dokter Ditambahkan');
                    resetField();
                    setLoading(false);
                })
                .catch(err => {
                    message.error(err.message);
                    setLoading(false);
                })
        }
    }
    return (
        <div>
            <Form style={{ width: '70%', margin: '0 auto', marginTop: 50, }}>
                <h1 style={{ fontSize: '2rem' }}>Tambah Dokter</h1>
                {formField.map((item, index) => {
                    if (item.placeholder !== 'Jadwal') {
                        return (
                            <Form.Item key={index}>
                                <label>{item.placeholder}</label>
                                <Input placeholder={item.placeholder}
                                    type={item.placeholder === 'No HP' ? 'number' : 'text'}
                                    value={item.value}
                                    onChange={e => item.onChange(e.target.value)} />
                            </Form.Item>
                        )
                    } else return null;
                })}
                <label>Jadwal</label>
                <div style={{ display: 'flex', marginBottom: 20 }}>
                    {Jadwal.map((item, index) => (
                        <Tag style={{ padding: '10px 30px', marginRight: 10 }}>{item}</Tag>
                    ))}
                </div>

                <div style={{ display: 'flex' }}>
                    <Select value={hari} onChange={e => setHari(e)} style={{ width: '30%', marginRight: 20 }}>
                        <Select.Option value='Senin'>Senin</Select.Option>
                        <Select.Option value='Selasa'>Selasa</Select.Option>
                        <Select.Option value='Rabu'>Rabu</Select.Option>
                        <Select.Option value='Kamis'>Kamis</Select.Option>
                        <Select.Option value='Jumat'>Jumat</Select.Option>
                        <Select.Option value='Sabtu'>Sabtu</Select.Option>
                    </Select>

                    <Input placeholder='Isi Jadwal' style={{ width: '70%' }}
                        onChange={e => setInputJadwal(e.target.value)}
                        value={InputJadwal}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                if (InputJadwal === '') {

                                } else {
                                    setJadwal(prev => {
                                        let old = [...prev];
                                        old.push(`${hari}, ${InputJadwal}`)
                                        return old;
                                    })
                                    setIndexJadwal(prev => {
                                        const semuaHari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                                        let old = [...prev];
                                        semuaHari.forEach((item, index) => {
                                            if (item === hari) {
                                                return old.push(index + 1);
                                            }
                                        })
                                        return old;
                                    })
                                    setInputJadwal('');
                                    setHari('Senin');
                                }
                            }
                        }} />
                </div>

                <div style={{
                    marginTop: 20
                }}>
                    <Button loading={loading} onClick={addDokterEvent} type='primary' style={{ marginRight: 10 }}>Tambah</Button>
                    <Button type='dashed' onClick={resetField}>Reset</Button>
                </div>
            </Form>
        </div>
    );
}

export default TambahDokter;