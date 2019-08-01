import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

const Navbar = () => {
    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScrollpos(window.scrollY);
        })
    }, [])

    const [scrollPos, setScrollpos] = useState(0);
    const [mobileNav, setMobileNav] = useState(false);
    return (
        <nav className='navbar' style={{
            position: 'fixed',
            width: '100%',
            zIndex: 1000
        }}>
            <div className='topNavbar' style={{
                display: 'flex',
                color: '#fff',
                alignItems: 'center',
                background: '#207dff',
                height: scrollPos > 50 ? 0 : 30,
                overflow: 'hidden'
            }}>
                <p style={{ margin: '0 50px' }}><Icon type='phone' style={{ marginRight: 5 }} />(0251) 8627277</p>
                <p style={{ margin: 0 }}><Icon type="mail" style={{ marginRight: 5 }} /> dnsfds@gmail.com</p>
            </div>

            <div className='bottomNavbar' style={{
                display: 'flex',
                padding: scrollPos > 50 ? '20px 0' : '30px 0',
                alignItems: 'center',
                background: scrollPos > 50 ? '#fff' : '#ffffff80',
                boxShadow: scrollPos > 50 ? '0px 2px 10px rgba(0,0,0,.4)' : 'none',
                justifyContent: 'space-between'
            }}>
                <h1 style={{ margin: '0 0 0 50px' }}>KLINIK MUHAMMADIYAH BOGOR</h1>

                <ul className='navItems' style={{
                    display: 'flex',
                    width: 400,
                    justifyContent: 'space-evenly',
                    margin: '0 150px 0 0',

                }}>
                    <li>
                        <Link style={{ color: scrollPos > 50 ? '#1890ff' : '#333' }} to='/'>Beranda</Link>
                    </li>
                    <li>
                        <Link style={{ color: scrollPos > 50 ? '#1890ff' : '#333' }} to='/jadwal-dokter'>Dokter</Link>
                    </li>
                    <li>
                        <Link style={{ color: scrollPos > 50 ? '#1890ff' : '#333' }} to='/info-kesehatan'> Info Kesehatan</Link>
                    </li>
                    <li>
                        <Link style={{ color: scrollPos > 50 ? '#1890ff' : '#333' }} to='/kontak'>Kontak</Link>
                    </li>
                </ul>

                <Icon onClick={() => setMobileNav(!mobileNav)} className='hamburger' type="menu" style={{
                    cursor: 'pointer',
                    fontSize: '2rem',
                    marginRight: 40,
                    display: 'none'
                }} />
            </div>
            <ul className='mobileNav' style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                margin: '0 150px 0 0',
                background: scrollPos > 50 ? '#fff' : '#ffffff80',
                height: mobileNav ? 230 : 0,
                overflow: 'hidden'
            }}>
                <li style={{ padding: '10px 0', textAlign: 'center' }}>
                    Beranda
                    </li>
                <li style={{ padding: '10px 0', textAlign: 'center' }}>
                    Dokter
                    </li>
                <li style={{ padding: '10px 0', textAlign: 'center' }}>
                    Info Kesehatan
                    </li>
                <li style={{ padding: '10px 0', textAlign: 'center' }}>
                    Kontak
                    </li>
            </ul>
        </nav>
    );
}

export default Navbar;