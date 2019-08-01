import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Menu, Icon, Layout, Modal } from 'antd';
import { Link, Route } from 'react-router-dom';
import JadwalDokter from './jadwal-dokter';
import TambahDokter from './Tambah-Dokter';
import BuatArtikel from './Buat-Artikel';
import SemuaArtikel from './Semua-artikel';
import ArtikelDetail from '../ArtikelDetail/ArtikelDetail';
import Pesan from './Pesan';
import Invoice from './Invoice';
import BuatInvoice from './BuatInvoice';
import SemuaInvoice from './SemuaInvoice';

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;
const { confirm } = Modal;

const AdminPage = () => {
    useEffect(() => {
        window.addEventListener('keypress', (e) => {
            if (e.key === '~') {
                showConfirm();
            }
        })
    })

    const showConfirm = () => {
        confirm({
            title: 'Keluar dari halaman admin ?',
            onOk() {
                firebase.auth().signOut();
            },
            onCancel() { },
        });
    }

    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" style={{
                    width: '120px',
                    height: '31px',
                    margin: '16px 24px 16px 0',
                    float: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <p style={{ fontSize: '.7rem', color: '#fff' }}>Klinik Muhammadiyah</p>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[window.location.pathname]}
                    style={{ lineHeight: '64px' }}
                >
                    <SubMenu title={
                        <span className="submenu-title-wrapper">
                            <Icon type="diff" />
                            Dokter
                         </span>
                    }>
                        <Menu.ItemGroup>
                            <Menu.Item key="/admin-page/jadwal-dokter">
                                <Link to='/admin-page/jadwal-dokter'>
                                    Jadwal Dokter
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/admin-page/tambah-dokter">
                                <Link to='/admin-page/tambah-dokter'>
                                    Tambah Dokter
                                </Link>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>

                    <SubMenu title={
                        <span className="submenu-title-wrapper">
                            <Icon type="book" />
                            Invoice
                         </span>
                    }>
                        <Menu.ItemGroup>
                            <Menu.Item key="/admin-page/semua-invoice">
                                <Link to='/admin-page/semua-invoice'>
                                    Semua Invoice
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/admin-page/buat-invoice">
                                <Link to='/admin-page/buat-invoice'>
                                    Buat Invoice
                                </Link>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <SubMenu title={
                        <span className="submenu-title-wrapper">
                            <Icon type="form" />
                            Artikel
                         </span>
                    }>
                        <Menu.ItemGroup >
                            <Menu.Item key="/admin-page/buat-artikel">
                                <Link to='/admin-page/buat-artikel'>
                                    Buat Artikel
                            </Link>
                            </Menu.Item>
                            <Menu.Item key="/admin-page/semua-artikel">
                                <Link to='/admin-page/semua-artikel'>
                                    Semua Artikel
                                </Link>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <Menu.Item key="/admin-page/pesan">
                        <Link to='/admin-page/pesan'>
                            <Icon type='mail' />
                            Pesan
                        </Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64, minHeight: '100vh' }}>

                <Route path='/admin-page/jadwal-dokter' render={() => <JadwalDokter />} />
                <Route path='/admin-page/tambah-dokter' render={() => <TambahDokter />} />
                <Route path='/admin-page/buat-artikel' render={() => <BuatArtikel />} />
                <Route path='/admin-page/invoice' render={() => <Invoice />} />
                <Route path='/admin-page/buat-invoice' render={() => <BuatInvoice />} />
                <Route path='/admin-page/semua-invoice' render={() => <SemuaInvoice />} />
                <Route path='/admin-page/semua-artikel' render={() => <SemuaArtikel />} />
                <Route path='/admin-page/info-kesehatan/detail/' render={() => <ArtikelDetail />} />
                <Route path='/admin-page/pesan' render={() => <Pesan />} />

            </Content>
            <Footer style={{ textAlign: 'center' }}>Copyright {new Date().getFullYear()} | Nurul Shafira</Footer>
        </Layout>
    );
}

export default AdminPage;