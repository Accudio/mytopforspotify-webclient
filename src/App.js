import React, { Component } from 'react';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Util from './util';
import Background from './Background';
import './App.css';

const spotifyApi = new SpotifyWebApi();

function TrackItem(props) {
  const name = props.obj.name
  const album = props.obj.album.name;
  const artistTitle = props.obj.artists.length > 1 ? 'Artists': 'Artist';
  const artists = Util.artistsToString(props.obj.artists);
  const genres = Util.genresToString(props.obj.genres);
  const url = props.obj.external_urls.spotify;
  const albumArt = props.obj.album.images[0].url;
  return (
    <li>{name}
      <ul>
        <li>{artistTitle}: {artists}</li>
        <li>Album: {album}</li>
        <li>Genres: {genres}</li>
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
      numResults: 10,
      timeRange: 'medium_term',
      topTracks: null,
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
            this.setState({topTracks: topTracks});
          });
      }, (err) => {
        console.log('error');
      });
  }

  render() {
    const topTracks = this.state.topTracks;

    return (
      <div className='app'>

        <Background id="background" config={ this.state.background }></Background>
        <div className="navigation">
        </div>
        <div className="page-wrap">
          <div className="page" data-simplebar>
            <div className="page-content">
              <a href='http://localhost:8888/login'> Login to Spotify </a>

              { this.state.loggedIn &&
                <div>

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
                            return <TrackItem obj={ object } key={ object.id } />
                          })
                        }
                      </ol>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
