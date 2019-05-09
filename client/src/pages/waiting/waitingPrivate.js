import React from 'react';
import './waiting.css';
// import "../games/Timer.js";
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import socket, { getPlayers, getPrompts, subscribeToJoins, startGame } from '../../utils/api';

class WaitingPrivate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [this.props.playerName],
      errorText: "",
      prompts: [],
      round: 1,
    }
    this.receivedPlayers.bind(this);
    subscribeToJoins((err, players) => {
      if (!err) {
        this.receivedPlayers(players);
      }
    })
    this.receivedPrompts.bind(this);
  }

  receivedPlayers(players) {
    this.setState({players: players});
  }

  startPrivateGame() {
    const roomCode = this.props.roomCode;
    startGame(roomCode, res => {
    })
  }

  receivedPrompts(prompts) {
    this.setState({prompts: prompts});
  }
  
  // mount components
  componentDidMount() {
    const { roomCode } = this.props;
    getPlayers(roomCode, (players) => {
      this.receivedPlayers(players);
    })

    getPrompts(this.props.roomCode, res => {
      const { start, prompts } = res;
      const round = this.state.round;
      //if there are enough players and the code is correct, send to next page
      if (start === "true") {
        this.receivedPrompts(prompts);
        this.props.history.push({
          pathname: "/answer/private",
          state: {
            roomCode,
            prompts,
            round,
          }
        })
      } else {
        this.setState({errorText: "You either don't have enough players or are sending an incorrect code. Please try again."});
      }
    })
  }

  //unmount components
  componentWillUnmount() {
    socket.off('join-private-room');
    socket.off('start-game');
  }

  render() {
    const { players } = this.state;
    return (
      <>
        <div id="waitingPrivate">
          <div id="heading">
            <h1 id="roomName">{this.props.roomName}</h1>
            <p id="code">Room Code: {this.props.roomCode}</p>
              {/* <p id="time">Timer: <span id="timer"></span> </p> */}
          </div>
          <div id="players">
            {players.map(p => (
              <p key={p}>Player Name: {p}</p>
            ))}
          </div>
          <div>{this.state.errorText}</div>
          <Button variant="primary" type="submit" onClick={this.startPrivateGame.bind(this)}>Start the Game!</Button>
        </div>
      </>
    )
  }
}

export default withRouter(WaitingPrivate);
