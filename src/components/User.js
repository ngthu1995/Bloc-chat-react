import React, { Component } from "react";
import style from "./../user.module.css";

class User extends Component {
  handlesignIn = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        var token = result.credential.accessToken;
        var user = result.user.displayName;
        this.props.setUser(user);
        console.log(user);
      });
  };

  handlesignOut() {
    this.props.firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.setUser(null);
      });
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }
  render() {
    return (
      <section className={style.header}>
        <div className={style.header_nav}>
          {this.props.user ? this.props.user.displayName : "Guest"}
        </div>
        {this.props.user ? (
          <button onClick={() => this.handlesignOut()}>Sign Out</button>
        ) : (
          <button onClick={() => this.handlesignIn()}>Sign In</button>
        )}
      </section>
    );
  }
}

export default User;
