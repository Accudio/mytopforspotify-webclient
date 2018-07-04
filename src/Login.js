import React, { Component } from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import faLink from '@fortawesome/fontawesome-free-solid/faLink'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

import './fonts.css';
import './Login.css';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      button: 'Log in to Spotify',
      host: 'http://localhost:8888',
      text: 'Your most played tracks and artists on Spotify in four weeks,  six months, all time!',
      text2: 'Login below to get started'
    }
  }

  modalUrl(url) {
    this.props.handler(url);
  }

  switchClose() {
    this.props.switchClose();
  }

  render() {
    let {button, text, text2} = this.state;
    let url = this.state.host+'/login';
    if(this.props.error != null) {
      switch(this.props.error) {
        case 401:
          text = 'Your session has expired, please log in again.';
          text2 = '';
          break;
        case "switch":
          text = 'After authenticating with Spotify, the user logged into spotify.com on this device will be logged into My Top for Spotify.';
          text2 = 'To switch user, you can click the button below and click "Not You?" near the bottom of the page. This will allow you to log in as a different user.';
          button = 'Switch User';
          url = 'http://localhost:8888/switchuser';
          break;
        default:
          text = 'There seems to be an issue connecting to Spotify. Try logging in again using the button below.';
          text2 = 'If there are still problems, please get in touch and try again later.';
      }
    }

    return (
      <div className="login-window">
        <div className="login-wrap">
          { this.props.error === 'switch' &&
            <button className="close-button" onClick={() => {this.switchClose()}}><FontAwesomeIcon icon={faTimes} /></button>
          }
          <h1 className="title">
            My Top for Spotify
          </h1>
          <p>{text}</p>
          { text2 !== '' &&
            <p>{text2}</p>
          }
          <a href={url} className="login-button">{button}</a>
          <div className="login-footer">
            <ul className="icons">
              <li><a href="https://twitter.com/accudio" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a></li>
              <li><a href="https://github.com/accudio" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a></li>
              <li><a href="https://alistairshepherd.co.uk" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLink} /></a></li>
            </ul>
            <span>Built by Alistair Shepherd</span>
            <ul className="links">
              <li><a role="button" onClick={() => {this.modalUrl('about')}}>About</a></li>
              <li><a role="button" onClick={() => {this.modalUrl('contact')}}>Contact</a></li>
              <li><a role="button" onClick={() => {this.modalUrl('privacy')}}>Privacy Policy</a></li>
              <li><a role="button" onClick={() => {this.modalUrl('eula')}}>EULA</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;