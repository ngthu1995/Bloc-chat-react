import React, { Component } from 'react';
import style from './../roomlist.module.css'

class RoomList extends Component {
    constructor(props) {
        super(props); 
            this.state = {
                rooms : [],
                newRoom: ''
            }

    this.roomsRef = this.props.firebase.database().ref('rooms')    
    };

    componentDidMount() {
        console.log('asfdasdf')
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key ;
          this.setState({ rooms: this.state.rooms.concat( room )});
        });
    }

    shouldComponentUpdate(props, state) {
        console.log('[should component update: new room added] ' + props, state);
        return true;
    }

    handleChange(event) {
        this.setState({newRoom: event.target.value});
    }

    handleCreateRoom(e) {
        this.roomsRef.push({
            name: this.state.newRoom
        })
        this.setState({newRoom: ''})
        e.preventDefault();
    }

    setRoom(room) {
        this.props.toSetActiveRoom(room);
        console.log(room);
    }

    render() { 

        return (
            <section className={style.container}>
                <h1>Room List</h1>
                {this.state.rooms.map( room =>
                    <h1 key={room.key} onClick={ () => this.setRoom(room)}>{room.name}</h1>
                )}
                <form onSubmit={(event) => this.handleCreateRoom(event)}>
                    <input type="text" value={this.state.newRoom} onChange={ (e) => this.handleChange(e) }/>
                    <button type="submit">Submit</button>
                </form>
            </section>
        );
    }
}
 
export default RoomList;