import React from "react";
// import { Modal, Form, Button } from "react-bootstrap";
import "./game.css";
//import io from 'socket.io-client'
import {withRouter} from 'react-router-dom'
import socket, { answerPrompt , answersSuccessful, startTimer, updateTimer, startVote, gotoVote} from '../../utils/api'

export class AnswerPrompts extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      players: [],
      prompts: ['question a ', 'question b'],
      accumulator: 0,
      answer: [],
      time: 400,
      finished: false,
      answerOne: '',
      answerTwo: '',

      round: 0,
      roomCode: 0,

    };
    this.answersSent.bind(this);
    console.log(this.props.prompts)


    updateTimer(res=>{

     let times = res.countdown;
     console.log(times, 'yay');
     this.setState({time: times});
     if(times === 1){
       console.log("timer hit 0");
       console.log(this.roomCode);
       startVote(this.state.round, this.state.roomCode);
     }


      if(this.state.time === 1){
        this.setState({timeOut:true})
      } 
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
    this.setState({finished: true});
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

    this.setState({
      round: this.props.round,
      roomCode:this.props.roomCode,
    })
    gotoVote(res => {
      const {round, prompts} = res
      // const {start} = res
      const roomCode=this.state.roomCode;

      console.log("TRYING TO SEND TO NEXT PAGE")
      console.log("ROOMCODE: ", roomCode)
      console.log("ROUND: ", round)
      this.props.history.push({
        pathname: "/vote/private",
        state: {
          roomCode,
          round,
          prompts,
        }
      })



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
        { this.state.finished ?  'Waiting for other players': this.showPrompt(this.state.accumulator)}
        </div>
      </>
    )
  }
}

export default withRouter(AnswerPrompts);
