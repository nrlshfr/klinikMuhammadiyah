import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Menu, Icon, Layout, Modal } from 'antd';
import { Link, Route } from 'react-router-dom';
import JadwalDokter from './jadwal-dokter';
import TambahDokter from './Tambah-Dokter';
import BuatArtikel from './Buat-Artikel';
import SemuaArtikel from './Semua-artikel';
import Pesan from './Pesan';
import Invoice from './Invoice';
import BuatInvoice from './BuatInvoice';
import SemuaInvoice from './SemuaInvoice';
import { Button } from 'antd/lib/radio';
import InputData from './InputData';
import Layanan from './Layanan';
import Obat from './Obat';
import AdminArtikelDetail from './AdminArtikelDetail';
import TambahInfoLayanan from './TambahInfoLayanan';

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;
const { confirm } = Modal;

const AdminPage = () => {
    useEffect(() => {
        let logout = '';
        window.addEventListener('keypress', (e) => {
            logout = logout.concat(e.key);
            if (logout === 'logout') {
                showConfirm();
            }
            setTimeout(() => {
                logout = '';
            }, 2000);
        })

        window.addEventListener('resize', () => {
            setScreenWidth(document.body.clientWidth);
            if (screenWidth <= 800) {
                setEnableAdmin(false);
            } else {
                setEnableAdmin(true);
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

    const [screenWidth, setScreenWidth] = useState(document.body.clientWidth);
    const [enableAdmin, setEnableAdmin] = useState(screenWidth <= 800 ? false : true);
    console.log(screenWidth);

    return (
        <Layout>
            {enableAdmin ?
                <>
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
                                    <Icon type="info" />
                                    Info Layanan
                         </span>
                            }>
                                <Menu.ItemGroup>
                                    <Menu.Item key="/admin-page/tambah-layanan">
                                        <Link to='/admin-page/tambah-layanan'>
                                            Tambah Layanan
                                </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/admin-page/semua-layanan">
                                        <Link to='/admin-page/semua-layanan'>
                                            Semua Layanan
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
                                    <Icon type="sliders" />
                                    Daftar Harga
                         </span>
                            }>
                                <Menu.ItemGroup >
                                    <Menu.Item key="/admin-page/layanan">
                                        <Link to='/admin-page/layanan'>
                                            Layanan
                            </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/admin-page/obat">
                                        <Link to='/admin-page/obat'>
                                            Obat
                                </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/admin-page/input-data">
                                        <Link to='/admin-page/input-data'>
                                            Input Data
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
                        <Route path='/admin-page/tambah-layanan' render={() => <TambahInfoLayanan />} />
                        <Route path='/admin-page/buat-artikel' render={() => <BuatArtikel />} />
                        <Route path='/admin-page/invoice' render={() => <Invoice />} />
                        <Route path='/admin-page/buat-invoice' render={() => <BuatInvoice />} />
                        <Route path='/admin-page/semua-invoice' render={() => <SemuaInvoice />} />
                        <Route path='/admin-page/semua-artikel' render={() => <SemuaArtikel />} />
                        <Route path='/admin-page/info-kesehatan/detail/' render={() => <AdminArtikelDetail />} />
                        <Route path='/admin-page/pesan' render={() => <Pesan />} />
                        <Route path='/admin-page/layanan' render={() => <Layanan />} />
                        <Route path='/admin-page/obat' render={() => <Obat />} />
                        <Route path='/admin-page/input-data' render={() => <InputData />} />

                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Copyright {new Date().getFullYear()} | Nurul Shafira</Footer>
                </>
                :
                <div style={{ padding: '10px 20px' }}>
                    <h1 style={{ textAlign: 'center' }}>Halaman admin tidak tersedia untuk mobile</h1>
                    <Button style={{ width: '100%', textAlign: 'center' }} onClick={() => firebase.auth().signOut()}>Keluar</Button>
                </div>
            }
        </Layout>
    );
}

export default AdminPage;