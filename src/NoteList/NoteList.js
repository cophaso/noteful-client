import React, { Component } from 'react';
import NoteItem from '../NoteItem/NoteItem';
import NotefulContext from '../NotefulContext';
import { NavLink } from 'react-router-dom';
import './NoteList.css';
import PropTypes from 'prop-types';

class NoteList extends Component{
  static defaultProps = {
    match: {
      params: {}
    },
    notes: []
  }
  static contextType = NotefulContext;
  
  render() {
    const { folderId } = this.props.match.params
    const { notes } = this.context
    const notesForFolder = notes.filter(note => note.folderId === folderId)
    const list = (notesForFolder.length > 0) ? notesForFolder : notes
      return (
        <section className='NoteList'>
          <ul>
            {list.map(note => 
            <NoteItem 
              key={note.id}
              {...note}
              />
            )}
          </ul>
          <div className='NoteList__button-container'>
            <NavLink
              to='/add-note'
              type='button'
              className='NoteList__add-note-button'
            >
              Add Note
            </NavLink>
          </div>
        </section>
      )
    }
}

NoteList.propTypes ={
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }))
}

export default NoteList;