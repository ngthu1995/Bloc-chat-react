import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messagesList : [],
            roomId: '',
            newMessage: ''
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

    handleChange(event) {
        event.preventDefault();
        this.setState({
            newMessage: event.target.value,
            roomId: this.props.activeRoom.key
        });
        console.log(this.state.roomId);
    }

    handleCreateMessage(e) {
        this.messagesRef.push({
            message: this.state.newMessage,
            roomId: this.state.roomId
        })
        this.setState({newMessage: ''});
        e.preventDefault();
    }

    render() { 
        return (
            <div className="messagesList">
                <h1>Message List will be here.</h1>
                <form onSubmit={ (e) => this.handleCreateMessage(e) } >
                    <input type="text" value={this.state.newMessage} onChange={ (e) => this.handleChange(e) }/>
                    <button type="submit">Submit</button>
                </form>
                { this.state.messagesList.map( message => 
                    {if (message.roomId === this.props.activeRoom.key) {
                        return <h1 key={message.key}>{message.message}</h1>
                      }
                      return null;}
                )}
                    
                
            </div>
         );
    }
}
 
export default MessageList;