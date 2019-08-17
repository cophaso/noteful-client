import React from 'react';

export default function ValidationError(props) {
  if(props.message) {
    return (
      <div id={props.id} className="error">{props.message}</div>
    );
  }

  return <></>
}