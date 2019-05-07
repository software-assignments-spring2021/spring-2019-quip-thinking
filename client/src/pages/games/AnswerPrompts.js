import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./game.css";
import io from 'socket.io-client'
import { answerPrompt } from '../../utils/api'





export class AnswerPrompts extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      players: [],
      prompts: ['How aaegaergarg', 'Best Cheeseaergaerg'],
      accumulator: 0,
      answer: [],
      finished: false,
      answerOne: '',
      answerTwo: '',
      round: '',
      roomcode: '',


    };
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
        {this.state.prompts[number]}
        <form onSubmit={this.answerPrompt.bind(this)}>
        <input name="answer" type="text" onChange = {this.fieldoneChange.bind(this)}  />
        {this.state.prompts[number+1]}
        <input name="answer" type="text" onChange = {this.fieldtwoChange.bind(this)} />



       <button>Send data!</button>
     </form>
      </div>
    );
  }

  promptsFinished(){
    let prompts = this.state.prompts;
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
