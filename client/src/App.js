import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {game: undefined};
  }
  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.onmessage = (event) => {
      console.log('Message', event);
      this.setState({game: JSON.parse(event.data)});
    }
  }
  render() {
    return (
      <div className="App">
        <p className="App-intro">
        {this.state.game && <Game game={this.state.game}/>}          
        </p>
      </div>
    );
  }
}

export default App;
