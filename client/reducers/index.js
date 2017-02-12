import { combineReducers } from 'redux';
import ChannelsReducer from './channels_reducer';
import NewsReducer from './news_reducer';

export default combineReducers({
  channels: ChannelsReducer,
  news: NewsReducer
});
