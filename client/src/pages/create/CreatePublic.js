import React from 'react';
import './create.css';
import { Nav, Form, Row, Col, Button } from 'react-bootstrap';
import Header from "../../components/header";
import socket, { getPlayers, subscribeToJoins } from '../../utils/api'
import { withRouter } from 'react-router-dom';

class CreatePublic extends React.Component {
  // initialize the state of the page
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    }

    this.receivedPlayers.bind(this);
    subscribeToJoins((err, players) => {
      if (!err) {
        this.receivedPlayers(players);
      }
    })
  }

  receivedPlayers(players) {
    this.setState({players});
  }

  componentDidMount() {
    const { roomCode } = this.props;
    getPlayers(roomCode, (players) => {
      this.receivedPlayers(players);
    })

    if (this.state.players.length < 8) {
      var i;
      for (i = 0; i < 8 - this.state.players.length; i++) {
        this.state.players.push("Still Waiting on Player");
      }
    }
  }


  componentWillUnmount() {
    socket.off('join-private-room');
  }

  // call above methods when corresponding button is clicked
  render() {
    return (
      <>
        <div className="createPublic">
          <Header>
            <div className="create">
              <Form>
                <h1> Still Waiting on Players... </h1>
                <br />
                <Row>
                  <Col>
                    <Form.Control placeholder={this.state.players[0]} />
                  </Col>
                  <Col>
                    <Form.Control placeholder={this.state.players[4]} />
                  </Col>
                </Row>

                <br />
                <Row>
                  <Col>
                    <Form.Control placeholder={this.state.players[1]} />
                  </Col>
                  <Col>
                    <Form.Control placeholder={this.state.players[5]} />
                  </Col>
                </Row>

                <br />
                <Row>
                  <Col>
                    <Form.Control placeholder={this.state.players[2]} />
                  </Col>
                  <Col>
                    <Form.Control placeholder={this.state.players[6]} />
                  </Col>
                </Row>

                <br />
                <Row>
                  <Col>
                    <Form.Control placeholder={this.state.players[3]} />
                  </Col>
                  <Col>
                    <Form.Control placeholder={this.state.players[7]} />
                  </Col>
                </Row>

                <br/>
                <Nav.Link href="#"><Button variant="primary" type="submit"> Start the Game! </Button></Nav.Link>
              </Form>
            </div>
          </Header>
        </div>
      </>
    );
  }

}




export default withRouter(CreatePublic);
