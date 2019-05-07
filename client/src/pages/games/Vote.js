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
      // quip1 and quip2 are the votes
      quip1: 0,
      quip2: 0,
      prompts: undefined,
    }
  }

  // send vote to backend
  castVote() {
    const { quip1, quip2 } = this.state;
    if (quip1 === 1) {
      sendVote(quip1);
    } else {
      sendVote(quip2);
    }
  }

  // if user votes for the first quip
  incrementQuip1() {
    this.setState({
      quip1: 1,
    });
    this.castVote()
  }

  // if user votes for the second quip
  incrementQuip2() {
    this.setState({
      quip2: 1,
    });
    this.castVote()
  }

  // load the page with the prompts, first quip, and second quip
  componentDidMount(){
    const { roomCode } = this.props
    getInfo(roomCode, (prompts) => {
      this.setState({
        prompts: prompts,
      });
    })

  }

  // cut off connection with end-round
  componentWillUnmount(){
    socket.off('end-round')
  }

  // call above methods when corresponding button is clicked
  render() {
    return(
  <>
    <div className="create">
    <Header/>
    <Jumbotron>
      <h1>Round {this.props.round}</h1>
      <p>{this.state.prompts[this.props.round]}</p>
    </Jumbotron>
    <Row>
      <Col>

        <Button variant="light" onClick={this.incrementQuip1()}> {this.state.firstQuip} </Button>
      </Col>
      <Col>
        <Button variant="dark" onClick={this.incrementQuip2()}> {this.state.secondQuip} </Button>
      </Col>
    </Row>
    </div>
  </>
    )
  }

}




export default withRouter(Vote);
