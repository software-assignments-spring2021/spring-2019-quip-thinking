import React from "react";
import "./game.css";
import socket, { sendVote, getInfo, updateTimer, startTimer, endRound } from '../../utils/api'
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
      voted: false
    }



    updateTimer(res=>{
      let {roomCode} = this.props
     let times = res.countdown;
     console.log(times, 'yay');
     this.setState({times: times});
     if(times === 1){

       this.props.history.push({
         pathname: "/scoreboard/private",
         state: {
           roomCode
         }
       })

     }

    });


  }



  // send vote to backend

  castVote(id) {
    const { roomCode } = this.props;
    console.log("CASTING MY VOTE");
    console.log("PLAYERID: ", this.state.playerID);

    if(this.state.accumulator >= this.state.prompts.length){
      this.setState({
        finished: true,
      })
    }else{
      this.setState({
        accumulator: this.state.accumulator+1,
      })
    }
    console.log(this.state.accumulator);
    console.log(id);
    console.log(this.props.roomCode);
    // sendVote(this.state.playerID, roomCode, this.state.chosenQuip);
    sendVote(id, this.props.roomCode);
  }


  // if user votes for the first quip
  chooseQuip1() {
    console.log("hi hi ");
    console.log('')
    let boom = this.state.prompts[this.state.accumulator-1]
    let vote = this.props.prompts;
    console.log('this is object keys');
    console.log(Object.keys(vote));
    console.log(vote[boom]);
    let id = [];
    for(var key in vote[boom]){
      id.push(key)
    }

    console.log(id[0])


    this.setState({
      // chosenQuip: this.state.idQuipArray[0][1],
      playerID: id[0],
    });
    this.castVote(id[0])
  }

  // if user votes for the second quip
  chooseQuip2() {
    console.log("hi hi ");

    let boom = this.state.prompts[this.state.accumulator-1]
    let vote = this.props.prompts;
    console.log('this is object keys');
    console.log(Object.keys(vote));
    console.log(vote[boom]);
    let id = [];
    for(var key in vote[boom]){
      id.push(key)
    }

    console.log(id[1])

    this.setState({
      // chosenQuip: this.state.idQuipArray[0][1],
      playerID: id[1],
    });
    this.castVote(id[1])

  }



  // load the page with the prompts, first quip, and second quip
  componentDidMount(){
    startTimer();
    // const roomCode = this.props.roomCode
    const prompts = this.props.prompts;
    // console.log(roomCode);
    // console.log(prompts);

    let promptArray = [];
    let quipArray = [];
    for (var key in prompts) {
      console.log(key);
      promptArray.push(key);
      for (var key2 in prompts[key]) {
        for (var key3 in prompts[key][key2])
        quipArray.push(prompts[key][key2][key3]);
      }
    }

    console.log("CURRENT PROMPT ARRAY", promptArray);
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
    //console.log(this.state.idQuipArray);
    const { roomCode } = this.props;
    if (this.state.accumulator === this.state.prompts.length) {
      this.props.history.push({
        pathname: "/scoreboard/private",
        state: {
          roomCode,
        }
      });
    }
  }

  // cut off connection with end-round
  componentWillUnmount() {
    socket.off('end-round')
  }

  showPrompt(accumulator) {
    return (
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
    );
  }

  // call above methods when corresponding button is clicked
  render() {
    return(
      <>
        <div><h2>Time: {this.state.times}</h2></div>
        <div className="create">
          { this.state.finished ?  'Waiting for other players': this.showPrompt(this.state.accumulator)}
        </div>
        <div><h2>Time: {this.state.times}</h2></div>


      </>
    );
  }
}

export default withRouter(Vote);
