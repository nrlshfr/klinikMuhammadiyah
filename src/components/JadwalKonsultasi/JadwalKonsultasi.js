import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Card } from 'antd';


const JadwalKonsultasi = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const pathname = window.location.pathname;
        const slicedUID = pathname.slice(19, pathname.length);
        const ref = firebase.firestore().collection('data_pasien').doc(slicedUID);
        ref.get().then(snap => {
            setUserData(snap.data());
            setLoading(false);
        })
    }, [])




    const [userData, setUserData] = useState({});
    return (
        <div className='pala' style={{ paddingTop: 150, margin: '0 0 50px 0', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            {loading ? <Card loading style={{ width: 400 }} /> :
                <Card style={{ width: 400, height: 300 }}>
                    <p>Nama Pasien: {userData.namalengkap}</p>
                    {userData.nama_dokter.map((item, index) => (
                        <div key={index}>
                            <p>Nama Dokter: {item.namaDokter}</p>
                            <p>Poli: {item.Poli}</p>
                            <p>Urutan: {item.urutan}</p>
                        </div>
                    ))}
                </Card>}
        </div>
    );
}

export default JadwalKonsultasi;