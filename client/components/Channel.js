import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isEmpty, filter, reduce } from 'lodash';
import * as actions from '../actions';
import { updateChannel, deleteChannel } from '../actions';
import ChannelForm from './ChannelForm';
import Entry from './Entry';
import { Plus, Minus } from '../utils/svg';


class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = { name: props.channel.name, opened: false, isFetching: false, error: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTurn = this.handleTurn.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  static propTypes = {
    channel: PropTypes.object.isRequired
  }

  handleChange(e) {
    const name = e.target.value
    this.setState({ name: e.target.value, error: name.length > 0 ? '' : 'You must provide name...' });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, error } = this.state;

    if(!name || isEmpty(name)) {
      this.setState({ error: 'You must provide name...' })
      return false;
    }

    if(this.state.error.length > 0) {
      return false;
    }

    const url = this.props.channel.url;
    this.setState({ isFetching: true });
    updateChannel({ name, url })
      .then(res => {
        this.props.updateChannelRedux({ name, url });
        this.setState({ isFetching: false });
      })
      .catch(err => this.setState({ isFetching: false, error: err.response.data.error }));
  }

  handleDelete() {
    const url = this.props.channel.url;
    this.setState({ isFetching: true });
    deleteChannel({ url })
      .then(res => this.props.deleteChannelRedux({ url }))
      .catch(err => this.setState({ isFetching: false, error: err.response.data.error }))
  }

  handleTurn() {
    this.setState({ opened: !this.state.opened });
  }

  render() {
    const { channel } = this.props;
    const { url, entries } = channel;
    const { name, opened, error, isFetching } = this.state;
    const unwatchedCount = filter(entries, entry => !entry.watched).length;
    return (
      <li className={opened ? 'opened' : ''}>
        {unwatchedCount > 0 && <div className="unwatched-field">{unwatchedCount}</div>}
          <ChannelForm
            fetching={isFetching}
            name={name}
            url={url}
            error={error}
            change={this.handleChange}
            submit={this.handleSubmit}
            propDelete={this.handleDelete}
          >
            <div className="svg-container" onClick={this.handleTurn}>{opened ? <Minus /> : <Plus />}</div>
          </ChannelForm>
        <ul>
          {channel.entries.map(entry => <Entry key={entry.title} entry={entry} channelUrl={url} />)}
        </ul>
      </li>
    );
  }
}

export default connect(null, actions)(Channel);
