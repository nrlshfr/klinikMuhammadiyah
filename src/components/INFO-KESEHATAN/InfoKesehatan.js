import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { message, Card } from 'antd';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';

const InfoKesehatan = () => {
    useEffect(() => {
        const data = [];
        firebase.firestore().collection('semua_artikel').orderBy('index').get()
            .then((snap) => {
                snap.forEach(child => data.push(child.data()))
            })
            .then(() => {
                setSemuaArtikel(data.reverse());
                setLoading(false);
            })
            .catch(err => {
                message.error(err.message);
                setLoading(false);
            })
    }, [])

    const [semuaArtikel, setSemuaArtikel] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <div className='pala' style={{ paddingTop: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
            <h1>Info Kesehatan</h1>
            {loading ?
                <Card loading style={{ width: '80%' }} />
                :

                semuaArtikel.length === 0 ? <h3>Belum ada artikel</h3> : semuaArtikel.map((item, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        width: '80%',
                        boxShadow: '1px 2px 8px rgba(0,0,0,.2)',
                        height: 200,
                        overflow: 'hidden',
                        marginBottom: 20,
                    }}>
                        <div className='artikelImg' style={{ width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <img src={item.headerIMG} alt="" style={{ width: '100%' }} />
                        </div>
                        <div style={{ padding: '20px' }}>
                            <Link to={`/admin-page/info-kesehatan/detail/${item.id}`}><h2 style={{ cursor: 'pointer' }}>{item.Judul.slice(0, 50)}</h2></Link>
                            <CKEditor
                                editor={ClassicEditor}
                                data={item.Body.slice(0, 250) + '...'}
                                disabled={true}
                                config={{
                                    toolbar: [''],
                                }}
                            />
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default InfoKesehatan;