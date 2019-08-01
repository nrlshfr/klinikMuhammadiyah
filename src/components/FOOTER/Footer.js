import React from 'react';
import bg from '../../assets/footer-bg.jpg';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

const Footer = () => {
    return (
        <div style={{
            width: '100%',
            height: 300,
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            position: 'relative',
            backgroundPositionY: -50,
            backgroundRepeat: 'no-repeat'
        }}>
            <div style={{
                width: '100%', position: 'absolute', bottom: 0, background: '#f1f1f166', zIndex: 10, height: 300,
                display: 'flex', alignItems: 'center', flexDirection: 'column'
            }}>
                <div style={{ padding: '20px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <h3>KLINIK MUHAMMADIYAH</h3>
                        <p style={{ width: 150 }}>
                            Far far away, behind the word mountains, far from the countries.
                        </p>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: 50 }}>
                            <h3>Informasi Kontak</h3>
                            <ul>
                                <li><Icon type='mail' /> Info@gmail.com</li>
                                <li><Icon type='phone' /> 0251 - 8635592</li>
                                <li style={{ marginTop: 20 }}>
                                    <h4><Icon type='environment' /> Klinik Muhammadiyah Bogor</h4>
                                    <p>Jl. Bubulak Bogor</p>
                                </li>


                            </ul>
                        </div>

                        <div>
                            <h3>LINKS</h3>
                            <ul>
                                <li>
                                    <Link to='/'>Beranda</Link>
                                </li>
                                <li>
                                    <Link to='/jadwal-dokter'>Dokter</Link>
                                </li>
                                <li>
                                    <Link to='/info-kesehatan'>Info Kesehatan</Link>
                                </li>
                                <li>
                                    <Link to='/kontak'>Kontak</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p style={{ position: 'absolute', bottom: 0, fontSize: 16, fontWeight: '100' }}>Copyright ©{new Date().getFullYear()} All rights reserved | Nurul Shafira </p>
            </div>
        </div>
    );
}

export default Footer;