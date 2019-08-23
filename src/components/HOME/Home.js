import React, { useEffect, useState } from 'react';
import './Home.modules.scss';
import { Row, Col, Icon, Card, message, Divider, Carousel } from 'antd';
import firebase from 'firebase/app';
import 'firebase/firestore';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';

import bg from '../../assets/home1.jpg';
import home2 from '../../assets/home2.JPG';
import home3 from '../../assets/home3.JPEG';
import home4 from '../../assets/home4.JPEG';

const Home = () => {
    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScrollpos(window.scrollY);
        })

        getInfoKesehatan();
        getLayanan();
    }, [])

    const [scrollPos, setScrollpos] = useState(0);
    const [infoKesehatan, setInfoKesehatan] = useState([]);

    const services = [
        {
            title: 'Ambulance',
            body: 'Dapat dipanggil ketika keadaan terdesak dan darurat',
            icon: 'car'
        },
        {
            title: 'IGD',
            body: 'Memberikan pelayanan gawat darurat yang cepat, tepat, tanggap',
            icon: 'medicine-box'
        },
        {
            title: 'Jam Buka',
            body: 'Senin - Minggu 08.00-21.00 WIB',
            icon: 'dashboard'
        },
        {
            title: 'Laboratorium',
            body: 'Terpercaya dengan harga terjangkau',
            icon: 'experiment'
        }
    ]

    const [layanan, setLayanan] = useState([]);

    const getInfoKesehatan = () => {
        const data = [];
        firebase.firestore().collection('semua_artikel').limit(3).get()
            .then(snap => snap.forEach(child => data.push(child.data())))
            .then(() => {
                setInfoKesehatan(data);
            })
            .catch(err => message.error(err.message))
    }
    const getLayanan = () => {
        const data = [];
        firebase.firestore().collection('daftar_harga').where('Kategori', '==', 'Layanan').orderBy('namaLayanan').limit(4).get()
            .then(snap => snap.forEach(child => data.push(child.data())))
            .then(() => {
                setLayanan(data);
            })
            .catch(err => message.error(err.message))
    }

    return (
        <div style={{
            width: '100%',
        }}>
            <div className='headerBG' style={{
                width: '100%',
                backgroundImage: `url(${bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundOrigin: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            </div>

            <div style={{
                width: '100%',
            }}>

                <Row className='section2' style={{ minHeight: '100vh' }}>
                    <Col sm={24} md={12}>
                        <div className='frameHome2' style={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '100vh',
                        }}>
                            <img src={home2} alt="" style={{ width: 400 }} />
                        </div>
                    </Col>

                    <Col sm={24} md={12}>
                        <div className='mengapa' style={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '100vh',
                            flexDirection: 'column'
                        }}>
                            <h1 style={{ fontSize: 44, width: "80%" }}>MENGAPA HARUS MEMILIH KAMI?</h1>
                            <p style={{ width: '80%' }}>
                                Kami adalah klinik kesehatan umum terbaik di Bubulak, Bogor. Buka setiap hari untuk memberikan pelayanan kesehatan secara jujur, adil, dan profesional.
                            </p>
                        </div>
                    </Col>
                </Row>

                <h1 style={{ fontSize: 44, textAlign: 'center' }}>LAYANAN</h1>

                <Row className='section3'>
                    <div className='framePoliLayanan' style={{
                        minHeight: '50vh', backgroundImage: `url(${home3})`
                        , backgroundSize: '100%', backgroundRepeat: 'no-repeat',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', color: '#fff'
                    }}>
                        <h1 style={{ color: '#fff', fontSize: 44 }}>Poli dan Layanan</h1>
                        <p style={{ fontSize: 35 }}>Kesehatan Anda Prioritas Kami</p>
                    </div>
                </Row>

                <Row style={{ marginBottom: 20 }}>
                    <div style={{ width: '70%', margin: '0 auto' }}>

                        <Carousel dotPosition='right' effect="scrollx" autoplay={true} autoplaySpeed={3000} draggable>
                            {layanan.map((item, index) => (
                                <div className='l1' key={index}>
                                    <div>
                                        <img src={item.layananImg} alt="" />
                                    </div>
                                    <div className='lDesc'>
                                        <h3 style={{ textAlign: 'left' }}>{item.namaLayanan}</h3>
                                        <p style={{ textAlign: 'justify' }}>
                                            {item.deskripsiLayanan}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </Row>

                <Row style={{ display: 'flex', alignItems: 'center', minHeight: '30vh', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div>
                        {services.map((item, index) => (
                            <Col sm={6} key={index} style={{
                                display: 'flex',
                                padding: '10px 10px',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'column',
                                maxWidth: 300
                            }}>

                                <Icon type={item.icon} style={{
                                    fontSize: '3em', backgroundColor: '#ffeeed', color: '#fe5f55',
                                    padding: 15, borderRadius: '50%'
                                }} />
                                <div>
                                    <h3 style={{ textAlign: 'center', fontSize: 20, margin: '10px 0 0 0 ' }}>{item.title}</h3>
                                    <p style={{ textAlign: 'center' }}>
                                        {item.body}
                                    </p>
                                </div>
                            </Col>
                        ))}
                    </div>
                </Row>

                <Row className='fakta' style={{
                    minHeight: '70vh', backgroundImage: `url(${home4})`
                    , backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                }}>
                    <div className='fakta2' style={{ background: '#207dffb8', minHeight: '70vh' }}>
                        <div className='judul' style={{ display: 'flex', justifyContent: 'center', minHeight: '70vh', flexDirection: 'column', paddingLeft: 80 }}>
                            <h3 style={{ color: '#fff' }}>Fakta</h3>
                            <h1 style={{ color: '#fff', fontSize: 44, width: '60%', fontWeight: 'bolder' }}>Over 5,100 patients trust us</h1>

                        </div>

                        <div className='stats' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
                            <div style={{
                                width: 500,
                                display: 'flex',
                                flexWrap: 'wrap'
                            }}>
                                <div style={{ width: 250, marginBottom: 50 }}>
                                    <h1 style={{ margin: 0, textAlign: 'center', color: '#fff', fontSize: 44 }}>30</h1>
                                    <p style={{ margin: 0, textAlign: 'center', color: '#fff', fontSize: 16 }}>Years of Experienced</p>
                                </div>

                                <div style={{ width: 250, marginBottom: 50 }}>
                                    <h1 style={{ margin: 0, textAlign: 'center', color: '#fff', fontSize: 44 }}>30</h1>
                                    <p style={{ margin: 0, textAlign: 'center', color: '#fff', fontSize: 16 }}>Years of Experienced</p>
                                </div>

                                <div style={{ width: 250, marginBottom: 50 }}>
                                    <h1 style={{ margin: 0, textAlign: 'center', color: '#fff', fontSize: 44 }}>30</h1>
                                    <p style={{ margin: 0, textAlign: 'center', color: '#fff', fontSize: 16 }}>Years of Experienced</p>
                                </div>

                                <div style={{ width: 250, marginBottom: 50 }}>
                                    <h1 style={{ margin: 0, textAlign: 'center', color: '#fff', fontSize: 44 }}>30</h1>
                                    <p style={{ margin: 0, textAlign: 'center', color: '#fff', fontSize: 16 }}>Years of Experienced</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>

                <Row style={{ padding: '40px 0 40px 0', }}>
                    <h1 style={{ textAlign: 'center', }}>Info Kesehatan</h1>
                    <Divider />

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around'
                    }}>
                        {infoKesehatan.map((item, index) => (
                            <Card
                                key={index}
                                style={{ width: 300, marginBottom: 20 }}
                                cover={
                                    <img
                                        alt={item.Judul}
                                        src={item.headerIMG}
                                        style={{ width: '100%', height: 200 }}
                                    />
                                }
                            >
                                <Card.Meta
                                    title={<Link to={`/info-kesehatan/detail/${item.id}`} onClick={() => window.scrollTo(0, 0)}>
                                        {item.Judul}</Link>}
                                    description={
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={item.Body.slice(0, 100) + '...'}
                                            disabled={true}
                                            config={{
                                                toolbar: [''],
                                            }}
                                        />
                                    }
                                />
                            </Card>
                        ))}
                    </div>
                </Row>

            </div>

        </div>
    );
}

export default Home;