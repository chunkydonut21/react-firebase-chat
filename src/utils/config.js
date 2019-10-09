import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyCfRSDKN5_unxf_vbZj2XGIO1L1-VKuKBg',
    authDomain: 'react-slack-7a6e5.firebaseapp.com',
    databaseURL: 'https://react-slack-7a6e5.firebaseio.com',
    projectId: 'react-slack-7a6e5',
    storageBucket: 'react-slack-7a6e5.appspot.com',
    messagingSenderId: '913248544335',
    appId: '1:913248544335:web:2ef8dc70c36a2b59db2c3a'
}

firebase.initializeApp(firebaseConfig)

export default firebase
