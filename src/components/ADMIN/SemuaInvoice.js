import React, { useEffect, useState } from 'react';
import { Card, message, Button, Popconfirm } from 'antd';
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
                {loading ? <Card loading style={{ width: '100%' }} /> :
                    semuaInvoice.map((item, index) => (
                        <div key={index} style={{ margin: '0 20px 20px 0', width: 300 }}>
                            <Card
                                onClick={() => window.location.pathname = '/admin-page/invoice/' + item.id}
                                title={`Nomor Invoice ${item.nomorInvoice}`} bordered={false} style={{ width: '100%', marginRight: 20, cursor: 'pointer' }}>
                                <p>Nama pasien: {item.namaPasien}</p>
                            </Card>
                            <Popconfirm title='Hapus invoice ini ? ' onConfirm={() => {
                                setLoading(true);
                                firebase.firestore().collection('semua_invoice').doc(item.id).delete()
                                    .then(() => {
                                        getSemuaInvoice();
                                        setLoading(false);
                                    })
                                    .catch(err => {
                                        message.error(err.message);
                                        setLoading(false);
                                    })
                            }}>
                                <Button block type='danger'>Hapus Invoice</Button>
                            </Popconfirm>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default SemuaInvoice;