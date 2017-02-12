import axios from 'axios';
import { SELECT_NEWS, CLOSE_NEWS, PATCH_CHANNEL } from '../actions/types';
const ROOT = 'http://localhost:3030/';

export const selectNews = (channelUrl, entry) => dispatch => {
  dispatch({ type: SELECT_NEWS, payload: entry });
  if(!entry.watched) {
    return axios.patch(ROOT, { url: channelUrl, link: entry.link })
      .then(res => dispatch({ type: PATCH_CHANNEL, payload: { url: channelUrl, link: entry.link } }))
      .catch(() => {});
  }

};

export const closeNews = () => {
  return { type: CLOSE_NEWS };
};
