import React, { useEffect, useState } from 'react';
import './Admin.modules.scss';
import { Table, message, Card } from 'antd';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Invoice = () => {
    useEffect(() => {
        firebase.firestore().collection('semua_invoice').doc(pathname).get()
            .then((snap) => setInvoiceData(snap.data()))
            .then(() => {
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                message.errror(err.message);
            })
    })
    const columns = [
        {
            title: 'Deskripsi',
            dataIndex: 'Deskripsi',
        },
        {
            title: 'Harga',
            dataIndex: 'Harga',
            render: (text) => (
                <span>Rp {text}</span>
            )
        },
        {
            title: 'Kuantitas',
            dataIndex: 'Kuantitas',
        },
        {
            title: 'Total Harga',
            dataIndex: 'TotalHarga',
            render: (text) => (
                <span>Rp {text}</span>
            )
        },
    ];

    const [loading, setLoading] = useState(true);
    const pathname = window.location.pathname.slice(20, window.location.pathname.length);
    const [invoiceData, setInvoiceData] = useState({});

    return (
        <div>
            {loading ? <Card loading /> :
                <div style={{
                    width: '85%',
                    margin: '50px auto',
                    background: '#f3f3f3',
                    border: '1px solid #333'
                }}>
                    <h1 style={{ marginLeft: 20 }}>logo</h1>

                    <div style={{
                        width: '100%',
                        background: '#fff',
                        padding: 20
                    }}>
                        <h1 style={{ color: '#1890ff' }}>{invoiceData.nomorInvoice}</h1>
                        <h4 style={{ color: '#1890ff' }}>{invoiceData.nomorRef}</h4>
                        <h4 style={{ color: '#1890ff' }}>{invoiceData.tanggal}</h4>
                    </div>

                    <div className='invoicedTo'>
                        <p>Invoiced To</p>
                        <p>{invoiceData.namaPasien}</p>
                        <p>{invoiceData.Alamat}</p>
                        <p>{`${invoiceData.Kota}, ${invoiceData.Provinsi} ${invoiceData.kodePos}`}</p>
                        <p>Indonesia</p>
                    </div>

                    <div style={{
                        padding: 20
                    }}>
                        <Table pagination={false} columns={columns} dataSource={invoiceData.data} size="small" />

                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: 50,
                        }}>
                            <div style={{
                                width: '37%'
                            }}>
                                <p style={{ fontWeight: 'bold' }}>Total harga : Rp {invoiceData.totalHarga}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Invoice;