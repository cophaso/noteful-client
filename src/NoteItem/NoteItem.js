import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './NoteItem.css';


function NoteItem(props) {
  return(
    <li className='Note__Item' key={props.id}>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`} >
          {props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button'>
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </li>
  )
}

export default NoteItem