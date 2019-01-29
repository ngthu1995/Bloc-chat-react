import React, { Component } from 'react';
import style from './../messagelist.module.css'

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messagesList : []
        }

        this.messagesRef = this.props.firebase.database().ref('messages');    
    };

    componentDidMount() {
        console.log(this.messagesRef);
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messagesList : this.state.messagesList.concat( message )});
        });
    }



    render() { 
        return ( 
            <div className="messagesList">
                <h1>Message List will be here.</h1>
                { this.state.messagesList.map( message => 
                    <h2 key={message.key}>{message.name}</h2>
                )}
            </div>
         );
    }
}
 
export default MessageList;