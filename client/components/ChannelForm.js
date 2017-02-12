import React, { Component, PropTypes } from 'react';


export default({ name, error, fetching, submit, change, propDelete, children }) => {
  return (
    <form onSubmit={submit} className={fetching ? 'fetching' : ''}>
      {children}
      <input type="text" onChange={change} value={name}/>
      {error && <span className="has-error">{error}</span>}
      <div className="spinner"></div>
      <button className="btn btn-primary" action="submit">Update</button>
      <div className="btn btn-danger" onClick={propDelete}>Delete</div>
    </form>
  );
}
