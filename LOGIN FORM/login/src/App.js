import React, { Component } from 'react';
import './App.css';

function LoginContainer () {
  return (
    <div className="loginContainer">asd</div>
  )
  
}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render () {
    return (
      <div className="appBox">
        <LoginContainer />
      </div>
      
    )
  }
}

export default App;
