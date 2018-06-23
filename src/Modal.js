import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

import './fonts.css';
import './Modal.css';

class Modal extends Component {
  handleClickOutside(){
    this.props.handler(null);
  }

  render() {
    return (
      <div className="modal-wrap">
        { this.props.page === 'about' &&
          <div className="modal-page" data-simplebar>
            <button className="modal-close" onClick={() => {this.props.handler(null)}}>
              <FontAwesomeIcon icon={faTimes} size="lg"/>
            </button>
              <div className="modal-content">
                <h1>About Page</h1>
                <p>A Fox fell into a well, and though it was not very deep, he found that he could not get out again. After he had been in the well a long time, a thirsty Goat came by. The Goat thought the Fox had gone down to drink, and so he asked if the water was good.</p><p>"The finest in the whole country," said the crafty Fox, "jump in and try it. There is more than enough for both of us."</p><p>The thirsty Goat immediately jumped in and began to drink. The Fox just as quickly jumped on the Goat's back and leaped from the tip of the Goat's horns out of the well</p><p>The foolish Goat now saw what a plight he had got into, and begged the Fox to help him out. But the Fox was already on his way to the woods</p><p>"If you had as much sense as you have beard, old fellow," he said as he ran, "you would have been more cautious about finding a way to get out again before you jumped in."</p><p>Look before you leap.</p>
              </div>
          </div>
        }
        { this.props.page === 'terms' &&
          <div className="modal-page" data-simplebar>
            <button className="modal-close" onClick={() => {this.props.handler(null)}}>
              <FontAwesomeIcon icon={faTimes} size="lg"/>
            </button>
              <div className="modal-content">
                <h1>Terms Page</h1>
                <p>A Fox fell into a well, and though it was not very deep, he found that he could not get out again. After he had been in the well a long time, a thirsty Goat came by. The Goat thought the Fox had gone down to drink, and so he asked if the water was good.</p><p>"The finest in the whole country," said the crafty Fox, "jump in and try it. There is more than enough for both of us."</p><p>The thirsty Goat immediately jumped in and began to drink. The Fox just as quickly jumped on the Goat's back and leaped from the tip of the Goat's horns out of the well</p><p>The foolish Goat now saw what a plight he had got into, and begged the Fox to help him out. But the Fox was already on his way to the woods</p><p>"If you had as much sense as you have beard, old fellow," he said as he ran, "you would have been more cautious about finding a way to get out again before you jumped in."</p><p>Look before you leap.</p>
              </div>
          </div>
        }
      </div>
    )
  }
}

export default onClickOutside(Modal);