import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './NoteItem.css';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';



class NoteItem extends Component {
  static defaultProps ={
    onDeleteNote: () => {},
    notes: []
  }
  static contextType = NotefulContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }
  render(){
    const { name, id, modified } = this.props
    return(
      <li className='Note__Item' key={id}>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`} >
            {name}
          </Link>
        </h2>
        <button 
          className='Note__delete' 
          type='button'
          onClick={this.handleClickDelete}
        >
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </li>
    )
  }
}

NoteItem.propTypes ={
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }))
}

export default NoteItem