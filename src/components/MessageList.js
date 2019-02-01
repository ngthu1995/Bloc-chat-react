import React, { Component } from 'react';
import style from './../messagelist.module.css'

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messagesList : [],
            roomId: '',
            newMessage: '', 
            username: '',
            sendAt: ''
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

    handleChange(e) {   
        this.setState({
            newMessage: e.target.value,
            roomId: this.props.activeRoom.key,
            username: this.props.user.displayName
        });
    }

    handleCreateMessage(e) {
        this.messagesRef.push({
            message: this.state.newMessage,
            roomId: this.state.roomId,
            sendAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            username: this.state.username
        })
        e.preventDefault();       
        this.setState({newMessage: ''});
    }

    render() { 
        return (
            <section className={this.props.activeRoom ? style.active : style.none}>
                <h2>Message List will be here.</h2>
                <h4>{this.props.activeRoom.name}</h4>
                <form onSubmit={(e) => this.handleCreateMessage(e)}>
                    <input type="text" value={this.state.newMessage} onChange={ (e) => this.handleChange(e) }/>
                    <button type="submit">Submit</button>
                </form>

                { this.state.messagesList.map( message => 
                    {if (message.roomId === this.props.activeRoom.key) {
                        return <div key={message.key}><h4>{message.message}</h4><h4>{message.username}</h4></div>
                    
                      }
                      return null;}
                )}
                  
                
            </section>
         );
    }
}
 
export default MessageList;