import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { message, Table, Popconfirm, Button } from 'antd';

const Layanan = () => {
    useEffect(() => {
        getLayanan();
    }, [])

    const [loading, setLoading] = useState(true);
    const [semuaLayanan, setsemuaLayanan] = useState([]);

    const columns = [
        {
            title: 'Kode Layanan',
            dataIndex: 'KDLayanan',
            key: 'KDLayanan',
        },
        {
            title: 'Nama Layanan',
            dataIndex: 'namaLayanan',
            key: 'namaLayanan',
        },
        {
            title: 'Harga Layanan',
            dataIndex: 'hargaLayanan',
            key: 'hargaLayanan',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Popconfirm
                    title="Hapus layanan ini ?"
                    onConfirm={() => {
                        setLoading(true);
                        firebase.firestore().collection('daftar_harga').doc(text.KDLayanan).delete()
                            .then(() => getLayanan())
                            .catch(err => message.error(err.message))
                    }}
                    okText="Ya"
                    cancelText="Tidak"
                >
                    <Button type='danger'>Hapus {text.KDLayanan}</Button>
                </Popconfirm>
            ),
        },
    ]

    const getLayanan = () => {
        const data = [];
        firebase.firestore().collection('daftar_harga').where('Kategori', '==', 'Layanan').get()
            .then(snap => snap.forEach(child => data.push(child.data())))
            .then(() => {
                setLoading(false);
                setsemuaLayanan(data);
                console.log(data);
            })
            .catch(err => {
                message.error(err.message);
            })
    }

    return (
        <div style={{ paddingTop: 100 }}>
            <h1 style={{ fontSize: '2rem' }}>Layanan</h1>
            <Table columns={columns} dataSource={semuaLayanan} loading={loading} />

        </div>
    );
}

export default Layanan;