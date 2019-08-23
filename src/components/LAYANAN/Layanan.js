import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { message, Card, Table } from 'antd';


const Layanan = () => {
    useEffect(() => {
        const data = [];
        firebase.firestore().collection('daftar_harga').where('Kategori', '==', 'Layanan').orderBy('namaLayanan').get()
            .then(snap => snap.forEach(child => data.push(child.data())))
            .then(() => {
                setLayanans(data);
                setLoading(false);
            })
            .catch(err => {
                message.error(err.message);
                setLoading(false);
            })
    }, [])

    const [loading, setLoading] = useState(true);
    const [layanans, setLayanans] = useState([]);

    const columns = [
        {
            title: 'Nama Layanan',
            dataIndex: 'namaLayanan',
            key: 'namaLayanan',
        },
        {
            title: 'Deskripsi Layanan',
            dataIndex: 'deskripsiLayanan',
            key: 'deskripsiLayanan',
        },
        {
            title: 'Harga Layanan',
            dataIndex: 'hargaLayanan',
            key: 'hargaLayanan',
        },
    ];

    const previewPhotoLayanan = [
        {
            img: 'https://fakeimg.pl/200x100/?retina=1&text=こんにちは&font=noto',
        },
        {
            img: 'https://fakeimg.pl/200x100/?retina=1&text=こんにちは&font=noto',
        },
        {
            img: 'https://fakeimg.pl/200x100/?retina=1&text=こんにちは&font=noto',
        },
        {
            img: 'https://fakeimg.pl/200x100/?retina=1&text=こんにちは&font=noto',
        }
    ]

    return (
        <div style={{ width: '100%', minHeight: '100vh', paddingTop: 200 }}>
            <h1 style={{ textAlign: 'center', marginBottom: 50 }}>Layanan Klinik Muhammadiyah Bogor</h1>

            <div style={{
                width: '80%',
                margin: '0 auto',
                minHeight: '50vh',
                display: 'flex',
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                {previewPhotoLayanan.map((item, index) => (
                    <div key={index} style={{ width: 250, height: 250, marginBottom: 50 }}>
                        <img style={{ width: '100%', height: 250 }} src={item.img} alt="" />
                    </div>
                ))}

                <Table loading={loading} pagination={false} bordered dataSource={layanans} columns={columns} style={{ width: '100%', marginBottom: 50 }} />

            </div>
        </div>
    );
}

export default Layanan;