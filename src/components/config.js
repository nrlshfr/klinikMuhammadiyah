import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDrvDV5UPaEjTEZhF86mcxUTueO1mgUQcc",
    authDomain: "klinik-muhammadiyah.firebaseapp.com",
    databaseURL: "https://klinik-muhammadiyah.firebaseio.com",
    projectId: "klinik-muhammadiyah",
    storageBucket: "klinik-muhammadiyah.appspot.com",
    messagingSenderId: "652331234366",
    appId: "1:652331234366:web:14018177fcb95dcd"
};

firebase.initializeApp(firebaseConfig);

export default firebase;