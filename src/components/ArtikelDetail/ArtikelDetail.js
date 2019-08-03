import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { message, Card } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ArtikelDetail.modules.scss';

const ArtikelDetail = () => {
    useEffect(() => {
        const path = window.location.pathname.slice(34, window.location.pathname.length);
        firebase.firestore().collection('semua_artikel').doc(path).get()
            .then((snap) => {
                setItem(snap.data());
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                message.error(err.message);
            })
    }, []);



    const [item, setItem] = useState();
    const [loading, setLoading] = useState(true);



    return (
        <div className='pala' style={{
            paddingTop: 150
        }}>
            {loading ?
                <div style={{ marginTop: 50 }}>
                    <Card loading />
                    <Card loading />
                    <Card loading />
                </div>
                :
                <div style={{
                    background: '#fff',
                    width: '85%',
                    margin: '50px auto',
                    padding: '20px'
                }}>
                    <h1 style={{ fontSize: 28, textTransform: 'capitalize', margin: 0 }}>{item.Judul}</h1>
                    <p style={{ fontSize: 11, color: 'gray' }}>{item.tanggal}</p>

                    <div style={{ marginTop: 50 }}>
                        <div style={{ width: '100%', marginBottom: 50, textAlign: 'center' }}>
                            <img src={item.headerIMG} alt="" style={{ width: '60%' }} />
                        </div>
                        <CKEditor
                            editor={ClassicEditor}
                            data={item.Body}
                            disabled={true}
                            config={{
                                toolbar: [''],
                            }}
                        />
                    </div>
                </div>
            }
        </div>
    );
}

export default ArtikelDetail;