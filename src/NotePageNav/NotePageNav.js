import React from 'react';
import { NavLink } from 'react-router-dom';
import './NotePageNav.css';

export default function NotePageNav(props) {
  return (
    <div className='NotePageNav'>
      <div className='NotePageNav__back'>
        <NavLink
          onClick={() => props.history.goBack()}
          type='button'
          className='NotePageNav__back-button'
        >
          Back
        </NavLink>
      </div>
    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}