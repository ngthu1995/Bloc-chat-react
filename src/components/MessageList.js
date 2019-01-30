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
        this.setState({newMessage: event.target.value});
    }

    handleCreateMessage(e) {
        this.messagesRef.push({
            list: this.state.newMessage
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
                    <h2 key={message.key}>{message.list}</h2>
                )}
            </div>
         );
    }
}
 
export default MessageList;