import React from 'react';
import './App.css';
import Home from './pages/home/home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import JoinPublic from "./pages/join/JoinPublic";
import CreatePrivate from "./pages/create/CreatePrivate";
import Error from "./pages/error/Error";
import Vote from "./pages/games/Vote";
import Exit from "./pages/games/Exit";
import Scoreboard from "./pages/games/Scoreboard";
import WaitingPrivate from './pages/waiting/waitingPrivate';
import AnswerPrompts from './pages/games/AnswerPrompts';

const App = () => (
  <>
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path = "/create/private" component = {CreatePrivate}/>
          <Route path = "/waiting/private" render={({
            location : {state : {roomName, playerName, roomCode}}
          }) => <WaitingPrivate
                  roomCode={roomCode}
                  roomName={roomName}
                  playerName={playerName}
                />}
          />
          {/* <Route path = "/answer/private" component = {}/> */}
          <Route path = "/vote/private" component = {Vote}/>
          <Route path = "/AnswerPrompts" component = {AnswerPrompts}/>
          <Route path = "/scoreboard/private" component = {Scoreboard}/>
          <Route path = "/exit/private" component = {Exit}/>
          <Route path = "/join/public" component={JoinPublic}/>
          <Route component={Error}/>
        </Switch>
      </Router>
  </div>
</>
)

export default App;
