import React, { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import firebase from './components/config';
import 'firebase/auth';
import 'firebase/firestore';
import { Spin } from 'antd';

//COMPONENTS
import Navbar from './components/NAVBAR/Navbar';
import Home from './components/HOME/Home';
import AdminPage from './components/ADMIN/Admin-Page';
import Footer from './components/FOOTER/Footer';
import JadwalDokterUser from './components/JadwalDokter/JadwalDokter';
import InfoKesehatan from './components/INFO-KESEHATAN/InfoKesehatan';
import ArtikelDetail from './components/ArtikelDetail/ArtikelDetail';
import Kontak from './components/KONTAK/Kontak';
import Masuk from './components/AUTH/Masuk';
import BuatAkun from './components/AUTH/BuatAkun';
import JadwalKonsultasi from './components/JadwalKonsultasi/JadwalKonsultasi';





const App = () => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setReady(true);
        setAuth(true);


      } else {
        setReady(true);
        setAuth(false);


      }
    })

    const refTanggal = firebase.firestore().collection('tanggal').doc('tanggal');
    const refDokter = firebase.firestore().collection('nama_dokter');
    const refUser = firebase.firestore().collection('data_pasien');
    refTanggal.get().then(snap => {
      if (snap.data().tanggal !== new Date().getDate()) {
        refTanggal.set({ tanggal: new Date().getDate() })
        refDokter.get().then(snapshot => snapshot.forEach(child => {
          refDokter.doc(child.id).set({ semua_pasien: [] }, { merge: true })
        }))
        refUser.get().then(snapUser => snapUser.forEach(childUser => {
          refUser.doc(childUser.id).set({ jadwalKonsultasi: { DokterID: '', Poli: '', namaDokter: '' } }, { merge: true })
        }))
      }
    });
  }, [])

  const [currentPath] = useState(window.location.pathname);
  const [ready, setReady] = useState(false);
  const [auth, setAuth] = useState(false);


  return (
    <Router>
      <Switch>
        <>
          {ready ?

            auth === true && firebase.auth().currentUser.uid === 's8hHG6p2wLVQZ10QWEtPivl7xwx2' ?
              <>
                {currentPath.slice(0, 12) !== '/admin-page/' ? <Redirect to='/admin-page/jadwal-dokter' /> : <Redirect to={currentPath} />}
                <Route path='/admin-page/' render={() => <AdminPage />} />
              </>
              :
              <div className="App">
                {currentPath.slice(0, 12) !== '/admin-page/' ? <Redirect to={currentPath} /> : <Redirect exact to='/' />}
                {currentPath === '/admin' ? null : <Navbar auth={auth} />}
                <Route exact path='/' component={Home} />
                <Route exact path='/jadwal-dokter' render={() => <JadwalDokterUser auth={auth} />} />
                <Route exact path='/info-kesehatan' component={InfoKesehatan} />
                <Route path='/admin-page/info-kesehatan/detail/' render={() => <ArtikelDetail />} />
                <Route path='/kontak' render={() => <Kontak />} />
                {auth ? null : <Route path='/masuk' render={() => <Masuk />} />}
                {auth ? null : <Route path='/daftar' render={() => <BuatAkun />} />}
                {auth ? <Route path='/Jadwal-Konsultasi/' render={() => <JadwalKonsultasi />} /> : null}
                <Footer />
              </div>

            :
            <div style={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Spin size='large' className='spinner' />
            </div>

          }
        </>
      </Switch>
    </Router>
  );
}

export default App;
