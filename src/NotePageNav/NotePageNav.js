import React from 'react';
import { NavLink } from 'react-router-dom';
import './NotePageNav.css';

export default function NotePageNav() {
  // static defaultProps = {
  //   history: {
  //     goBack: () => { }
  //   }
  // }
  
  return (
    <div className='NotePageNav'>
      <div className='NotePageNav__back'>
        <NavLink
          to='/'
          type='button'
          className='NotePageNav__back-button'
        >
          Back
        </NavLink>
      </div>
    </div>
  )
}