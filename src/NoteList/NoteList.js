import React, { Component } from 'react';
import NoteItem from '../NoteItem/NoteItem';
import NotefulContext from '../NotefulContext';
import './NoteList.css';

const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId === folderId)
)
class NoteList extends Component{
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext;
  
  render() {
    const { folderId } = this.props.match.params
    const { notes } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='NoteList'>
        <ul>
          {console.log(notesForFolder)}
          {notesForFolder.map(note => 
          <NoteItem 
            key={note.id}
            {...note}
            />
          )}
        </ul>
      </section>            
    )}
}

export default NoteList;