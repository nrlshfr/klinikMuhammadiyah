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
                <div>
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
            render: hrg => (
                <p>Rp {hrg} /Konsultasi</p>
            )
        },
        {
            title: 'Daftar',
            dataIndex: 'daftar',
            key: 'daftar',

            render: (text, index) => (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    {auth ?
                        index.indexJadwal.map(item => {
                            if (item !== new Date().getDay()) {

                            } else {
                                return listSudahJanji !== '' && listSudahJanji !== undefined ? index.ID === listSudahJanji ?
                                    <Popconfirm title='Batalkan pendaftaran dengan dokter ini?' onConfirm={() => batalJanji(index)}>
                                        <Button
                                            style={{ margin: '0 auto' }} type='danger'>Batalkan Pendaftaran</Button>
                                    </Popconfirm>
                                    :
                                    <Button
                                        onClick={() => message.warn('Anda telah daftar dengan dokter lain, jika ingin mendaftar dengan dokter ini silahkan batalkan pendaftaran dengan dokter sebelumnya')}
                                        style={{ margin: '0 auto' }} type='ghost'>Daftar</Button>
                                    :
                                    <Button
                                        onClick={() => {
                                            setVisibleModal(true);
                                            setModalData({
                                                ID: index.ID,
                                                Nama: index.Nama,
                                                Poli: index.Poli
                                            })
                                        }}
                                        style={{ margin: '0 auto' }} type='primary'>Daftar</Button>
                            }
                        }) : <Button onClick={() => window.location.pathname = '/masuk'}>Masuk untuk daftar</Button>}
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
        const d = new Date();
        const namaHari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const hari = namaHari[d.getDay() - 1];

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
                                DokterID: modalData.ID,
                                hari: hari
                            }
                        }, { merge: true })
                    })
                    .then(() => {
                        setLoadingModal(false);
                        setVisibleModal(false);
                        message.success('Daftar konsultasi telah dibuat');
                        getJadwal();
                    })
                    .catch(err => {
                        message.error(err.message);
                        setLoadingModal(false);
                    })
            } else {
                message.warning('Kuota daftar temu dokter ini sudah penuh');
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
                                        DokterID: '', Poli: '', namaDokter: '', hari: ''
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

                <p style={{
                    fontSize: 10
                }}>*Pendaftaran hanya bisa dilakukan pada hari yang bersangkutan</p>
                <Table className='jadwalDokter'
                    scroll={{ x: 10 }}
                    style={{ width: '70%' }}
                    columns={columns} dataSource={data} pagination={false} bordered loading={loading} />
            </div>

            <Modal
                title="Daftar"
                visible={visibleModal}
                closable={false}
                footer={[
                    <Button key="back" onClick={() => setVisibleModal(false)}>
                        Kembali
            </Button>,
                    <Button onClick={BUATJANJI} key="submit" type="primary" loading={loadingModal}>
                        Daftar
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