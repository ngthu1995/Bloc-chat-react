import React, { Component } from 'react';

class User extends Component {

    handlesignIn = () => {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider ).then( result => {
            var token = result.credential.accessToken;
            var user = result.user.displayName;
            this.props.setUser(user);
            console.log(user);
        });
    }

    handlesignOut() {
        this.props.firebase.auth().signOut().then( () => {
            this.props.setUser(null);
        });
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
          });
    }
    render() { 
        return ( 
            <section className="User">
            <div>{this.props.user ? this.props.user.displayName : "Guest"}</div>
            <button onClick={() => this.handlesignIn()}>Sign In</button>
            <button onClick={() => this.handlesignOut()}>Sign Out</button>
            </section>
         );
    }
}
 
export default User;