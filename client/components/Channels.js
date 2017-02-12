import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Channel from './Channel';
import CreateChannel from './CreateChannel';

class Channels extends Component {
  componentWillMount() {
    this.props.fetchChannels();
  }

  render() {
    const { channels, isFetching, error } = this.props.channels;
    return (
      <ul id='channelsList' className={isFetching ? 'fetching' : ''}>
        <div className="spinner"></div>
        <CreateChannel error={error} />
        {channels.map(channel => <Channel key={channel.url} channel={channel} />)}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return { channels: state.channels };
};

export default connect(mapStateToProps, actions)(Channels);
