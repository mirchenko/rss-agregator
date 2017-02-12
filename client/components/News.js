import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';


const News = ({ news }) => {
  const { title, link, enclosure, content, contentSnippet, pubDate } = news;
  if(isEmpty(news)) {
    return null;
  }

  return (
    <div id='newsContainer'>
      <h2>{title}</h2>
      <span className='pub-date'>{pubDate.substr(0, pubDate.length - 6)}</span>
      <hr/>
      <div className='news-content'>
        <img src={enclosure.url} alt={title}/>
        <span>{contentSnippet}</span>
      </div>
      <hr/>
      <a href={link} target='_blank'>Visit Website</a>
    </div>
  );
};

const mapStateToProps = state => {
  return { news: state.news }
};

export default connect(mapStateToProps)(News);
