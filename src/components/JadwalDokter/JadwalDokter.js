import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal } from 'antd';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import './JadwalDokter.modules.scss';

const JadwalDokterUser = ({ auth }) => {
    useEffect(() => {
        getJadwal();

    }, [])
    const [loading, setLoading] = useState(true);
    const [visibleModal, setVisibleModal] = useState(false);
    const [modalData, setModalData] = useState({
        ID: '',
        Nama: '',
        Poli: ''
    })



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
            title: 'Jadwal',
            dataIndex: 'Jadwal',
            key: 'Jadwal',
            render: tags => (
                <div >
                    {tags.map((tag, index) => {
                        return (
                            <p className='isiJadwal' key={index}>{tag.toUpperCase()}</p>
                        );
                    })}
                </div>
            ),
        },
        {
            title: 'Buat Janji',
            dataIndex: 'buatJanji',
            key: 'buatJanji',

            render: (text, index) => (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={auth ? () => {
                            setVisibleModal(true);
                            setModalData({
                                ID: index.ID,
                                Nama: index.Nama,
                                Poli: index.Poli
                            })
                        } : () => window.location.pathname = '/masuk'}
                        style={{ margin: '0 auto' }} type='primary'>Buat Janji</Button>
                </div>
            ),
        }
    ];

    const [data, setData] = useState([]);
    const [loadingModal, setLoadingModal] = useState(false);


    const BUATJANJI = () => {
        setLoadingModal(true);
        const ref = firebase.firestore().collection('nama_dokter').doc(modalData.ID);
        const refPasien = firebase.firestore().collection('data_pasien').doc(firebase.auth().currentUser.uid);
        ref.get()
            .then((snap) => {
                const sample = snap.data().semua_pasien;
                if (sample.length <= 30) {
                    const sampleDokter = [];
                    sampleDokter.push({ namaDokter: modalData.Nama, Poli: modalData.Poli, urutan: sample.length + 1 });
                    sample.push({
                        Nama: firebase.auth().currentUser.displayName,
                        Urutan: sample.length + 1
                    });
                    ref.set({ semua_pasien: sample }, { merge: true });
                    refPasien.set({ nama_dokter: sampleDokter }, { merge: true })
                        .then(() => {
                            message.success('Janji telah dibuat');
                            setVisibleModal(false);
                            setModalData({
                                ID: '',
                                Nama: '',
                                Poli: ''
                            });
                            setLoadingModal(false);
                        })
                } else {
                    message.warning('Kuota janji dokter ini sudah penuh');
                    setLoading(false);
                }

            })
            .catch(err => {
                message.error(err.message);
                setLoadingModal(false);
            })
    }
    return (
        <div className='pala' style={{ paddingTop: 150, minHeight: '100vh' }}>
            <div style={{
                paddingTop: 50, margin: '50px 0', width: '100%', justifyContent: 'flex-start',
                display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
                <h1 style={{ fontSize: '2rem' }}>Jadwal Dokter</h1>
                <Table className='jadwalDokter'
                    scroll={{ x: 10 }}
                    style={{ width: '70%' }}
                    columns={columns} dataSource={data} pagination={false} bordered loading={loading} />
            </div>

            <Modal
                title="Buat Janji"
                visible={visibleModal}
                closable={false}
                footer={[
                    <Button key="back" onClick={() => setVisibleModal(false)}>
                        Kembali
            </Button>,
                    <Button onClick={BUATJANJI} key="submit" type="primary" loading={loadingModal}>
                        Buat Janji
            </Button>,
                ]}
            >
                <p>{modalData.Nama}</p>
                <p>Poli {modalData.Poli}</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
}

export default JadwalDokterUser;