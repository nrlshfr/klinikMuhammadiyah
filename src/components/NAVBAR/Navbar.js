import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import { Icon, Menu, Dropdown, Modal, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

const Navbar = ({ auth }) => {
    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScrollpos(window.scrollY);
        })
    }, [])

    const [scrollPos, setScrollpos] = useState(0);
    const [mobileNav, setMobileNav] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const modal = (
        <Modal
            title="Keluar"
            visible={visibleModal}
            closable={false}
            footer={[
                <Button key="back" onClick={() => setVisibleModal(false)}>
                    Kembali
            </Button>,
                <Button onClick={() => firebase.auth().signOut().then(() => window.location.pathname = '/')} key="submit" type="primary">
                    Keluar
            </Button>,
            ]}
        >
            {<p>Keluar dari akun {auth ? firebase.auth().currentUser.displayName : null} </p>}
        </Modal>
    );

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <NavLink to={auth ? `/Jadwal-Konsultasi/${firebase.auth().currentUser.uid}` : ''}>
                    <p onClick={() => setMobileNav(false)} style={{ cursor: 'pointer', margin: 0 }}>Jadwal Konsultasi</p>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="1">
                <p style={{ cursor: 'pointer', margin: 0 }} onClick={() => setVisibleModal(true)}>Keluar</p>
            </Menu.Item>
        </Menu>
    )
    return (
        <nav className='navbar' style={{
            width: '100%',
            zIndex: 1000
        }}>
            {modal}
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
                background: '#fff',
                boxShadow: scrollPos > 50 ? '0px 2px 10px rgba(0,0,0,.4)' : 'none',
                justifyContent: 'space-between'
            }}>
                <h1 className='klinikMuhammadiyah' style={{ margin: '0 0 0 50px' }}>KLINIK MUHAMMADIYAH BOGOR</h1>

                <ul className='navItems' style={{
                    display: 'flex',
                    width: 500,
                    justifyContent: 'space-evenly',
                    margin: '0 150px 0 0',

                }}>
                    <li>
                        <NavLink activeClassName='navActive' exact to='/'>Beranda</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='navActive' to='/jadwal-dokter'>Dokter</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='navActive' to='/info-kesehatan'> Info Kesehatan</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='navActive' to='/kontak'>Kontak</NavLink>
                    </li>
                    <li>
                        {auth ?
                            <Dropdown overlay={menu} trigger={['click']}>
                                <p className="ant-dropdown-link" style={{ cursor: 'pointer', color: '#1890ff' }}>
                                    {firebase.auth().currentUser.displayName} <Icon type="down" />
                                </p>
                            </Dropdown>
                            : <NavLink activeClassName='navActive' to='/masuk'>Masuk</NavLink>}
                    </li>
                </ul>

                <Icon onClick={() => setMobileNav(!mobileNav)} className='hamburger' type="menu" style={{
                    cursor: 'pointer',
                    fontSize: '1.5rem',
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
                background: '#fff',
                height: mobileNav ? 230 : 0,
                overflow: 'hidden',
                position: 'absolute'
            }}>
                <li style={{ padding: '10px 0', textAlign: 'center' }} onClick={() => setMobileNav(false)}>
                    <NavLink activeClassName='navActive' exact to='/'>Beranda</NavLink>
                </li>
                <li style={{ padding: '10px 0', textAlign: 'center' }} onClick={() => setMobileNav(false)}>
                    <NavLink activeClassName='navActive' to='/jadwal-dokter'>Dokter</NavLink>
                </li>
                <li style={{ padding: '10px 0', textAlign: 'center' }} onClick={() => setMobileNav(false)}>
                    <NavLink activeClassName='navActive' to='/info-kesehatan'> Info Kesehatan</NavLink>
                </li>
                <li style={{ padding: '10px 0', textAlign: 'center' }} onClick={() => setMobileNav(false)}>
                    <NavLink activeClassName='navActive' to='/kontak'>Kontak</NavLink>
                </li>
                <li style={{ padding: '10px 0', textAlign: 'center' }}>
                    {auth ?
                        <Dropdown overlay={menu} trigger={['click']}>
                            <p className="ant-dropdown-link" style={{ color: '#1890ff' }} >
                                {firebase.auth().currentUser.displayName} <Icon type="down" />
                            </p>
                        </Dropdown>
                        : <NavLink onClick={() => setMobileNav(false)} activeClassName='navActive' to='/masuk'>Masuk</NavLink>}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;