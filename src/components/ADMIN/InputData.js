import React, { useState } from 'react';
import { Form, Icon, Input, Button, Select, InputNumber, message, Upload } from 'antd';
import firebase from 'firebase/app';
import 'firebase/firestore';

const { Option } = Select;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const InputData = () => {
    const [kategori, setKategori] = useState('Layanan');
    const [loading, setLoading] = useState(false);
    const [loadingUpload, setLoadingUpload] = useState(false);

    const [KDLayanan, setKDLayanan] = useState('');
    const [namaLayanan, setNamaLayanan] = useState('');
    const [deskripsiLayanan, setDeskripsiLayanan] = useState('');
    const [hargaLayanan, setHargaLayanan] = useState('');
    const [layananImg, setlayananImg] = useState('');

    const [KDObat, setKDObat] = useState('');
    const [namaObat, setNamaObat] = useState('');
    const [hargaObat, setHargaObat] = useState('');

    const uploadButton = (
        <div>
            <Icon type={loadingUpload ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );


    const SubmitLayanan = (e) => {
        e.preventDefault();
        setLoading(true);

        firebase.storage().ref().child(namaLayanan).putString(layananImg, 'data_url').then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                firebase.firestore().collection('daftar_harga').doc(KDLayanan).set({
                    namaLayanan,
                    deskripsiLayanan,
                    KDLayanan,
                    hargaLayanan,
                    Kategori: 'Layanan',
                    layananImg: url
                }).then(() => {
                    setLoading(false);
                    message.success('Layanan telah dimasukkan');
                    setKDLayanan('');
                    setNamaLayanan('');
                    setHargaLayanan('');
                    setDeskripsiLayanan('');
                    setlayananImg('');
                })
                    .catch(err => {
                        message.error(err.message);
                        setLoading(false);
                    })
            })
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

    const SubmitObat = (e) => {
        e.preventDefault();
        setLoading(true);
        firebase.firestore().collection('daftar_harga').doc(KDObat).set({
            KDObat,
            namaObat,
            hargaObat,
            Kategori: 'Obat'
        }).then(() => {
            setLoading(false);
            message.success('Obat telah dimasukkan');
            setNamaObat('');
            setKDObat('');
            setHargaObat('');
        })
            .catch(err => {
                message.error(err.message);
                setLoading(false);
            })
    }
    return (
        <div>
            <div style={{
                width: 700,
                paddingTop: 50,
                margin: '0 auto'
            }}>
                <h1 style={{ fontSize: '2rem' }}>Input Data</h1>
                <Select defaultValue={kategori} onChange={e => setKategori(e)} style={{ width: 120, marginBottom: 50 }}>
                    <Option value="Layanan">Layanan</Option>
                    <Option value="Obat">Obat</Option>
                </Select>

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

                {kategori === 'Layanan' ? <Form onSubmit={SubmitLayanan}>
                    <Form.Item>
                        <label>Kode Layanan</label>
                        <Input
                            value={KDLayanan}
                            onChange={e => setKDLayanan(e.target.value)}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Kode Layanan"
                        />

                        <label>Nama Layanan</label>
                        <Input
                            value={namaLayanan}
                            onChange={e => setNamaLayanan(e.target.value)}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Nama Layanan"
                        />

                        <label>Deskripsi Layanan</label>
                        <Input
                            value={deskripsiLayanan}
                            onChange={e => setDeskripsiLayanan(e.target.value)}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Deskripsi Layanan"
                        />

                        <label>Harga Layanan</label>
                        <InputNumber
                            type='number'
                            onChange={(e) => setHargaLayanan(e)}
                            placeholder="Harga Layanan"
                            style={{ width: '100%' }}
                            value={hargaLayanan}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button disabled={KDLayanan === '' || namaLayanan === '' || hargaLayanan === '' ? true : false}
                            loading={loading} type="primary" htmlType="submit" className="login-form-button">
                            Tambah Layanan
                        </Button>
                    </Form.Item>
                </Form> :

                    <Form onSubmit={SubmitObat}>
                        <Form.Item>
                            <label>Kode Obat</label>
                            <Input
                                value={KDObat}
                                onChange={e => setKDObat(e.target.value)}
                                prefix={<Icon type="sliders" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Kode Obat"
                            />

                            <label>Nama Obat</label>
                            <Input
                                value={namaObat}
                                onChange={e => setNamaObat(e.target.value)}
                                prefix={<Icon type="sliders" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Nama Obat"
                            />

                            <label>Harga Obat</label>
                            <InputNumber
                                type='number'
                                onChange={(e) => setHargaObat(e)}
                                placeholder="Harga Layanan"
                                style={{ width: '100%' }}
                                value={hargaObat}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button disabled={KDObat === '' || namaObat === '' || hargaObat === '' ? true : false}
                                loading={loading} type="primary" htmlType="submit" className="login-form-button">
                                Tambah Obat
                        </Button>
                        </Form.Item>
                    </Form>}

            </div>
        </div>
    );
}

export default InputData;