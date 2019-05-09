import React from 'react';
import './game.css';
import { Alert, ListGroup } from 'react-bootstrap';
// import socket, { endVote, startTimer } from '../../utils/api';
import { withRouter } from 'react-router-dom';

const sortScores = (scores) => {
  let scoreList = Object.keys(scores).map((key) => [key, scores[key]]);
  return scoreList.sort((a,b) => a[1] <= b[1] ? 1 : -1);
}

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 1,

      containsTie: false,
      maxCount: 0,
      winners: "",

    }
    this.determineWinners.bind(this);
  }

  determineWinners(scoreList){
    let winners = [scoreList[0][0]];
    let i = 1;
    while (i < scoreList.length && scoreList[i][1] === scoreList[i-1][1]) {
      winners.push(scoreList[i][0]);
      i++;
    }
    return winners;
  }

  render() {
    const scores = this.props.scores || {"larry": 10, "becca": 1000, "ham": 20, "richie": 1, "jody": 1000};
    const scoreList = sortScores(scores);
    const winners = this.determineWinners(scoreList);
    return (
      <div className="create">
        <Alert variant="success">{`The winner${winners.length > 1 ? 's' : ''} ${winners.length > 1 ? 'are' : 'is'}: ${winners.join(", ")} !`}</Alert>
        <ListGroup>
          {scoreList.map(([playerName, playerScore]) => <ListGroup.Item key={playerName}>{`${playerName}: ${playerScore}`}</ListGroup.Item>)}
        </ListGroup>
      </div>
    );
  }
}

export default Scoreboard;
