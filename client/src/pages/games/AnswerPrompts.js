import React from "react";
// import { Modal, Form, Button } from "react-bootstrap";
import "./game.css";
// import io from 'socket.io-client'
import { answerPrompt } from '../../utils/api'

export class AnswerPrompts extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      players: [],
      prompts: ['question b ', 'question a'],
      accumulator: 0,
      answer: [],
      finished: false,
      answerOne: '',
      answerTwo: '',
      round: 1,
      roomcode: '',


    };
    console.log(this.props.prompts)
  }

  fieldoneChange(e){
    this.setState({answerOne: e.target.value});
  }

  fieldtwoChange(e){
    this.setState({answerTwo: e.target.value});
  }

  answerPrompt(e){
    e.preventDefault();
    this.setState({finished: true});
    console.log(this.state.finished);
    answerPrompt(this.props.round, this.roomcode, this.state.answer, this.state.prompt);
    console.log("yay");


  }

  showPrompt(number){
    return(
      <div>
        {this.props.prompts[(this.state.round*2)-1]}
        <form onSubmit={this.answerPrompt.bind(this)}>
        <input name="answer" type="text" onChange = {this.fieldoneChange.bind(this)}  />
        {this.props.prompts[this.state.round*2-2]}
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






  render(){

    return(

      <>
        <div className="create"> Hi:
        { this.state.finished ?  '': this.showPrompt(this.state.accumulator)}

        </div>

      </>
    )
  }
}

export default AnswerPrompts;
