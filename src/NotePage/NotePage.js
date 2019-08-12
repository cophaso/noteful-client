import React from 'react';
import store from '../dummy-store';
import NoteItem from '../NoteItem/NoteItem';
import './NotePage.css';
import '../NoteItem/NoteItem.css';

function NotePage({match}) {
  const note = store.notes.filter(note => note.id === match.params.id)
    return (
      <section className='NotePageMain'>
        <NoteItem
          id={note[0].id}
          name={note[0].name}
          modified={note[0].modified}
        />
        <div className='NotePageMain__content'>
          {note[0].content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
        </div>
      </section>
    )
}

export default NotePage;