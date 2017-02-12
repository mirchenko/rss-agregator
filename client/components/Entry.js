import React from 'react';
import * as actions from '../actions/news';
import { connect } from 'react-redux';

export default connect(null, actions)(({ channelUrl, entry, selectNews }) => {
  const { title, watched } = entry;
  return (
    <li className={ !watched ? 'unwatched' : '' } key={title} onClick={() => selectNews(channelUrl, entry)}>
      {title}
    </li>
  );
});
