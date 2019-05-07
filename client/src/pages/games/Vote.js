import React from "react";
import "./game.css";
import { Row, Col, Button, Jumbotron } from "react-bootstrap";
import Header from "../../components/header";
import socket, { sendVote, getInfo } from '../../utils/api'
import { withRouter } from 'react-router-dom';

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quip1: 0,
      quip2: 0,
      prompt: "",
      firstQuip: "",
      secondQuip: "",
    }
  }

  castVote() {
    const { quip1, quip2 } = this.state;
    if (quip1 === 1) {
      sendVote(quip1);
    } else {
      sendVote(quip2);
    }
  }

  incrementQuip1() {
    this.setState({
      quip1: 1,
    });
    this.castVote()
  }

  incrementQuip2() {
    this.setState({
      quip2: 1,
    });
    this.castVote()
  }

  componentDidMount(){
    const { roomCode } = this.props
    getInfo(roomCode, (prompt, firstQuip, secondQuip) => {
      this.setState({
        prompt: prompt,
        firstQuip: firstQuip,
        secondQuip: secondQuip,
      });
    })

  }

  componentWillUnmount(){
    socket.off('end-round')
  }

  render() {
    return(
  <>
    <div className="create">
    <Header/>
    <Jumbotron>
      <h1>Round #</h1>
      <p>{this.state.prompt}</p>
    </Jumbotron>
    <Row>
      <Col>
        {/* we need to figure out how to hold button animation until all
          user votes go through or time runs out */}
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
