import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, message, Card, Popconfirm } from 'antd';
import firebase from 'firebase/app';
import 'firebase/firestore';

const JadwalDokterUser = () => {
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
                <span>
                    {tags.map(tag => {
                        return (
                            <Tag color='green' key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
    ];

    const [data, setData] = useState([]);
    return (
        <div style={{ paddingTop: 150 }}>
            <div style={{ paddingTop: 50, margin: '0 auto', width: '70%' }}>
                <h1 style={{ fontSize: '2rem' }}>Jadwal Dokter</h1>
                {loading ? <Card loading /> : <Table columns={columns} dataSource={data} />}
            </div>
        </div>
    );
}

export default JadwalDokterUser;