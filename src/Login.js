import React, { Component } from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import faPaypal from '@fortawesome/fontawesome-free-brands/faPaypal'
import faLink from '@fortawesome/fontawesome-free-solid/faLink'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

import './Login.css';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      button: 'Log in to Spotify',
      url: 'https://login.mytopspotify.io/',
      text: 'Your most played tracks and artists on Spotify of the last four weeks, six months or all time!',
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
    let {button, text, text2, url} = this.state;
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
          url += 'switch';
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
              <li><a href="https://twitter.com/accudio" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /><span className="sr-text">Alistair Shepherd on Twitter</span></a></li>
              <li><a href="https://github.com/accudio" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /><span className="sr-text">Alistair Shepherd on Github</span></a></li>
              <li><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=alistair.shepherd@hotmail.co.uk&item_name=Supporting+open+source+projects+by+Alistair+Shepherd&currency_code=GBP" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faPaypal} /><span className="sr-text">Donate to Alistair Shepherd</span></a></li>
              <li><a href="https://alistairshepherd.co.uk" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLink} /><span className="sr-text">Alistair Shepherd's Website</span></a></li>
            </ul>
            <span>Built by Alistair Shepherd</span>
            <ul className="links">
              <li><a role="button" onClick={() => {this.modalUrl('about')}}>About</a></li>
              {/*<li><a role="button" onClick={() => {this.modalUrl('contact')}}>Contact</a></li>*/}
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