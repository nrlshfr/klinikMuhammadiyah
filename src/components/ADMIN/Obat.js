import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { message, Table, Popconfirm, Button } from 'antd';

const Layanan = () => {
    useEffect(() => {
        getObat();
    }, [])

    const [loading, setLoading] = useState(true);
    const [semuaObat, setsemuaObat] = useState([]);

    const columns = [
        {
            title: 'Kode Obat',
            dataIndex: 'KDObat',
            key: 'KDObat',
        },
        {
            title: 'Nama Obat',
            dataIndex: 'namaObat',
            key: 'namaObat',
        },
        {
            title: 'Harga Obat',
            dataIndex: 'hargaObat',
            key: 'hargaObat',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Popconfirm
                    title="Hapus obat ini ?"
                    onConfirm={() => {
                        setLoading(true);
                        firebase.firestore().collection('daftar_harga').doc(text.KDObat).delete()
                            .then(() => getObat())
                            .catch(err => message.error(err.message))
                    }}
                    okText="Ya"
                    cancelText="Tidak"
                >
                    <Button type='danger'>Hapus {text.KDObat}</Button>
                </Popconfirm>
            ),
        },
    ]

    const getObat = () => {
        const data = [];
        firebase.firestore().collection('daftar_harga').where('Kategori', '==', 'Obat').get()
            .then(snap => snap.forEach(child => data.push(child.data())))
            .then(() => {
                setLoading(false);
                setsemuaObat(data);
                console.log(data);
            })
            .catch(err => {
                message.error(err.message);
            })
    }

    return (
        <div style={{ paddingTop: 100 }}>
            <h1 style={{ fontSize: '2rem' }}>Obat</h1>
            <Table columns={columns} dataSource={semuaObat} loading={loading} />

        </div>
    );
}

export default Layanan;