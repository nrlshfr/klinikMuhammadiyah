import React, { useEffect, useState } from 'react';
import { Card, message } from 'antd';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Pesan = () => {
    useEffect(() => {
        const data = [];
        firebase.firestore().collection('pesan').orderBy('index').get()
            .then(snap => snap.forEach(child => data.push(child.data())))
            .then(() => {
                setLoading(false);
                setPesan(data.reverse());
            })
            .catch(err => {
                message.error(err.message);
                setLoading(false);
            })
    })

    const [loading, setLoading] = useState(true);
    const [allPesan, setPesan] = useState([]);
    return (
        <div>
            <h1 style={{ fontSize: '2rem' }}>Pesan</h1>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: 50
            }}>
                {loading ? <Card loading style={{ width: '100%' }} /> :
                    allPesan.map((item, index) => (
                        <Card title={`${item.nama} (${item.email})`} bordered={false} style={{ width: 300, marginBottom: 20 }}>
                            <h2>{item.subjek}</h2>
                            <p>{item.pesan}</p>
                            <p style={{ fontSize: '.6rem' }}>{item.tanggal}</p>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
}

export default Pesan;