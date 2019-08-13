import React, { useEffect, useState } from 'react';
import { Card, Icon, Popconfirm, message, } from 'antd'
import firebase from 'firebase/app';
import 'firebase/firestore';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const SemuaArtikel = () => {
    useEffect(() => {
        getSemuaArtikel();
    }, [])

    const [loading, setLoading] = useState(false);
    const [semuaArtikelList, setSemuaArtikel] = useState([]);

    const getSemuaArtikel = () => {
        setLoading(true);
        const data = [];
        firebase.firestore().collection('semua_artikel').orderBy('index').get().then(snap => snap.forEach(child => data.push(child.data())))
            .then(() => {
                setSemuaArtikel(data);
                setLoading(false);
            })
            .catch(err => {
                message.error(err.message);
                setLoading(false);
            })
    }

    const loadingCard = () => {
        let loadingThing = [];
        for (let i = 0; i < 10; i++) {
            loadingThing.push(
                <Card key={i}
                    loading
                    style={{ width: 300, marginBottom: 20, height: 350, marginRight: 20 }}
                >
                </Card>
            )
        }
        return loadingThing;
    }

    return (
        <div>
            <div style={{
                margin: '50px 0',
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                {loading ? loadingCard() :
                    semuaArtikelList.length !== 0 ?
                        semuaArtikelList.map((item, index) => (
                            <Card
                                key={index}
                                style={{ width: 300, marginBottom: 20, marginRight: 20 }}
                                cover={
                                    <img
                                        alt="example"
                                        src={item.headerIMG}
                                    />
                                }
                                actions={[
                                    <Link to={`/admin-page/info-kesehatan/detail/${item.id}`}>
                                        <Icon type="eye" />
                                    </Link>
                                    ,
                                    <Popconfirm title='Hapus artikel ini ?' placement='bottom'
                                        onConfirm={() => {
                                            message.loading('Menghapus artikel');
                                            firebase.firestore().collection('semua_artikel').doc(item.id).delete()
                                                .then(() => window.location.reload())
                                                .catch(err => message.error(err.message))
                                        }}>
                                        <Icon type="delete" style={{ color: 'red' }} />
                                    </Popconfirm>]}
                            >
                                <Meta
                                    title={item.Judul}
                                    description={<CKEditor
                                        editor={ClassicEditor}
                                        data={item.Body.slice(0, 250) + '...'}
                                        disabled={true}
                                        config={{
                                            toolbar: [''],
                                        }}
                                    />}
                                />
                            </Card>
                        )) :
                        <div style={{ width: '100%' }}>
                            <h1 style={{ textAlign: 'center' }}>BELUM ADA ARTIKEL YANG DIBUAT</h1>
                        </div>
                }
            </div>
        </div>
    );
}

export default SemuaArtikel;