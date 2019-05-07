import React from "react";
// import { Modal, Form, Button } from "react-bootstrap";
import "./game.css";
//import io from 'socket.io-client'

import socket, { answerPrompt , answersSuccessful, startTimer, updateTimer} from '../../utils/api'

export class AnswerPrompts extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      players: [],
      prompts: ['question a ', 'question b'],
      accumulator: 0,
      answer: [],
      finished: false,
      answerOne: '',
      answerTwo: '',
      round: this.props.round,
      roomCode: this.props.roomCode,
    };
    this.answersSent.bind(this);
    console.log(this.props.prompts)


    updateTimer(res=>{
     let times = res.countdown;
     console.log(times, 'yay');
     this.setState({time: times});
   });


  }

  fieldoneChange(e){
    this.setState({answerOne: e.target.value});
  }

  fieldtwoChange(e){
    this.setState({answerTwo: e.target.value});
  }

  answerPrompt(e){
    e.preventDefault();
    // this.setState({finished: true});
    //console.log(this.state.finished);
    answerPrompt(this.props.round, this.props.roomCode, this.state.answerOne, this.props.prompts[(this.props.round*2)-2]);
    answerPrompt(this.props.round, this.props.roomCode, this.state.answerTwo, this.props.prompts[(this.props.round*2)-1]);
  }

  showPrompt(number){
    return(
      <div>
        {this.props.prompts[(this.state.round*2)-2]}
        <form onSubmit={this.answerPrompt.bind(this)}>
        <input name="answer" type="text" onChange = {this.fieldoneChange.bind(this)}  />
        {this.props.prompts[this.state.round*2-1]}
        <input name="answer" type="text" onChange = {this.fieldtwoChange.bind(this)} />

       <button>Send data!</button>
     </form>
      </div>
    );
  }

  promptsFinished(){
    let prompts = this.props.prompts;
    if(this.prompts.accumulator < prompts.length){
      return true;
    }
    return false;
  }

  answersSent(){
    this.setState({finished: true});
  }

  componentDidMount(){
    startTimer();
    const roomCode=this.props.roomCode;
    const round=this.props.round;
    answersSuccessful(res => {
      const {start} = res
      if(start === "success"){
        this.answersSent(true);
        console.log("TRYING TO SEND TO NEXT PAGE")
        console.log("ROOMCODE: ", roomCode)
        console.log("ROUND: ", round)
        this.props.history.push({
          pathname: "/vote/private",
          state: {
            roomCode,
            round
          }
        })
      }
      else{
        console.log("SOMETHING WENT WRONG")
      }
    })
  }

  componentWillUnmount(){
    socket.off('submit-answer');
  }

  render(){
    return(
      <>
        <div className="create">
        {this.state.time}
        { this.state.finished ?  '': this.showPrompt(this.state.accumulator)}
        </div>
      </>
    )
  }
}

export default AnswerPrompts;
