import React from 'react';
import './NotePageNav.css';

export default function NotePageNav(props) {
  return (
    <div className='NotePageNav'>
      <div className='NotePageNav__back'>
        <button
          onClick={() => props.history.goBack()}
          type='button'
          className='NotePageNav__back-button'
        >
          Back
        </button>
      </div>
    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}