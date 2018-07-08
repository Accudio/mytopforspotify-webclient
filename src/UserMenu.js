import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'

import './UserMenu.css';

class UserMenu extends Component {
  constructor(){
    super();
    this.state = {
      menuActive: false
    }
  }

  handleClickOutside(){
    this.setState({
      menuActive: false
    })
  }

  switchUser() {
    this.setState({menuActive: false});
    this.props.switchHandler();
  }

  logout() {
    this.setState({menuActive: false});
    this.props.logoutHandler();
  }

  render() {
    let user = this.props.user;

    return (
      <div className="user">
        <button onClick={() => {this.setState({menuActive: !this.state.menuActive})}}>
          <span className="user-text">
            {user.greeting}
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
          <div className={"user-image"+(user.image===null ? ' icon':'')}>
            { user.image != null && <img src={user.image} alt={user.name+' profile picture'}/> }
            { user.image === null && <FontAwesomeIcon icon={faUser} /> }
          </div>
        </button>
        <div className={"user-menu"+(this.state.menuActive ? ' active':'')}>
          <ul>
            <li><a href={user.url} target="_blank" rel="noopener noreferrer">View Profile</a></li>
            <li><a role="button" onClick={() => {this.switchUser()}}>Switch User</a></li>
            <li><a role="button" onClick={() => {this.logout()}}>Log Out</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default onClickOutside(UserMenu);