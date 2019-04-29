import React, { Component } from "react";
import ReactDOM from "react-dom";
import style from "./../messagelist.module.css";
import sendIcon from "./../images/send-icon.png";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messagesList: [],
      roomId: "",
      newMessage: "",
      username: "",
      sendAt: ""
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({});
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    console.log(this.messagesRef);
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messagesList: this.state.messagesList.concat(message) });
    });
    this.scrollToBottom();
  }

  handleChange(e) {
    this.setState({
      newMessage: e.target.value,
      roomId: this.props.activeRoom.key,
      username: this.props.user ? this.props.user.displayName : ""
    });
  }

  handleCreateMessage(e) {
    this.messagesRef.push({
      message: this.state.newMessage,
      roomId: this.state.roomId,
      sendAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.state.username
    });
    e.preventDefault();
    this.setState({ newMessage: "" });
  }

  render() {
    return (
      <section className={this.props.activeRoom ? style.active : style.none}>
        <div className={style.chat_box}>
          <div className={style.chat_about}>
            To: {this.props.activeRoom.name}
          </div>
          <div className={style.chat_pane}>
            <div className={style.empty} />
            <div className={style.chat_log}>
              {this.state.messagesList.map(message => {
                if (message.roomId === this.props.activeRoom.key) {
                  return (
                    <div key={message.key} className={style.chat}>
                      <span className={style.user_photo} />
                      <div className={style.chat_content}>
                        <div className={style.chat_user_name}>
                          {message.username}
                        </div>
                        <div className={style.chat_message}>
                          {message.message}
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
              <div
                style={{ float: "left", clear: "both" }}
                ref={el => {
                  this.messagesEnd = el;
                }}
              />
            </div>
            <footer>
              <form
                className={style.chat_form}
                onSubmit={e => this.handleCreateMessage(e)}
              >
                <input
                  type="text"
                  value={this.state.newMessage}
                  onChange={e => this.handleChange(e)}
                  placeholder="Type your message"
                />
                <button type="submit" className={style.icon}>
                  <img src={sendIcon} alt="send Icon" />
                </button>
              </form>
              <div />
            </footer>
          </div>
        </div>
      </section>
    );
  }
}

export default MessageList;
