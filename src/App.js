import React, { Component } from 'react';
import Select from 'react-select';
import SpotifyWebApi from 'spotify-web-api-js';
import 'simplebar';

import 'react-select/dist/react-select.css';
import 'simplebar/dist/simplebar.css';

import './fonts.css';
import Util from './util';
import Background from './Background';
import Login from './Login';
import Modal from './Modal';
import MainMenu from './MainMenu';
import UserMenu from './UserMenu';
import './App.css';

import AlbumPlaceholder from './img/albumPlaceholder.png'
import ArtistPlaceholder from './img/artistPlaceholder.png'

const spotifyApi = new SpotifyWebApi();

function TrackItem(props) {
  const name = props.obj.name
  const album = props.obj.album.name;
  const artists = Util.artistsToString(props.obj.artists);
  const genres = Util.genresToString(props.obj.genres);
  const url = props.obj.external_urls.spotify;
  let albumArt = null;
  let imageH = null;
  let imageStyle = null;
  const imageW = 10;
  if(typeof props.obj.album.images[0] !== 'undefined') {
    albumArt = props.obj.album.images[0].url;
    imageH = (imageW/props.obj.album.images[0].width)*props.obj.album.images[0].height;
    imageStyle = {width: imageW+'rem', height: imageH+'rem'};
  } else {
    albumArt = AlbumPlaceholder;
    imageStyle = {width: imageW+'rem', height: imageW+'rem', opacity: 0.6};
  }
  return (
    <li>
      <div className="list-item">
        <div className="list-text">
          <div className="name">
            <span>{name}</span>
          </div>
          <div className="artist-album">
            {artists} &bull; {album}
          </div>
          <div className={"genres" + (genres[1] ? '' : ' none')}>
            {genres[0]}
          </div>
          <div className="link">
            <a href={url} target="_blank">Open in Spotify</a>
          </div>
        </div>
        <img src={albumArt} alt={album + 'Album Art'} className="image" style={imageStyle} />
      </div>
    </li>
  );
}
function ArtistItem(props) {
  const name = props.obj.name;
  const genres = Util.genresToString(props.obj.genres);
  const url = props.obj.external_urls.spotify;
  let image = null;
  let imageH = null;
  let imageStyle = null;
  const imageW = 10;
  if(typeof props.obj.images[0] !== 'undefined') {
    image = props.obj.images[0].url;
    imageH = (imageW/props.obj.images[0].width)*props.obj.images[0].height;
    imageStyle = {width: imageW+'rem', height: imageH+'rem'};
  } else {
    image = ArtistPlaceholder;
    imageStyle = {width: imageW+'rem', height: imageW+'rem', opacity: 0.6};
  }
  return (
    <li>
      <div className="list-item">
        <div className="list-text">
          <div className="name">
            <span>{name}</span>
          </div>
          <div className={"genres" + (genres[1] ? '' : ' none')}>
            {genres[0]}
          </div>
          <div className="link">
            <a href={url} target="_blank">Open in Spotify</a>
          </div>
        </div>
        <img src={image} alt={name + 'Image'} className="image" style={imageStyle} />
      </div>
    </li>
  );
}

/*=========================*/

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
      console.log('Access Token: '+token)
    }
    this.state = {
      loggedIn: token ? true : false,
      error: null,
      user: {username: null, image: null, url: null},
      userMenuActive: false,
      numResults: {value: 10, label: 'Top 10'},
      timeRange: {value: 'medium_term', label: 'in the past 6 Months'},
      topTracks: {numResults: null, timeRange: null, data: null},
      topArtists: {numResults: null, timeRange: null, data: null},
      isArtists: false,
      modal: null,
      background: {
        element: '#background',
        opacity: [1,1],
        states: {
          "default-state": {
            gradients: [
              ["#EB3349", "#F45C43"],
              ["#FF8008", "#FFC837"],
              ["#4CB8C4", "#3CD3AD"],
              ["#24C6DC", "#514A9D"],
              ["#FF512F", "#DD2476"],
              ["#DA22FF", "#9733EE"]
            ],
            transitionSpeed: 3500
          }
        }
      }
    }
  }

  componentDidMount() {
    if(this.state.loggedIn) {
      this.getUser();
      this.getTop(this.state.numResults.value, this.state.timeRange.value, this.state.isArtists);
      this.getTop(this.state.numResults.value, this.state.timeRange.value, !this.state.isArtists);
    } else {
      console.log('not logged in yet');
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getUser() {
    spotifyApi.getMe()
      .then((response) => {
        console.log(response);
        let username, image;
        if(response.display_name != null) {
          username = response.display_name;
        } else {
          username = response.id;
        }
        if(response.images.length === 0) {
          image = null;
        } else {
          image = response.images[0].url;
        }
        this.setState({user: {username: username, image: image, url: response.external_urls.spotify}})
      }, (err) => {
        this.handleError(err);
      });
  }

  nowIsArtist(a) {
    this.setState({isArtists: a})
    this.getTop(this.state.numResults.value, this.state.timeRange.value, a);
  }

  setNumResults = (numResults) => {
    this.setState({numResults});
    if ((
        numResults
        && typeof numResults.value !== 'undefined'
        && this.state.timeRange
        && typeof this.state.timeRange.value !== 'undefined'
      )) {
      this.getTop(numResults.value, this.state.timeRange.value, this.state.isArtists);
      this.getTop(numResults.value, this.state.timeRange.value, !this.state.isArtists);
    }
  }

  setTimeRange = (timeRange) => {
    this.setState({timeRange});
    if ((
        this.state.numResults
        && typeof this.state.numResults.value !== 'undefined'
        && timeRange
        && typeof timeRange.value !== 'undefined'
      )) {
      this.getTop(this.state.numResults.value, timeRange.value, this.state.isArtists);
      this.getTop(this.state.numResults.value, timeRange.value, !this.state.isArtists);
    }
  }

  isNew(numResults, timeRange, type) {
    if(type) {
      if(numResults === this.state.topArtists.numResults && timeRange === this.state.topArtists.timeRange) {
        console.log('Query for '+numResults+' '+timeRange+' artists matches existing.');
        return false;
      } else {
        console.log('Making request for '+numResults+' '+timeRange+' artists.');
        return true;
      }
    } else {
      if(numResults === this.state.topTracks.numResults && timeRange === this.state.topTracks.timeRange) {
        console.log('Query for '+numResults+' '+timeRange+' tracks matches existing.');
        return false;
      } else {
        console.log('Making request for '+numResults+' '+timeRange+' tracks.');
        return true;
      }
    }
  }

  getTop(numResults, timeRange, type) {
    if(type) {
      if(this.isNew(numResults, timeRange, type)) {
        spotifyApi.getMyTopArtists({limit: numResults, time_range: timeRange})
          .then((response) => {
            if (response.items.length !== 0) {
              let topArtists = response.items;
              this.setState({topArtists: {numResults: numResults, timeRange: timeRange, data: topArtists}})
            } else {
              console.log('request failed')
            }
          }, (err) => {
            this.handleError(err);
          });
      }
    } else {
      if(this.isNew(numResults, timeRange, type)) {
        spotifyApi.getMyTopTracks({limit: numResults, time_range: timeRange})
          .then((response) => {
            if (response.items.length !== 0) {
              let topTracks = response.items;
              let artists = [];
              for(var i = 0; i < response.items.length; i++ ) {
                artists.push(response.items[i].artists[0].id)
              };
              spotifyApi.getArtists(artists)
                .then((response) => {
                  for(var j = 0; j < response.artists.length; j++ ) {
                    topTracks[j].genres = response.artists[j].genres
                  }
                  this.setState({topTracks: {numResults: numResults, timeRange: timeRange, data: topTracks}});
                });
            } else {
              console.log('request failed')
            }
          }, (err) => {
            this.handleError(err);
          });
      }
    }
  }

  handleError(err) {
    switch(err.status) {
      case 401:
        console.log('Log in Expired');
        this.setState({loggedIn: false, error: 401})
        break;
      default:
        console.log('Error '+err.status);
    }
  }

  loadMore = () => {
    let newResult = 10;
    switch(this.state.numResults.value) {
      case 10:
        newResult = 20;
        break;
      case 20:
        newResult = 30;
        break;
      case 30:
        newResult = 40;
        break;
      case 40:
        newResult = 50;
        break;
      default:
    }
    let newResultLabel = 'Top '+newResult+' tracks/artists';
    this.setState({numResults: {value: newResult, label: newResultLabel}})
    this.getTop(newResult, this.state.timeRange.value, this.state.isArtists);
  }

  switchUser = () => {
    this.setState({loggedIn: false, error: 'switch'})
  }

  setModal = (url) => {
    this.setState({modal: url});
  }

  switchClose = () => {
    this.setState({loggedIn: true})
  }

  render() {
    let user = {greeting: null, image: null}
    const { numResults, timeRange, topTracks, topArtists } = this.state;
    const { username, image, url } = this.state.user;
    user.image = image;
    user.url = url;
    if( username === null ) {
      user.greeting = 'Not logged in';
    }  else {
      user.greeting = 'Hi, '+username+'!';
    }

    return (
      <div className='app'>
        <div className='main-content'>
          <Background id="background" config={ this.state.background }></Background>
          <div className="navigation">
            <MainMenu handler={this.setModal} />
            <div className="site-title">My Top for Spotify</div>
            <UserMenu user={user} handler={this.switchUser}/>
          </div>
          <div className="tabs">
            <button className={"tab" + (this.state.isArtists ? '' : ' active')} onClick={() => {this.nowIsArtist(false)}}>
              Top Tracks
            </button>
            <button className={"tab" + (this.state.isArtists ? ' active' : '')} onClick={() => {this.nowIsArtist(true)}}>
              Top Artists
            </button>
          </div>
          <div className="page-wrap">

            <div className="config-options">
                <Select
                  name="num-results"
                  aria-label="Number of Results"
                  value={numResults}
                  onChange={this.setNumResults}
                  options={[
                    {value: 10, label: 'Top 10'},
                    {value: 20, label: 'Top 20'},
                    {value: 50, label: 'Top 50'},
                  ]}
                  autoBlur
                  clearable={false}
                  searchable={false}
                />
                <Select
                  name="time-range"
                  aria-label="Time Range"
                  value={timeRange}
                  onChange={this.setTimeRange}
                  options={[
                    {value: 'short_term', label: 'in the past 4 Weeks'},
                    {value: 'medium_term', label: 'in the past 6 Months'},
                    {value: 'long_term', label: 'of all time'},
                  ]}
                  autoBlur
                  clearable={false}
                  searchable={false}
                />
            </div>

            <div className="page" data-simplebar>
              <div className={"page-content"+(this.state.loggedIn ? '':' hidden')}>
                <div className="result-list">
                  { this.state.isArtists && 
                    <ol className="results">
                      { this.state.topArtists.data &&
                        topArtists.data.map((object, i) => {
                          return <ArtistItem obj={ object } key={ object.id } />
                        })
                      }
                    </ol>
                  }
                  { !this.state.isArtists &&
                    <ol className="results">
                      { this.state.topTracks.data &&
                        topTracks.data.map((object, i) => {
                          return <TrackItem obj={ object } key={ object.id } />
                        })
                      }
                    </ol>
                  }
                </div>
                { numResults.value < 50 &&
                  <button className="view-more" onClick={this.loadMore}>
                    View More
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
        <div className={"login"+(this.state.loggedIn ? '':' active')}>
          <Login error={ this.state.error } handler={this.setModal} switchClose={this.switchClose} />
        </div>
        <div className={"modal"+(this.state.modal != null ? ' active':'')}>
          <Modal page={this.state.modal} handler={this.setModal}/>
        </div>
      </div>
    )
  }
}

export default App;
