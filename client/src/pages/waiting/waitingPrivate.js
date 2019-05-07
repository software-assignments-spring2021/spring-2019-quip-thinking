import React from 'react';
import './waiting.css';
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'
import socket, { getPlayers, getPrompts, subscribeToJoins, startGame } from '../../utils/api'

class WaitingPrivate extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      players: [],
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
  }

  receivedPlayers(players){
    this.setState({players: players})
  }

  startPrivateGame(){
    const roomCode = this.props.roomCode;
    const round = this.state.round;
    startGame(roomCode, res => {
      const {start, prompts} = res
      if(start === "true"){
        console.log("hitme")
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

  receivedPrompts(prompts){
    this.setState({prompts: prompts})
  }

  componentDidMount(){
    const { roomCode } = this.props
    getPlayers(roomCode, (players) => {
      this.receivedPlayers(players)
    })

    getPrompts(this.props.roomCode, res => {
      const {msg, prompts} = res
      this.receivedPrompts(prompts);
      // console.log("YAY, START THE GAME WITH: " + prompts);
    })

  }

  componentWillUnmount(){
    socket.off('join-private-room')

  }

  render() {
    const { players } = this.state
    return (
      <>
        <div id="waitingPrivate">
          <div id="heading">
            <h1>{this.props.roomName}</h1>
            <h2 id="code">Room Code: {this.props.roomCode}</h2>
            <h2 id="time">Timer: </h2>
          </div>
          <div id="players">
            {players.map(p => (
              <h3 key={p}>Player Name: {p}</h3>
            ))}
          </div>
          <Button variant="primary" type="submit">Start the Game!</Button>
        </div>
      </>
    )
  }
}

export default withRouter(WaitingPrivate)
