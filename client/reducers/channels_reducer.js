import { cloneDeep, findIndex, remove } from 'lodash';
import {
  REQUEST_CHANNELS,
  RECEIVE_CHANNELS,
  REQUEST_CREATE_CHANNEL,
  RECEIVE_CREATE_CHANNEL,
  UPDATE_CHANNEL,
  PATCH_CHANNEL,
  DELETE_CHANNEL,
  ERROR } from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  channels: [],
  error: ''
};

export default(state = INITIAL_STATE, action) => {
  switch(action.type) {
    case REQUEST_CHANNELS:
      return { ...state, isFetching: true };
    case RECEIVE_CHANNELS:
      return { ...state, isFetching: false, channels: action.payload };
    case ERROR:
      return { ...state, isFetching: false, error: action.payload };
    case REQUEST_CREATE_CHANNEL: {
      return { ...state, isFetching: true };
    }
    case RECEIVE_CREATE_CHANNEL: {
      const channels = cloneDeep(state.channels);
      channels.push(action.payload);
      return { ...state, isFetching: false, channels, error: '' };
    }
    case UPDATE_CHANNEL: {
      const channels = cloneDeep(state.channels);
      const channelIndex = findIndex(channels, channel => channel.url === action.payload.url);
      channels[channelIndex].name = action.payload.name;
      return { ...state, channels };
    }
    case DELETE_CHANNEL: {
      const channels = cloneDeep(state.channels);
      remove(channels, channel => channel.url === action.payload.url);
      return { ...state, channels };
    }
    case PATCH_CHANNEL: {
      const channels = cloneDeep(state.channels);
      const channelIndx = findIndex(channels, channel => channel.url === action.payload.url);
      const entryIndex = findIndex(channels[channelIndx].entries, entry => entry.link === action.payload.link);
      channels[channelIndx].entries[entryIndex].watched = true;
      return { ...state, channels };
    }
    default:
      return state;
  }
}
