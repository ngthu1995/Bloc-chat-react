import React, { Component } from 'react';
import './App.css';
import  RoomList  from './components/RoomList';
import MessageList from './components/MessageList';
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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: ''
    }
  }

  setActiveRoom(room) {
    console.log('room');
    this.setState({ activeRoom: room });
    console.log(this.state.activeRoom);
  }

  render() {
    return (
      <div className="App">
        <RoomList
          firebase = {firebase} activeRoom={this.state.activeRoom} setActiveRoom={() => this.setActiveRoom()}
        />
        <MessageList
         firebase = {firebase} activeRoom={this.state.activeRoom} 
         />
      </div>
    );
  }
}

export default App;
