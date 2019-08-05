import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Card, message } from 'antd';


const JadwalKonsultasi = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const ref = firebase.firestore().collection('data_pasien').doc(slicedUID);
        const refDokter = firebase.firestore().collection('nama_dokter');
        ref.get().then(snap => {
            setUserData(snap.data())
            refDokter.doc(snap.data().jadwalKonsultasi.DokterID).get()
                .then((snappy) => {
                    setUrutan(snappy.data().semua_pasien)
                })
        })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }, [])

    const pathname = window.location.pathname;
    const slicedUID = pathname.slice(19, pathname.length);


    const [userData, setUserData] = useState();
    const [urutan, setUrutan] = useState([]);

    return (
        <div className='pala' style={{ paddingTop: 150, margin: '0 0 50px 0', display: 'flex', justifyContent: 'center' }}>
            {loading ? <Card loading style={{ width: 400 }} /> :
                <Card style={{ width: 400, height: 300 }}>
                    <h2>Jadwal Konsultasi</h2>
                    <p>Nama Pasien: {userData.namalengkap}</p>
                    <div>
                        <p>Nama Dokter: {userData.jadwalKonsultasi.namaDokter === '' ? '-' : userData.jadwalKonsultasi.namaDokter}</p>
                        <p>Poli: {userData.jadwalKonsultasi.Poli === '' ? '-' : userData.jadwalKonsultasi.Poli}</p>
                        {urutan.map((item, index) => item === firebase.auth().currentUser.displayName ? <p key={index}>Urutan: {index + 1}</p> : null)}
                        <p style={{ fontSize: 8, fontWeight: 'bolder', position: 'absolute', bottom: 0 }}>*Data ini akan diatur ulang pada pukul 00:00</p>
                    </div>
                </Card>
            }
        </div>
    );
}

export default JadwalKonsultasi;