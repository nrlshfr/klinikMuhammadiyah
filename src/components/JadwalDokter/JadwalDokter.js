import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Popconfirm } from 'antd';
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
        setLoading(true);
        const data = [];
        firebase.firestore().collection('nama_dokter').orderBy('Nama').get()
            .then((snap) => {
                snap.forEach(child => data.push(child.data()))
            })
            .then(() => {
                setData(data);
                setLoading(false);
            })
            .then(() => {
                getSudahJanji();
            })
            .catch((err) => {
                err.message !== "Cannot read property 'uid' of null" ? message.error(err.message) : console.log('');
                setLoading(false);
            })
    }


    const getSudahJanji = () => {
        firebase.firestore().collection('data_pasien').doc(firebase.auth().currentUser.uid).get()
            .then(snap => setListSudahJanji(snap.data().jadwalKonsultasi.DokterID))
            .catch(err => message(err.message))

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
            title: 'Harga',
            dataIndex: 'Harga',
            key: 'Harga',
        },
        {
            title: 'Buat Janji',
            dataIndex: 'buatJanji',
            key: 'buatJanji',

            render: (text, index) => (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    {listSudahJanji !== '' ? index.ID === listSudahJanji ?
                        <Popconfirm title='Batalkan janji dengan dokter ini?' onConfirm={() => batalJanji(index)}>
                            <Button
                                style={{ margin: '0 auto' }} type='danger'>Batalkan Janji</Button>
                        </Popconfirm>
                        :
                        <Button
                            onClick={() => message.warn('Anda telah membuat janji dengan dokter lain, jika ingin membuat janji dengan dokter ini silahkan batalkan janji dengan dokter sebelumnya')}
                            style={{ margin: '0 auto' }} type='ghost'>Buat Janji</Button>
                        :
                        <Button
                            onClick={auth ? () => {
                                setVisibleModal(true);
                                setModalData({
                                    ID: index.ID,
                                    Nama: index.Nama,
                                    Poli: index.Poli
                                })
                            } : () => window.location.pathname = '/masuk'}
                            style={{ margin: '0 auto' }} type='primary'>Buat Janji</Button>}
                </div>
            ),
        }
    ];

    const [data, setData] = useState([]);
    const [loadingModal, setLoadingModal] = useState(false);
    const [listSudahJanji, setListSudahJanji] = useState('');

    const BUATJANJI = () => {
        setLoadingModal(true);
        const refDokter = firebase.firestore().collection('nama_dokter').doc(modalData.ID);
        const refPasien = firebase.firestore().collection('data_pasien').doc(firebase.auth().currentUser.uid);

        refDokter.get().then(snap => {
            const sample = snap.data().semua_pasien;
            if (sample.length !== 30) {
                sample.push(firebase.auth().currentUser.displayName);
                refDokter.set({ semua_pasien: sample }, { merge: true })
                    .then(() => {
                        refPasien.set({
                            jadwalKonsultasi: {
                                namaDokter: modalData.Nama,
                                Poli: modalData.Poli,
                                DokterID: modalData.ID
                            }
                        }, { merge: true })
                    })
                    .then(() => {
                        setLoadingModal(false);
                        setVisibleModal(false);
                        message.success('Janji konsultasi telah dibuat');
                        getJadwal();
                    })
                    .catch(err => {
                        message.error(err.message);
                        setLoadingModal(false);
                    })
            } else {
                message.warning('Kuota janji temu dokter ini sudah penuh');
                setLoadingModal(false);
            }
        })

    }

    const batalJanji = (index) => {
        setLoading(true);
        const ForDel = firebase.firestore().collection('nama_dokter').doc(listSudahJanji);
        ForDel.get().then(snaps => {
            const sample = snaps.data().semua_pasien;
            sample.forEach(ini => {
                if (ini === firebase.auth().currentUser.displayName) {
                    sample.splice(index, 1);
                    ForDel.set({ semua_pasien: sample }, { merge: true })
                        .then(() => {
                            firebase.firestore().collection('data_pasien').doc(firebase.auth().currentUser.uid)
                                .set({
                                    jadwalKonsultasi: {
                                        DokterID: '', Poli: '', namaDokter: ''
                                    }
                                }, { merge: true })
                                .then(() => getJadwal())
                        })
                }
            })
        })
    }
    return (
        <div className='pala' style={{ paddingTop: 150, minHeight: '100vh' }}>
            <div className='pala' style={{
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