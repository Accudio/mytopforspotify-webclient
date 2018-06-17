import React, { Component } from 'react';

//import FontAwesomeIcon from '@fortawesome/react-fontawesome'
//import faUser from '@fortawesome/fontawesome-free-solid/faUser'

import './fonts.css';
import './Login.css';

class Login extends Component {
  render() {
    let loginText;
    if(this.props.error === null) {
      loginText = 'Text on first login';
    } else {
      switch(this.props.error) {
        case 401:
          loginText = 'Your session has expired, please log in again.';
          break;
        default:
          loginText = 'Generic error text';
      }
    }

    return (
      <div className="login-window">
        <div className="login-wrap">
          {/*<div className="login-user">
            <div className="user-icon">
              <FontAwesomeIcon icon={faUser} size="4x" />
            </div>
          </div>*/}
          <h1 className="title">
            My Top Spotify
          </h1>
          <p>{loginText}</p>
          <a href="http://localhost:8888/login" className="login-button">Log in to Spotify</a>
        </div>
      </div>
    )
  }
}

export default Login;