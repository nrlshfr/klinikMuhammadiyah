import React, { useState, useEffect } from 'react';
import { Input, Upload, message, Button, Icon } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const BuatArtikel = () => {
    useEffect(() => {

    }, [])

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Judul, setJudul] = useState('');
    const [Body, setBody] = useState('');
    const [headerIMG, setHeaderIMG] = useState('');

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoadingUpload(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            message.success(info.file.name + ' uploaded !');
            getBase64(info.file.originFileObj, imageUrl => {
                setLoadingUpload(false);
                setHeaderIMG(imageUrl);
            });
        }
    };

    const uploadButton = (
        <div>
            <Icon type={loadingUpload ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const POST_ARTIKEL = () => {
        const d = new Date();
        const tanggal = d.getDate() > 9 ? d.getDate() : '0' + d.getDate();
        const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const bulan = namaBulan[d.getMonth()];
        const bulanIndex = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
        const tahun = d.getFullYear();
        const menit = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
        const detik = d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds();
        setLoading(true);
        const refFR = firebase.firestore().collection('semua_artikel');
        firebase.storage().ref().child(Judul).putString(headerIMG, 'data_url').then(snapshot => {
            snapshot.ref.getDownloadURL().then((IMGURL) => {
                refFR.add({
                    Judul: Judul,
                    Body: Body,
                    headerIMG: IMGURL,
                    tanggal: `${tanggal}, ${bulan} ${tahun}`,
                    index: `${tahun}${bulanIndex}${tanggal}${menit}${detik}`
                })
                    .then((snap) => {
                        refFR.doc(snap.id).set({ id: snap.id }, { merge: true })
                    })
                    .then(() => {
                        setJudul('');
                        setBody('');
                        setHeaderIMG('');
                        message.success('Artikel berhasil di post !');
                    })
                    .catch(err => {
                        message.error(err.message);
                        setLoading(false);
                    })
            })
        })
            .catch(err => {
                message.error(err.message);
                setLoading(false);
            })
    }

    return (
        <div>
            <div style={{
                width: '70%',
                margin: '0 auto',
                marginTop: 50,
            }}>
                <h1 style={{ fontSize: '2rem' }}>Buat Artikel</h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        onChange={handleChange}
                    >
                        {headerIMG && !loadingUpload ? <img src={headerIMG} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>

                    <Button type='primary' loading={loading}
                        disabled={Judul === '' || Body === '' || headerIMG === '' ? true : false}
                        onClick={POST_ARTIKEL}
                    >Post Artikel</Button>
                </div>

                <Input placeholder="Judul"
                    value={Judul}
                    onChange={e => setJudul(e.target.value)}
                    style={{ width: 300, marginBottom: 10 }}
                />

                <CKEditor
                    className='adminEditor'
                    editor={ClassicEditor}
                    data={Body}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setBody(data);
                    }}

                />
            </div>




        </div>
    );
}

export default BuatArtikel;