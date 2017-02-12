import axios from 'axios';
import {
  REQUEST_CHANNELS,
  RECEIVE_CHANNELS,
  REQUEST_CREATE_CHANNEL,
  RECEIVE_CREATE_CHANNEL,
  UPDATE_CHANNEL,
  DELETE_CHANNEL,
  ERROR } from '../actions/types';

const ROOT = 'http://localhost:3030/';


export const fetchChannels = () => dispatch => {
  dispatch({ type: REQUEST_CHANNELS });
  axios.get(ROOT)
    .then(res => dispatch({ type: RECEIVE_CHANNELS, payload: res.data.result }))
    .catch(err => dispatch({ type: ERROR, payload: 'Network Error' }));
};

export const createChannel = (url) => dispatch => {
  dispatch({ type: REQUEST_CREATE_CHANNEL });
  axios.post(ROOT, { url })
    .then(res => dispatch({ type: RECEIVE_CREATE_CHANNEL, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err.response.data.error}));
};

export const updateChannel = ({ name, url }) => axios.put(ROOT, { name, url });
export const updateChannelRedux = ({ name, url }) => dispatch => dispatch({ type: UPDATE_CHANNEL, payload: { name, url } });

export const deleteChannel = ({ url }) => axios({method: 'delete', url: ROOT, data: { url } });
export const deleteChannelRedux = ({ url }) => dispatch => dispatch({ type: DELETE_CHANNEL, payload: { url } });
