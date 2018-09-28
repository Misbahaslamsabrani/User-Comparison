import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Submitbutton from "./components/button"
import { getData } from './config/getData'

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name1: "",
      name2: "",
      user1total: 0,
      user2total: 0,
      winnerName: "",
      winner: false,
      display: false,
      error1: false,
      error2 : false

    }
  }
  whenChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })

  }
  submitUserNames = (event) => {
    event.preventDefault();
    if(this.state.name1 === '' || this.state.name2 === ''){
      return
    }
    getData(this.state.name1)
      .then((userdata1) => {
        let a = userdata1.followers + userdata1.following + userdata1.public_repos;
        this.setState({user1total : a})
        getData(this.state.name2)
          .then((userdata2) => {
        let a = userdata2.followers + userdata2.following + userdata2.public_repos;
        this.setState({user2total : a, display: true})
        this.winnerName(); 
          })
          .catch((error) => {
            this.setState({error2 : true})
          })
      })
      .catch((error) => {
        this.setState({error1 : true})
      })
      
}
winnerName = () => {
  if(this.state.user1total > this.state.user2total){
    this.setState({winnerName : this.state.name1, winner: true})
  }
  else if (this.state.user2total > this.state.user1total){
    this.setState({winnerName : this.state.name2, winner: true})
  }

}
reMatch = () =>{
  this.setState({display: false, name1: '', name2: '', error1 : false, error2: false})

}
  render() {
    if(this.state.display){
      return <div id="display">
      <table>
      <thead>
      <tr>
      <th>User1</th>
      <th>User2</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{this.state.name1}</td>
        <td>{this.state.name2}</td>
      </tr>
      <tr>
        <td>{this.state.user1total}</td>
        <td>{this.state.user2total}</td>
      </tr>
      </tbody>
    </table>
    { this.state.winner ? <div className="con">Congratulations, "{this.state.winnerName}" won!</div> : <div className='con'>Draw!</div>
    }
    <div id="playAgain"><button className="btn btn-black" onClick={this.reMatch}>Rematch</button></div>
    </div>
    }
    return (
      <div className="App">
        <div id="heading">Enter two user names and see who wins!</div>
        <form onSubmit={this.submitUserNames} id="form">
          <TextField
            id="standard-name"
            label="Name1"
            value={this.state.name1}
            onChange={this.whenChange}
            margin="normal"
            name="name1"
          />
          {this.state.error1 ? <span className="errormess">User not found</span> : null }
          <span id="space">vs</span>
          <TextField
            id="standard-name"
            label="Name2"
            value={this.state.name2}
            onChange={this.whenChange}
            margin="normal"
            name="name2"
          />
          {this.state.error2 ? <span className="errormess"> User not found</span> : null
          }
          <div id='submitbu'>
            <Submitbutton text="Play" cn="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
