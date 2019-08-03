import React, { useEffect, useState } from 'react';
import './Home.modules.scss';
import { Row, Col, Icon } from 'antd';
import bg from '../../assets/home1.jpg';
import home2 from '../../assets/home2.JPG';
import home3 from '../../assets/home3.jpg';

const Home = () => {
    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScrollpos(window.scrollY);
        })
    }, [])

    const [scrollPos, setScrollpos] = useState(0);

    const services = [
        {
            title: 'Layanan Darurat',
            body: 'Menyediakan ambulan sebagai layanan darurat',
            icon: 'car'
        },
        {
            title: 'Dokter Berpengalaman',
            body: 'Diisi oleh dokter yang telah ahli dalam bidangnya',
            icon: 'medicine-box'
        },
        {
            title: 'Tindakan Pelayanan',
            body: 'Terpercaya dengan harga terjangkau',
            icon: 'experiment'
        },
        {
            title: 'Jam Buka',
            body: 'Senin - Minggu 08.00-21.00 WIB',
            icon: 'dashboard'
        }
    ]

    // const specialist = [
    //     {
    //         title: 'NEUROLOGY',
    //         body: 'Far far away, behind the word mountains',
    //         icon: 'branches'
    //     },
    //     {
    //         title: 'NEUROLOGY',
    //         body: 'Far far away, behind the word mountains',
    //         icon: 'branches'
    //     },
    //     {
    //         title: 'NEUROLOGY',
    //         body: 'Far far away, behind the word mountains',
    //         icon: 'branches'
    //     },
    //     {
    //         title: 'NEUROLOGY',
    //         body: 'Far far away, behind the word mountains',
    //         icon: 'branches'
    //     }
    // ]
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
                <h1 style={{ color: '#fff', fontSize: '5vw' }}><span style={{ fontWeight: 'bolder' }}>KLINIK</span> MUHAMMADIYAH</h1>
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

                <Row className='section3'>
                    <div className='framePoliLayanan' style={{
                        width: '100%', height: 500, backgroundImage: `url(${home3})`,
                        backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', color: '#fff'
                    }}>
                        <h1 style={{ color: '#fff', fontSize: 44 }}>Poli dan Layanan</h1>
                        <p style={{ fontSize: 35 }}>Kesehatan Anda Prioritas Kami</p>
                    </div>
                </Row>

                <Row style={{ display: 'flex', alignItems: 'center', minHeight: '30vh', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div>
                        {services.map((item, index) => (
                            <Col sm={6} key={index} style={{
                                display: 'flex',
                                padding: '10px 10px',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                maxWidth: 300
                            }}>

                                <Icon type={item.icon} style={{
                                    fontSize: '1.5em', backgroundColor: '#ffeeed', color: '#fe5f55',
                                    padding: 15, borderRadius: '50%'
                                }} />
                                <div>
                                    <h3 style={{ textAlign: 'center', fontSize: 20 }}>{item.title}</h3>
                                    <p style={{ textAlign: 'center' }}>
                                        {item.body}
                                    </p>
                                </div>
                            </Col>
                        ))}
                    </div>
                </Row>

                {/* <Row style={{ display: 'flex', alignItems: 'center', maxHeight: '30vh', flexWrap: 'wrap' }}>
                    <div style={{ width: '100%' }}>
                        {specialist.map((item, index) => (
                            <Col sm={6} key={index} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderLeft: index !== 0 ? '.5px solid #333' : 'none',
                                borderBottom: '.5px solid #333',
                                borderTop: '.5px solid #333',
                                padding: '10px 10px',
                                height: 200,
                                justifyContent: 'center'
                            }}>
                                <Icon type={item.icon} style={{ fontSize: 40, color: '#207dff', marginBottom: 10 }} />

                                <h3 style={{ textAlign: 'center', fontSize: 20 }}>{item.title}</h3>
                                <p style={{ textAlign: 'center' }}>
                                    {item.body}
                                </p>

                            </Col>
                        ))}
                    </div>
                </Row> */}


                <Row className='fakta' style={{
                    minHeight: '70vh', backgroundImage: `url(${bg})`
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

            </div>

        </div>
    );
}

export default Home;