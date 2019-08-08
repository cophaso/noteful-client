import React, { Component } from 'react';
import NoteItem from '../NoteItem/NoteItem'

class NoteList extends Component{
  render(){
    const notes = this.props.notes
    return (
      <ul className="notes-list">
        {notes.map(note => 
        <NoteItem 
          key={note.id}
          {...note}
          />
        )}
      </ul>
    )
  }
}

export default NoteList