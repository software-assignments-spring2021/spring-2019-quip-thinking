import React from "react";
import "./game.css";
import {withRouter} from 'react-router-dom'
import socket, { answerPrompt , startTimer, updateTimer, startVote, gotoVote} from '../../utils/api'

class AnswerPrompts extends React.Component{
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
      answerTwo: ''
    };
    this.answersSent.bind(this);
    console.log(this.props.prompts)


    updateTimer(res=>{

     let times = res.countdown;
     this.setState({time: times});
     if(times === 1){
       startVote(this.props.round, this.props.roomCode);
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
    answerPrompt(this.props.round, this.props.roomCode, this.state.answerOne, this.props.prompts[(this.props.round*2)-2]);
    answerPrompt(this.props.round, this.props.roomCode, this.state.answerTwo, this.props.prompts[(this.props.round*2)-1]);
    this.setState({finished: true});
  }

  showPrompt(number){
    return(
      <div>
        {this.props.prompts[(this.props.round*2)-2]}
        <form onSubmit={this.answerPrompt.bind(this)}>
        <input name="answer" type="text" onChange = {this.fieldoneChange.bind(this)}  />
        {this.props.prompts[this.props.round*2-1]}
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
    const { roomCode } = this.props

    gotoVote(res => {
      const {round, prompts} = res

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
          <h2>Time: {this.state.time}</h2>
          {this.state.finished ?  <p>Waiting for other players</p>: this.showPrompt(this.state.accumulator)}
        </div>
      </>
    )
  }
}

export default withRouter(AnswerPrompts);
