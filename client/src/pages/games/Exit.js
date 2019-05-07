import React from "react";
import "./game.css";
import { Form, Row, Col } from "react-bootstrap";

class Exit extends React.Component{
  render(){
    return (
      <div className="exit">
        <Form>
          <h1>Continue Playing?</h1> <br/>
          <Row>
            <Col>
              <span class="close">&times;</span>
              <p> Play with the same people </p>
            </Col>
            <Col>
              <span class="close">&times;</span>
              <p> Exit </p>
            </Col>
          </Row>
        </Form>
  
      </div>
    )
  }
}

export default Exit;