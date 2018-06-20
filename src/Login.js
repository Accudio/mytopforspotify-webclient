import React, { Component } from 'react';

import './fonts.css';
import './Login.css';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      button: 'Log in to Spotify',
      host: 'http://localhost:8888',
      text: 'Text on first login'
    }
  }

  render() {
    let {button, text} = this.state;
    let url = this.state.host+'/login';
    if(this.props.error != null) {
      switch(this.props.error) {
        case 401:
          text = 'Your session has expired, please log in again.';
          break;
        case "switch":
          text = 'Text for switching user';
          button = 'Switch User';
          url = 'http://localhost:8888/switchuser';
          break;
        default:
          text = 'Generic error text';
      }
    }

    return (
      <div className="login-window">
        <div className="login-wrap">
          <h1 className="title">
            My Top for Spotify
          </h1>
          <p>{text}</p>
          <a href={url} className="login-button">{button}</a>
        </div>
      </div>
    )
  }
}

export default Login;