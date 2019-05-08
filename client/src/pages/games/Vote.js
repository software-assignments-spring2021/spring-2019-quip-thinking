import React from "react";
import "./game.css";
import socket, { sendVote, getInfo } from '../../utils/api'
import { withRouter } from 'react-router-dom';

class Vote extends React.Component {
  // initialize the state of the page
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      prompts: [],
      playerID: undefined,
      chosenQuip: "",
      quip: [],
      finished: false,
      accumulator: 1,
    }
  }

  // send vote to backend
  castVote() {
    const { roomCode } = this.props.roomCode;
    console.log("CASTING MY VOTE");
    console.log("PLAYERID: ", this.state.playerID);
    console.log("ROOM CODE: ", roomCode);
    // sendVote(this.state.playerID, roomCode, this.state.chosenQuip);
    sendVote(this.state.playerID, roomCode);
  }

  // if user votes for the first quip
  chooseQuip1() {
    this.setState({
      // chosenQuip: this.state.idQuipArray[0][1],
      playerID: this.state.idQuipArray[0][0],
    });
    this.castVote()
  }

  // if user votes for the second quip
  chooseQuip2() {
    this.setState({
      // chosenQuip: this.state.idQuipArray[1][1],
      playerID: this.state.idQuipArray[1][0],
    });
    this.castVote()
  }

  addAccumulator(){
    let temp = this.state.accumlator+1;
    this.setState({
      accumulator: temp,
    });
  }

  // load the page with the prompts, first quip, and second quip
  componentDidMount(){
    // const roomCode = this.props.roomCode
    const prompts = this.props.prompts
    // console.log(roomCode);
    console.log(prompts);

    let promptArray = [];
    let quipArray = [];
    for(var key in prompts){
      console.log(key);
      promptArray.push(key);
      for(var key2 in prompts[key]){
        for(var key3 in prompts[key][key2])
        quipArray.push(prompts[key][key2][key3]);
      }
    }

    console.log("CURRENT PROMPT ARRY", promptArray);
    console.log(quipArray);

    this.setState({
      prompts: promptArray,
      quip: quipArray,
    });

    for (var [key1, key2] in promptArray[this.state.current]) {
      this.setState({
        idQuipArray: [[key1, promptArray[this.state.current].key1], [key2, promptArray[this.state.current].key2]],
        current: this.state.current + 1,
      });
    }
    console.log(this.state.idQuipArray);
  }

  // cut off connection with end-round
  componentWillUnmount() {
    socket.off('end-round')
  }

  showPrompt(accumulator){
    return(
      <div>
        <h1>Vote for the funniest quip.</h1>
        <h1 id="showprompt">{this.state.prompts[accumulator-1]}</h1>
        <div id="quips">
          <div id="firstquip" class="quip">
            <p>{this.state.quip[this.state.accumulator*2-2]}</p>
            <button onClick={this.chooseQuip1.bind(this)}>Vote</button>
          </div>
          <div id="secondquip" class="quip">
            <p>{this.state.quip[this.state.accumulator*2-1]}</p>
            <button onClick={this.chooseQuip2.bind(this)}>Vote</button>
          </div>
        </div>
      </div>
    )
  }
  // call above methods when corresponding button is clicked
  render() {
    return(
      <>
        <div className="create">
          { this.state.finished ?  'Waiting for other players': this.showPrompt(this.state.accumulator)}
        </div>
      </>
    )
  }
}

export default withRouter(Vote);
