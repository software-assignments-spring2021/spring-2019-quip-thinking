import React from 'react';
import './waiting.css';
// import "../games/Timer.js";
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'
import socket, { getPlayers, getPrompts, subscribeToJoins, startGame } from '../../utils/api'

class WaitingPrivate extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      players: [this.props.playerName],
      errorText: "",
      prompts: [],
      round: 1
    }
    this.receivedPlayers.bind(this);
    subscribeToJoins((err, players) => {
      if (!err) {
        this.receivedPlayers(players)
      }
    })
    this.receivedPrompts.bind(this);
  }
  receivedPlayers(players){
    this.setState({players: players})
  }

  startPrivateGame(){
    const roomCode = this.props.roomCode;
    startGame(roomCode, res => {
    })
  }

  receivedPrompts(prompts){
    this.setState({prompts: prompts})
  }
  componentDidMount(){
    const { roomCode } = this.props
    getPlayers(roomCode, (players) => {
      this.receivedPlayers(players)
    })

    getPrompts(this.props.roomCode, res => {
      const {start, prompts} = res
      const round=this.state.round;
      if(start === "true"){
        this.receivedPrompts(prompts);
        this.props.history.push({
          pathname: "/answer/private",
          state: {
            roomCode,
            prompts,
            round
          }
        })
      }
      else{
        this.setState({errorText: "You either don't have enough players or are sending an incorrect code. Please try again."});
      }
    })
  }
  
  componentWillUnmount(){
    socket.off('join-private-room')
    socket.off('start-game')
  }

  render() {
    const { players } = this.state
    return (
      <>
        <div id="waitingPrivate">
          <div id="heading">
            <h1>{this.props.roomName}</h1>
            <h2 id="code">Room Code: {this.props.roomCode}</h2>
              <h2 id="time">Timer: <span id="timer"></span> </h2>
          </div>
          <div id="players">
            {players.map(p => (
              <h3 key={p}>Player Name: {p}</h3>
            ))}
          </div>
          <div>{this.state.errorText}</div>
          <Button variant="primary" type="submit" onClick={this.startPrivateGame.bind(this)}>Start the Game!</Button>
        </div>
      </>
    )
  }
}

export default withRouter(WaitingPrivate)
