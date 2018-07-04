import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'

import './fonts.css';
import './MainMenu.css';

class MainMenu extends Component {
  constructor(){
    super();
    this.state = {
      menuActive: false
    }
  }

  handleClickOutside() {
    this.setState({menuActive: false})
  }

  modalUrl(url) {
    this.setState({menuActive: false});
    this.props.handler(url);
  }

  render() {
    return (
      <div className="menu">
        <button onClick={() => {this.setState({menuActive: !this.state.menuActive})}}>
          <div className="menu-image icon">
            <FontAwesomeIcon icon={faBars} />
          </div>
          <span className="menu-text">
            About
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </button>
        <div className={"main-menu"+(this.state.menuActive ? ' active':'')}>
          <ul>
            <li><a role="button" onClick={() => {this.modalUrl('about')}}>About My Top for Spotify</a></li>
            <li><a role="button" onClick={() => {this.modalUrl('contact')}}>Contact</a></li>
            <li><a role="button" onClick={() => {this.modalUrl('privacy')}}>Privacy Policy</a></li>
            <li><a role="button" onClick={() => {this.modalUrl('eula')}}>EULA</a></li>
            <li><a href="#">Donate</a></li>
            <li><a href="#">Made by Alistair Shepherd</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default onClickOutside(MainMenu);