import React, { useState, useEffect } from 'react';
import { Upload, Icon, message, Input, Form, Button, Table, Popconfirm } from 'antd';
import firebase from 'firebase/app';
import 'firebase/firestore';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const TambahInfoLayanan = () => {
    useEffect(() => {
        getLayanan();
    }, [])

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [layananImg, setlayananImg] = useState('');
    const [namaLayanan, setnamaLayanan] = useState('');
    const [deskripsiLayanan, setdeskripsiLayanan] = useState('');
    const [loadingBtn, setloadingBtn] = useState(false);
    const [layananData, setlayananData] = useState([]);
    const [loadingTable, setloadingTable] = useState(false);

    const columns = [
        {
            title: 'Nama Layanan',
            dataIndex: 'namaLayanan',
            key: 'namaLayanan',
        },
        {
            title: 'Deskripsi Layanan',
            dataIndex: 'deskripsiLayanan',
            key: 'deskripsiLayanan',
        },
        {
            title: 'Gambar Layanan',
            dataIndex: 'layananImg',
            key: 'layananImg',
            render: (item) => (
                <img style={{ width: 120, height: 100 }} src={item} alt="" />
            )
        },
        {
            title: '',
            render: (text, record) => (
                <Popconfirm title='Anda yakin ingin menghapus ?' onConfirm={() => {
                    setloadingTable(true)
                    firebase.firestore().collection('info_layanan').doc(record.namaLayanan).delete()
                        .then(() => {
                            message.success('Layanan telah dihapus');
                            getLayanan();
                        })
                        .catch((err) => {
                            message.success(err.message);
                            setloadingTable(false)
                        })
                }}>
                    <Button type='danger'>Hapus</Button>
                </Popconfirm>
            )
        }
    ]

    const uploadButton = (
        <div>
            <Icon type={loadingUpload ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const getLayanan = () => {
        setloadingTable(true)
        const data = [];
        firebase.firestore().collection('info_layanan').orderBy('namaLayanan').get()
            .then(snap => snap.forEach(child => data.push(child.data())))
            .then(() => {
                setloadingTable(false)
                setlayananData(data);
            })
            .catch(err => {
                message.error(err.message);
                setloadingTable(false)
            })
    }

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoadingUpload(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            message.success(info.file.name + ' added !');
            getBase64(info.file.originFileObj, imageUrl => {
                setLoadingUpload(false);
                setlayananImg(imageUrl);
            });
        }
    };

    const TAMBAH_LAYANAN = (e) => {
        e.preventDefault();
        setloadingBtn(true);
        firebase.storage().ref().child(namaLayanan).putString(layananImg, 'data_url').then(snapshot => {
            snapshot.ref.getDownloadURL().then((imgurl) => {
                firebase.firestore().collection('info_layanan').doc(namaLayanan).set({
                    namaLayanan,
                    deskripsiLayanan,
                    layananImg: imgurl
                })
                    .then(() => {
                        getLayanan();
                        setloadingBtn(false);
                        message.success('Layanan telah ditambahkan');
                        setnamaLayanan('');
                        setdeskripsiLayanan('');
                        setlayananImg('');
                    })
                    .catch((err) => {
                        setloadingBtn(false);
                        message.error(err.message);
                    })
            })
        })

    }
    return (
        <div style={{ minHeight: '100vh' }}>
            <h1 style={{ margin: '50px 0' }}>Tambah Info Layanan</h1>

            <div>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={handleChange}
                >
                    {layananImg && !loadingUpload ? <img src={layananImg} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>

                <Form onSubmit={TAMBAH_LAYANAN}>
                    <Form.Item>
                        <label>Nama Layanan</label>
                        <Input value={namaLayanan} onChange={e => setnamaLayanan(e.target.value)} placeholder='Nama Layanan' />

                        <label>Deskripsi Layanan</label>
                        <Input value={deskripsiLayanan} onChange={e => setdeskripsiLayanan(e.target.value)} placeholder='Deskripsi Layanan' />
                    </Form.Item>

                    <Button type='primary' htmlType='submit'
                        loading={loadingBtn}
                        disabled={namaLayanan === '' || deskripsiLayanan === '' || layananImg === '' ? true : false}>
                        Tambahkan Layanan</Button>
                </Form>
            </div>

            <Table loading={loadingTable} dataSource={layananData} columns={columns} pagination={false} style={{ marginTop: 50 }} />
        </div>
    );
}

export default TambahInfoLayanan;