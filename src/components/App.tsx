import React, { useEffect } from 'react'
import MainRouter from './MainRouter'
import firebase from 'firebase/app'
import store from '../lib/store'

const App: React.FC = () => {
  useEffect(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyDiv59wTyuGwLurgRsAsk6Mms2f7lN9qNU",
      authDomain: "sven-f425f.firebaseapp.com",
      databaseURL: "https://sven-f425f.firebaseio.com",
      projectId: "sven-f425f",
      storageBucket: "sven-f425f.appspot.com",
      messagingSenderId: "430853368900",
      appId: "1:430853368900:web:6be47276e3c9ccd439e011"
    });
  }, [])

  return (
      <div className="container-fluid p-0">
        <MainRouter />
      </div>
  )
}

export default App;
