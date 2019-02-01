import React, { Component } from 'react';
import './App.css';
import  RoomList  from './components/RoomList';
import MessageList from './components/MessageList';
import * as firebase from 'firebase';
import User from './components/User';

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
      activeRoom: '', 
      user: null
    }
  }

  handlerSetActiveRoom = (room) => {
    this.setState({ activeRoom: room });
    // console.log(this.state.activeRoom);
  }

  setUser = (user) => {
    this.setState({ user: user });
  }

  render() {
    return (
      <div className="App">
        <RoomList className="room-list"
          firebase = {firebase} activeRoom={this.state.activeRoom} toSetActiveRoom={this.handlerSetActiveRoom}
        />
        <MessageList className="message-list"
         firebase = {firebase} activeRoom={this.state.activeRoom} 
         />
         <User firebase={firebase} setUser={this.setUser} user={this.state.user}/>
      </div>
    );
  }
}

export default App;
