import React, { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import firebase from './components/config';
import 'firebase/auth';
import { Spin } from 'antd';

//COMPONENTS
import Navbar from './components/NAVBAR/Navbar';
import Home from './components/HOME/Home';
import Admin from './components/ADMIN/Admin';
import AdminPage from './components/ADMIN/Admin-Page';
import Footer from './components/FOOTER/Footer';
import JadwalDokterUser from './components/JadwalDokter/JadwalDokter';
import InfoKesehatan from './components/INFO-KESEHATAN/InfoKesehatan';
import ArtikelDetail from './components/ArtikelDetail/ArtikelDetail';
import Kontak from './components/KONTAK/Kontak';





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
  }, [])

  const [currentPath] = useState(window.location.pathname);
  const [ready, setReady] = useState(false);
  const [auth, setAuth] = useState(false);


  return (
    <Router>
      <Switch>
        <>
          {ready ?

            auth ?
              <>
                {currentPath.slice(0, 12) !== '/admin-page/' ? <Redirect to='/admin-page/jadwal-dokter' /> : <Redirect to={currentPath} />}
                <Route path='/admin-page/' render={() => <AdminPage />} />

              </>
              :
              <div className="App">
                {currentPath.slice(0, 12) !== '/admin-page/' ? <Redirect to={currentPath} /> : <Redirect exact to='/' />}
                {currentPath === '/admin' ? null : <Navbar />}
                <Route exact path='/' component={Home} />
                <Route exact path='/admin' component={Admin} />
                <Route exact path='/jadwal-dokter' component={JadwalDokterUser} />
                <Route exact path='/info-kesehatan' component={InfoKesehatan} />
                <Route path='/admin-page/info-kesehatan/detail/' render={() => <ArtikelDetail />} />
                <Route path='/kontak' render={() => <Kontak />} />
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
