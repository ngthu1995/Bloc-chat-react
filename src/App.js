import React, { Component } from 'react';
import './App.css';
import  RoomList  from './components/RoomList';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDpqPFMAHPAxZYoehb-krMNZJuHdyy8TAE",
  authDomain: "bloc-chat-5e942.firebaseapp.com",
  databaseURL: "https://bloc-chat-5e942.firebaseio.com",
  projectId: "bloc-chat-5e942",
  storageBucket: "bloc-chat-5e942.appspot.com",
  messagingSenderId: "663277995931"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList
          firebase = {firebase}
        />
      </div>
    );
  }
}

export default App;
