import React from 'react';
import store from '../dummy-store';

function NotePage({match}) {
  const note = store.notes.filter(note => note.id === match.params.id)
    return (
      <div className='note-page'>
        <div className='note-title'>{note[0].name}</div>
        <p>{note[0].content}</p> 
      </div>
    )
}

export default NotePage;