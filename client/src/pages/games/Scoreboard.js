import React from 'react';
import './game.css';
import { Alert, ListGroup } from 'react-bootstrap';
import socket, { endVote } from '../../utils/api';
import Header from "../../components/header";
import { withRouter } from 'react-router-dom';

// add comparison function to sort in descending order
function Compare(a, b) {
   if (a[1] < b[1]) return 1;
   if (a[1] > b[1]) return -1;
   return 0;
}

// iterate through keys of the dictionary
function SortScores(dictionary) {
  for (var key in dictionary) {
    const value = dictionary[key];
    // allow array of arrays to be sorted by second index
    this.state.scoresArray.push([key, value]);
  }
}

// function to convert all other elements of the array into list format
function Listify(value) {
  this.setState({
    text: this.state.text + "<ListGroup.Item>" + value[0] + '\t' + value[1] + "</ListGroup.Item>",
  })
}

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 1,
      scoresArray: [],
      containsTie: false,
      maxCount: 0,
      winners: "",
      text: "",
    }
  }

  componentDidMount() {
    endVote(res => {
      const { start, scores } = res;
      if (start === "true") {
        // run the function to alter scoresArray
        SortScores(scores);
        // scoresArray should now be sorted based on scores
        this.setState({
          scoresArray: this.state.scoresArray.sort(Compare),
        });
        // gets the highest value (the second value of the first array in scoresArray)
        var maxVal = this.state.scoresArray[0][1];

        for (var arr in this.state.scoresArray) {
          if (arr[1] === maxVal) {
            // increment maxCount for all occurences of the max
            this.setState({
              maxCount: this.state.maxCount + 1,
            });
          }
        }

        // if maxCount occurs multiple times then there are more than one max values
        if (this.state.maxCount > 1) {
          this.setState({
            containsTie: true,
          });
        }

        if (this.state.containsTie) {
          // format differs based on the number of people tied at the top
          if (this.state.maxCount === 2) {
            this.setState({
              winners: this.state.winners + this.state.scoresArray[0][0] + " and " + this.state.scoresArray[1][0],
            });
          } else {
            var i;
            for (i = 0; i < this.state.maxCount - 1; i++) {
              this.setState({
                winners: this.state.winners + this.state.scoresArray[i][0] + ', ',
              });
            }
            // next line applies only for the final value to format the 'and'
            this.setState({
              winners: this.state.winners + 'and ' + this.state.scoresArray[this.state.maxCount - 1][0],
            });
          }

        }

        // begin text to be input into the JSX
        this.setState({
          text: "<ListGroup.Item> Name \t Score </ListGroup.Item>",
        });

        // call the aforementioned function
        this.state.scoresArray.forEach(Listify);
        // console.log(text)

      } else {
        this.setState({errorText: "Error. Please try again."});
      }
    })
  }

  //unmount components
  componentWillUnmount() {
    socket.off('end-vote');
  }

  render() {
    var sb;
    if (this.state.round === 1 || this.state.round === 2) {
      sb = () => {
        return (
          <>
            <Header>
              <ListGroup>
                {this.state.text}
              </ListGroup>
            </Header>
          </>
        );
      }
    } else {
      if (this.state.containsTie) {
        sb = () => {
          return (
            <>
              <Header>
                <ListGroup>
                  {this.state.text}
                </ListGroup>
                <Alert variant="primary">
                  Tie! The winners are {this.state.winners}
                </Alert>
              </Header>
            </>
          );
        }
      } else {
        sb = () => {
          return (
            <>
              <Header>
                <ListGroup>
                  {this.state.text}
                </ListGroup>
                <Alert variant="primary">
                  The winner is {this.state.scoresArray[0][0]}
                </Alert>
              </Header>
            </>
          );
        }
      }
    }
    return sb;
  }
}

export default withRouter(Scoreboard);
