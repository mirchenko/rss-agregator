import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CreateChannel extends Component {
  constructor(props) {
    super(props);

    this.state = { url: '', error: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();

    if(this.state.error.length > 0) {
      return false;
    }

    this.props.createChannel(this.state.url);
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ url: value, error: value.length > 0 ? '' : 'You must provide url...' });
  }

  render() {
    const { url, error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={url} onChange={this.handleChange}/>
        <button className="btn btn-primary" action="submit">Create</button>
        {(this.props.error || error) && <span className="has-error">{this.props.error || error}</span>}
      </form>
    );
  }
}

export default connect(null, actions)(CreateChannel);
