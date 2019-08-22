import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { message, Card } from 'antd';


const Layanan = () => {
    useEffect(() => {
        const data = [];
        firebase.firestore().collection('info_layanan').orderBy('namaLayanan').get()
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

    return (
        <div style={{ width: '100%', minHeight: '100vh', paddingTop: 200 }}>
            <h1 style={{ textAlign: 'center', marginBottom: 50 }}>Layanan Klinik Muhammadiyah Bogor</h1>

            <div style={{
                width: '80%',
                margin: '0 auto',
                minHeight: '50vh',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                {loading ? <Card loading style={{ width: '100%' }} /> :
                    layanans.map((item, index) => (
                        <div style={{
                            width: 400,
                            height: 400,
                            boxShadow: '1px 1.5px 5px rgba(0,0,0,.5)',
                            marginBottom: 50,
                            cursor: 'pointer'
                        }}>
                            <div style={{
                                width: '100%',
                                height: 300,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                position: 'relative'
                            }}>
                                <h1 style={{
                                    position: 'absolute',
                                    alignSelf: 'center',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    zIndex: 10
                                }}>{item.namaLayanan}</h1>
                                <div style={{ width: '100%', height: 300, position: 'absolute', background: '#3333334d' }}></div>
                                <img style={{ width: '100%', height: 300 }} src={item.layananImg} alt="" />
                            </div>

                            <div style={{ width: '100%', padding: 10 }}>
                                <p style={{ textAlign: 'justify' }}>
                                    {item.deskripsiLayanan}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Layanan;