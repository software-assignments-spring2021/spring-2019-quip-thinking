import React from "react";
import "./game.css";
import socket, { sendVote, updateTimer, startTimer, endVote } from '../../utils/api'
import { withRouter } from 'react-router-dom';

class Vote extends React.Component {
  // initialize the state of the page
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      prompts: [],
      playerID: '',
      chosenQuip: "",
      quip: [],
      finished: false,
      accumulator: 1,
      playerIds: [],
      times: 0,
      voted: false,
      score: {},
    }

    updateTimer(res=>{
    let {roomCode} = this.props
     let times = res.countdown;
     let scores = this.state.score;
     this.setState({times: times});
     if(times === 10 ){
      this.props.history.push({
        pathname: "/scoreboard/private",
        state: {
          roomCode,
          scores,
        }
      })
     }
    });
  }

  // send vote to backend
  castVote(id) {
    if(this.state.accumulator >= this.state.prompts.length){
      this.setState({
        finished: true,
      })
    }else{
      this.setState({
        accumulator: this.state.accumulator+1,
      })
    }
    sendVote(id, this.props.roomCode);
  }

  // if user votes for the first quip
  chooseQuip1() {
    let boom = this.state.prompts[this.state.accumulator-1]
    let vote = this.props.prompts;
    let id = [];
    for(var key in vote[boom]){
      id.push(key)
    }
    this.setState({
      playerID: id[0],
    });
    this.castVote(id[0])
  }

  // if user votes for the second quip
  chooseQuip2() {
    let boom = this.state.prompts[this.state.accumulator-1]
    let vote = this.props.prompts;
    let id = [];
    for(var key in vote[boom]){
      id.push(key)
    }
    this.setState({
      // chosenQuip: this.state.idQuipArray[0][1],
      playerID: id[1],
    });
    this.castVote(id[1])
  }

  // load the page with the prompts, first quip, and second quip
  componentDidMount(){
    startTimer();
    const prompts = this.props.prompts;

    let promptArray = [];
    let quipArray = [];
    for (var key in prompts) {
      promptArray.push(key);
      for (var key2 in prompts[key]) {
        for (var key3 in prompts[key][key2])
        quipArray.push(prompts[key][key2][key3]);
      }
    }

    this.setState({
      prompts: promptArray,
      quip: quipArray,
    });

    endVote(res => {
      const scores = res.scores;
      this.setState({
        score: scores,
      })
    });

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
    socket.off('timer')
  }

  showPrompt(accumulator) {
    return (
      <div>
        <h1>Vote for the funniest quip.</h1>
        <h1 id="showprompt">{this.state.prompts[accumulator-1]}</h1>
        <div id="quips">
          <div id="firstquip" className="quip">
            <p>{this.state.quip[this.state.accumulator*2-2]}</p>
            <button onClick={this.chooseQuip1.bind(this)}>Vote</button>
          </div>
          <div id="secondquip" className="quip">
            <p>{this.state.quip[this.state.accumulator*2-1]}</p>
            <button onClick={this.chooseQuip2.bind(this)}>Vote</button>
          </div>
        </div>
      </div>
    );
  }

  // call above methods when corresponding button is clicked
  render() {
    return(
      <>
        <div className="create">
          <div><h2>Time: {this.state.times}</h2></div>
          { this.state.finished ?  'Waiting for other players': this.showPrompt(this.state.accumulator)}
        </div>
      </>
    );
  }
}

export default withRouter(Vote);