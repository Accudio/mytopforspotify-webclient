import React, { Component } from 'react'
import granim from 'granim'
import './Background.css';

export default class Background extends Component {
  componentDidMount() {
    this.granim = new granim(Object.assign({}, this.props.config))
  }
  render() {
    return <canvas id={this.props.id} />
  }
}