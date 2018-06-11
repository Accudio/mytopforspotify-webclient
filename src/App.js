import React, { Component } from 'react';
import Select from 'react-select';
import SpotifyWebApi from 'spotify-web-api-js';
import 'simplebar';
import 'react-select/dist/react-select.css';
import 'simplebar/dist/simplebar.css';

import './fonts.css';
import Util from './util';
import Background from './Background';
import './App.css';

const spotifyApi = new SpotifyWebApi();

function TrackItem(props) {
  const name = props.obj.name
  const album = props.obj.album.name;
  const artists = Util.artistsToString(props.obj.artists);
  const genres = Util.genresToString(props.obj.genres);
  const url = props.obj.external_urls.spotify;
  const albumArt = props.obj.album.images[0].url;
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
          <div className="genres">
            {genres}
          </div>
          <div className="link">
            <a href={url} target="_blank">Open in Spotify</a>
          </div>
        </div>
        <img src={albumArt} alt={album + 'Album Art'} className="album-art" />
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
    }
    this.state = {
      loggedIn: token ? true : false,
      numResults: {value: 10, label: 'Top 10 tracks'},
      timeRange: {value: 'medium_term', label: 'in the past 6 Months'},
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

  componentDidMount() {
    this.getTopTracks(this.state.numResults.value, this.state.timeRange.value);
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

  setNumResults = (numResults) => {
    this.setState({numResults});
    if ((
        numResults
        && typeof numResults.value !== 'undefined'
        && this.state.timeRange
        && typeof this.state.timeRange.value !== 'undefined'
      )) {
      this.getTopTracks(numResults.value, this.state.timeRange.value);
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
      this.getTopTracks(this.state.numResults.value, timeRange.value);
    }
  }

  getTopTracks(numResults, timeRange) {
    console.log('Making request for '+numResults+' '+timeRange+' results.');
    spotifyApi.getMyTopTracks({limit: numResults, time_range: timeRange})
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
    let newResultLabel = 'Top '+newResult+' tracks';
    this.setState({numResults: {value: newResult, label: newResultLabel}})
    this.getTopTracks(newResult, this.state.timeRange.value);
  }

  render() {
    const { numResults, timeRange, topTracks } = this.state;

    return (
      <div className='app'>

        <Background id="background" config={ this.state.background }></Background>
        <div className="navigation">
          <div className="menu"></div>
          <div className="user">
            <a href='http://localhost:8888/login'>Login to Spotify</a>
          </div>
        </div>
        <div className="page-wrap">

          <div className="config-options">
              <Select
                name="num-results"
                aria-label="Number of Results"
                value={numResults}
                onChange={this.setNumResults}
                options={[
                  {value: 10, label: 'Top 10 tracks'},
                  {value: 20, label: 'Top 20 tracks'},
                  {value: 50, label: 'Top 50 tracks'},
                ]}
                autoBlur
                clearable={false}
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
              />
          </div>

          <div className="page" data-simplebar>
            <div className="page-content">
              { this.state.loggedIn &&
                <div>
                  <ol className="results">
                    { this.state.topTracks &&
                      topTracks.map((object, i) => {
                        return <TrackItem obj={ object } key={ object.id } />
                      })
                    }
                  </ol>
                  { numResults.value < 50 &&
                    <button className="view-more" onClick={this.loadMore}>
                      View More
                    </button>
                  }
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
