import React from "react";
import "./game.css";
import { Row, Col, Button, Jumbotron } from "react-bootstrap";
import Header from "../../components/header";
import socket, { sendVote, getInfo } from '../../utils/api'
import { withRouter } from 'react-router-dom';

class Vote extends React.Component {
  // initialize the state of the page
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      prompts: undefined,
      playerID: undefined,
      chosenQuip: "",
      idQuipArray: [],
    }
  }

  // send vote to backend
  castVote() {
    const { roomCode } = this.props.roomCode;
    sendVote(this.state.playerID, roomCode, this.state.chosenQuip);
  }

  // if user votes for the first quip
  chooseQuip1() {
    this.setState({
      chosenQuip: this.state.idQuipArray[0][1],
      playerID: this.state.idQuipArray[0][0],
    });
    this.castVote()
  }

  // if user votes for the second quip
  chooseQuip2() {
    this.setState({
      chosenQuip: this.state.idQuipArray[1][1],
      playerID: this.state.idQuipArray[1][0],
    });
    this.castVote()
  }

  // load the page with the prompts, first quip, and second quip
  componentDidMount(){
    const  roomCode  = this.props.roomCode
    const prompts = this.props.prompts
    console.log(roomCode);
    console.log(prompts);
    getInfo(roomCode, (prompts) => {
      this.setState({
        prompts: prompts,
      });
    })
    var promptArray = [];
    for (var prompt in this.state.prompts) {
      promptArray.push(prompt);
    }

    for (var [key1, key2] in promptArray[this.state.current]) {
      this.setState({
        idQuipArray: [[key1, promptArray[this.state.current].key1], [key2, promptArray[this.state.current].key2]],
        current: this.state.current + 1,
      });
    }
  }

  // cut off connection with end-round
  componentWillUnmount() {
    socket.off('end-round')
  }

  // call above methods when corresponding button is clicked
  render() {
    return(
  <>
    <div className="create">
        OMG IT WORKED
    </div>
  </>
    )
  }

}




export default withRouter(Vote);
