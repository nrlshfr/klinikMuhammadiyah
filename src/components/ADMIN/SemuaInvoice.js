import React, { useEffect, useState } from 'react';
import { Card, message } from 'antd';
import firebase from 'firebase/app';
import 'firebase/firestore';

const SemuaInvoice = () => {
    useEffect(() => {
        getSemuaInvoice();
    }, [])

    const getSemuaInvoice = () => {
        const data = [];
        firebase.firestore().collection('semua_invoice').get()
            .then(snap => snap.forEach(child => data.push(child.data())))
            .then(() => {
                setLoading(false);
                setSemuaInvoice(data)
            })
            .catch(err => {
                message.error(err.message);
                setLoading(false);
            })
    }

    const [semuaInvoice, setSemuaInvoice] = useState([]);
    const [loading, setLoading] = useState(true);
    return (
        <div>
            <div style={{ margin: 50, display: 'flex', flexWrap: 'wrap' }}>
                {loading ? <Card loading /> :
                    semuaInvoice.map((item, index) => (
                        <Card
                            onClick={() => window.location.pathname = '/admin-page/invoice/' + item.id}
                            key={index} title={`Nomor Invoice ${item.nomorInvoice}`} bordered={false} style={{ width: 300, marginRight: 20, cursor: 'pointer' }}>
                            <p>Nama pasien: {item.namaPasien}</p>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
}

export default SemuaInvoice;