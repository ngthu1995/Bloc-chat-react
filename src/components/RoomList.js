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
            <section className={style.room_container}>
                <div className={style.room_header} >ROOM LIST</div>
                <div className={style.room_list}>
                    <form className={style.room_form} onSubmit={(event) => this.handleCreateRoom(event)}>
                        <input 
                            type="text" 
                            placeholder="Create your own room ..."
                            value={this.state.newRoom} 
                            className={style.input_bg}
                            onChange={ (e) => this.handleChange(e) }
                        />
                        {/* <button type="submit">Submit</button> */}
                    </form>

                    {this.state.rooms.map( room =>
                        <div key={room.key} className={style.room_channel}>    
                            <div  
                            className={room.key === this.props.activeRoom.key ? style.room_active : style.room}
                            onClick={ () => this.setRoom(room)}>{room.name}</div>
                        </div> 
                    )}
                </div>
                
            </section>
        );
    }
}
 
export default RoomList;