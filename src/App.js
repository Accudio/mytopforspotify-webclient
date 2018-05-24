import React, { Component } from 'react';
import './App.css';
import Util from './util';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

function Item(props) {
  const name = props.obj.name
  const album = props.obj.album.name;
  const artistTitle = props.obj.artists.length > 1 ? 'Artists': 'Artist';
  const artists = Util.artistsToString(props.obj.artists);
  const duration = Util.durationConvert(props.obj.duration_ms);
  const url = props.obj.external_urls.spotify;
  const albumArt = props.obj.album.images[0].url;
  return (
    <li>{name}
      <ul>
        <li>{artistTitle}: {artists}</li>
        <li>Album: {album}</li>
        <li>Duration: {duration}</li>
        <li><a href={url} target="_blank">Link</a></li>
        <li><img src={albumArt} alt={album + 'Album Art'} className="album-art" /></li>
      </ul>
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
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      numResults: 10,
      timeRange: 'medium_term',
      topTracks: null
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

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        if(response) {
          this.setState({
            nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
          });
        } else {
          console.log('Not playing')
        }
      }, (err) => {
          console.log('error');
      });
  }

  setNumResults(n) {
    this.setState({
      numResults: n
    });
  }

  setTimeRange(n) {
    this.setState({
      timeRange: n
    });
  }

  getTopTracks() {
    spotifyApi.getMyTopTracks({limit: this.state.numResults, time_range: this.state.timeRange})
      .then((response) => {
        this.setState({
          topTracks: response.items
        });
      }, (err) => {
        console.log('error');
      });
  }

  render() {
    const topTracks = this.state.topTracks;

    return (
      <div className='App'>
        <a href='http://localhost:8888/login'> Login to Spotify </a>

        { this.state.loggedIn &&
          <div>
            <div>
              <div>
                Now Playing: { this.state.nowPlaying.name }
              </div>
              <div>
                <img src={ this.state.nowPlaying.albumArt } style={{ height: 150 }} alt="" />
              </div>
              <button onClick={ () => this.getNowPlaying() }>
                Check Now Playing
              </button>
            </div>

            <div>
              
              <div>
                <button onClick={ () => this.setNumResults(10) }>10</button>
                <button onClick={ () => this.setNumResults(20) }>20</button>
                <button onClick={ () => this.setNumResults(50) }>50</button>
                { this.state.numResults }
              </div>

              <div>
                <button onClick={ () => this.setTimeRange('short_term') }>4 Weeks</button>
                <button onClick={ () => this.setTimeRange('medium_term') }>6 Months</button>
                <button onClick={ () => this.setTimeRange('long_term') }>All Time</button>
                { this.state.timeRange }
              </div>

              <button onClick={ () => this.getTopTracks() }>
                Check Top Tracks
              </button>

              <div>
                <ol>
                  { this.state.topTracks &&
                    topTracks.map((object, i) => {
                      return <Item obj={ object } key={ object.id } />
                    })
                  }
                </ol>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default App;
