import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    message, Tag
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
    const [InputJadwal, setInputJadwal] = useState('');

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
    ]

    const resetField = () => {
        formField.map(item => {
            item.onChange('');
        })
        setInputJadwal('');
        setJadwal([]);
    }

    const addDokterEvent = () => {
        if (ID === '' || Nama === '' || Poli === '' || Alamat === '' || NoHP === '' || Jadwal === '') {
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
                Jadwal: Jadwal
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
                    if (item.placeholder === 'Jadwal') {
                        return;
                    } else {
                        return (
                            <Form.Item key={index}>
                                <Input placeholder={item.placeholder}
                                    type={item.placeholder === 'No HP' ? 'number' : 'text'}
                                    value={item.value}
                                    onChange={e => item.onChange(e.target.value)} />
                            </Form.Item>
                        )
                    }
                })}
                <h5>Jadwal</h5>
                {Jadwal.map((item, index) => (
                    <Tag key={index} closable>{item}</Tag>
                ))}
                <Input placeholder='Isi Jadwal' style={{ width: 150 }}
                    onChange={e => setInputJadwal(e.target.value)}
                    value={InputJadwal}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            if (InputJadwal === '') {

                            } else {
                                setJadwal(prev => {
                                    let old = [...prev];
                                    old.push(InputJadwal)
                                    return old;
                                })
                                setInputJadwal('');
                            }
                        }
                    }} />

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