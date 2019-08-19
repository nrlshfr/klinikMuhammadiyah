import React, { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import firebase from 'firebase/app';
import 'firebase/firestore';

const JadwalDokter = () => {
    useEffect(() => {
        getJadwal();
    }, [])

    const [loading, setLoading] = useState(true);

    const getJadwal = () => {
        const data = [];
        firebase.firestore().collection('nama_dokter').orderBy('Nama').get()
            .then((snap) => {
                snap.forEach(child => data.push(child.data()))
            })
            .then(() => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                message.error(err.message);
                setLoading(false);
            })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
        },
        {
            title: 'Nama',
            dataIndex: 'Nama',
            key: 'name',
        },
        {
            title: 'Poli',
            dataIndex: 'Poli',
            key: 'Poli',
        },
        {
            title: 'Alamat',
            dataIndex: 'Alamat',
            key: 'Alamat',
        },
        {
            title: 'No HP',
            dataIndex: 'NoHP',
            key: 'NoHP',
        },
        {
            title: 'Jadwal',
            dataIndex: 'Jadwal',
            key: 'Jadwal',
            render: tags => (
                <div style={{ width: 150 }}>
                    {tags.map((tag, index) => {
                        return (
                            <p key={index}>{tag.toUpperCase()}</p>
                        );
                    })}
                </div>
            ),
        },
        {
            title: 'Harga',
            dataIndex: 'Harga',
            key: 'Harga',
            render: (item) => (
                <p style={{ width: 100 }}>Rp {item}</p>
            )
        },
        {
            title: 'Nama Pasien',
            dataIndex: 'semua_pasien',
            key: 'semua_pasien',
            render: nama => (
                <div style={{ width: 120 }}>
                    {nama.map((items, index) => {
                        return (
                            <p style={{ padding: '10px 0', borderBottom: '1px solid' }} key={index}>{index + 1}. {items} </p>
                        );
                    })}
                </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Popconfirm
                    title="Hapus dokter ini ?"
                    onConfirm={() => {
                        setLoading(true);
                        firebase.firestore().collection('nama_dokter').doc(text.ID).delete()
                            .then(() => window.location.reload())
                            .catch(err => message.error(err.message))
                    }}
                    okText="Ya"
                    cancelText="Tidak"
                >
                    <Button>Hapus {text.Nama}</Button>
                </Popconfirm>
            ),
        },
    ];

    const [data, setData] = useState([]);
    return (
        <div style={{ paddingTop: 50, margin: '0 auto', width: '90%' }}>
            <h1 style={{ fontSize: '2rem' }}>Jadwal Dokter</h1>
            <Table columns={columns} dataSource={data} loading={loading} bordered pagination={false} />
        </div>
    );
}

export default JadwalDokter;