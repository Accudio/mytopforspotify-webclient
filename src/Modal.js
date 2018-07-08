import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

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
                <h2>Credits</h2>
                <p>My Top for Spotify uses the following technologies to make life and development so much easier. Check them out:</p>
                <ul>
                  <li><a href="https://developer.spotify.com/documentation/web-api/">Spotify Web API</a></li>
                  <li><a href="https://github.com/JMPerez/spotify-web-api-js">Spotify Web Api Js</a></li>
                  <li><a href="https://reactjs.org/">React.js</a></li>
                  <li><a href="https://fontawesome.com/">Font Awesome</a></li>
                  <li><a href="https://sarcadass.github.io/granim.js/">Granim.js</a></li>
                  <li><a href="https://github.com/Pomax/react-onclickoutside">react-onclickoutside</a></li>
                  <li><a href="https://github.com/Grsmto/simplebar">SimpleBar</a></li>
                </ul>
                <h2>Server</h2>
                <p>Information on the My Top for Spotify authentication server is available at the projects <a href="https://github.com/accudio/my-top-spotify-server">Github</a>. It is powered by <a href="https://nodejs.org/en/">Node.js</a> and <a href="https://expressjs.com/">Express</a> and hosted using <a href="https://serverless.com/">Serverless</a> on <a href="https://aws.amazon.com/lambda/">AWS Lambda</a>.</p>
              </div>
          </div>
        }
        { this.props.page === 'privacy' &&
          <div className="modal-page" data-simplebar>
            <button className="modal-close" onClick={() => {this.props.handler(null)}}>
              <FontAwesomeIcon icon={faTimes} size="lg"/>
            </button>
              <div className="modal-content">
                <h1>My Top for Spotify Privacy Policy</h1>
                <p>This Privacy Policy explains what information <a href="https://mytopspotify.io">My Top for Spotify</a> (hereafter known as MTfS) collects about its users, and what we do with that information. This policy applies only to analytics obtained through your use of mytopspotify.io.</p>
                <h3>Data displayed from Spotify</h3>
                <p>mytopspotify.io is a web application designed simply to easily access and display the information supplied from the Spotify Web API. By using this service, you are also bound by <a href="https://www.spotify.com/uk/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Spotify's Privacy Policy</a>. When you log in, we receive the basic information about your account we require to facilitate the app functionality. This information is temporarily stored to allow you to reauthenticate more easily after a session expiry, and will be deleted within 12 hours of you leaving the app. Further requests to this API are made by your web browser and therefore do not pass through the servers hosting mytopspotify.io, meaning we have no access to your music data.</p>
                <h3>Website Visitors</h3>
                <p>Like most website operators, MTfS collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. Our purpose in collecting non-personally identifying information is to better understand how mytopspotify.io's visitors use our website.</p>
                <p>MTfS also collects potentially personally-identifying information like Internet Protocol (IP) addresses. We do not use such information to identify our visitors, however, and this information is anonymised before being presented to administrators, and will never be disclosed to persons outside of those working on MTfS.</p>
                <h3>Opt-out of tracking</h3>
                <p>We would really appreciate if users let us collect information about their visit to mytopspotify.io as it allows us to improve our website and services based upon user interaction. If you do not wish to be tracked however, we respects your browsers 'Do Not Track' setting or you can opt out of tracking below. This stores an anonymised non-expiring cookie in your browser that we use to identify devices that should not be tracked.</p>
                <hr />
                <iframe style={{border: 0, width: '100%'}} src="https://analytics.accudio.com/index.php?module=CoreAdminHome&action=optOut&idsite=9&language=en" title="Analytics opt-out"></iframe>
                <hr />
                <h3>Gathering of Personally-Identifying Information</h3>
                <p>Certain aspects of mytopspotify.io have facilities to collect personal information for a specific purpose. For example, in our contact form. This information is only stored for the purpose of responding to contact form submissions, and will never be disclosed to any persons outside of MTfS. Visitors are also of course able to refuse to supply this information by not using our contact form and getting in touch with us through other means.</p>
                <h3>Protection of Information</h3>
                <p>Information collected from visitors to mytopspotify.io is collected, processed and stored by our website administrator, Accudio. This information will not be sent elsewhere and will only be accessible to those working on MTfS.</p>
                <h3>Aggregated Statistics</h3>
                <p>MTfS may collect statistics about the behaviour of visitors to our website. For instance, we may reveal how many visits a particularly page got, a breakdown of the type of device used to access mytopspotify.io, or anonymised geographical information in the form of country or region, for example, United Kingdom, Highland.</p>
                <h3>Cookies</h3>
                <p>A cookie is a string of information that a website stores on a visitor’s computer, and that the visitor’s browser provides to the website each time the visitor returns. mytopspotify.io avoids using cookies itself, except in regards to the tracking opt-out above. This cookie does not store any identifying information about visitors, and simply informs us if a visitors does not wish to be tracked. If you would like to opt-out of tracking without accepting this cookie however, you can use the 'Do Not Track' feature of your browser.</p>
                <p>In line with <a href="https://www.spotify.com/uk/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Spotify's Privacy Policy</a>, we do allow third parties to place Cookies on visitor browsers in order to collect information about browsing activities. These are managed by Spotify and are outwith the control of MTfS.</p>
                <h3>Contact</h3>
                <p>If you would like to get in touch with us about our privacy policy, analytics or otherwise, please see below.</p>
                <p>Email: <a href="mailto:info@mytopspotify.io">info@mytopspotify.io</a></p>
              </div>
          </div>
        }
        { this.props.page === 'eula' &&
          <div className="modal-page" data-simplebar>
            <button className="modal-close" onClick={() => {this.props.handler(null)}}>
              <FontAwesomeIcon icon={faTimes} size="lg"/>
            </button>
              <div className="modal-content">
                <h1>End User License Agreement</h1>
                <p>As an application based on the Spotify Web API, users of mytopspotify.io are bound by the Spotify EULA while logged in. In addition, you agree to the following terms and will not:</p>
                <ol>
                  <li>make any warranties or representations on behalf of Spotify and expressly disclaim all implied warranties with respect to the Spotify Platform, Spotify Service and Spotify Content, including the implied warranties of merchantability, fitness for a particular purpose and non-infringement;</li>
                  <li>modify or create derivative works based on the Spotify Platform, Spotify Service or Spotify Content;</li>
                  <li>decompile, reverse-engineer, disassemble, or otherwise reduce the Spotify Platform, Spotify Service, or Spotify Content to source code or other human-perceivable form, to the full extent allowed by law;</li>
                </ol>
                <p>My Top for Spotify is responsible entirely for mytopspotify.io and disclaims any and all liability on the part of Spotify and other third parties.</p>
                <p>Spotify is a third party beneficiary of this end user license agreement and mytopspotify.io's privacy policy, and is entitled to directly enforce this end user license agreement.</p>
              </div>
          </div>
        }
        { this.props.page === 'contact' &&
          <div className="modal-page" data-simplebar>
            <button className="modal-close" onClick={() => {this.props.handler(null)}}>
              <FontAwesomeIcon icon={faTimes} size="lg"/>
            </button>
              <div className="modal-content">
                <h1>Contact Form</h1>
                <p>A Fox fell into a well, and though it was not very deep, he found that he could not get out again. After he had been in the well a long time, a thirsty Goat came by. The Goat thought the Fox had gone down to drink, and so he asked if the water was good.</p><p>"The finest in the whole country," said the crafty Fox, "jump in and try it. There is more than enough for both of us."</p><p>The thirsty Goat immediately jumped in and began to drink. The Fox just as quickly jumped on the Goat's back and leaped from the tip of the Goat's horns out of the well</p><p>The foolish Goat now saw what a plight he had got into, and begged the Fox to help him out. But the Fox was already on his way to the woods</p><p>"If you had as much sense as you have beard, old fellow," he said as he ran, "you would have been more cautious about finding a way to get out again before you jumped in."</p><p>Look before you leap.</p>
              </div>
          </div>
        }
      </div>
    )
  }
}

export default onClickOutside(Modal);