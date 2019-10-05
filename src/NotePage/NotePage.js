import React, {Component} from 'react';
import NoteItem from '../NoteItem/NoteItem';
import './NotePage.css';
import '../NoteItem/NoteItem.css';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';
// import ErrorBoundary from '../ErrorBoundary';

class NotePage extends Component{
  static defaultProps = {
    match: {
      params: {}
    },
    notes: []
  }
  static contextType = NotefulContext;

  render() {
    const { id }= this.props.match.params
    const { notes } = this.context
    const list = notes.filter(note => note.id.toString() === id)
    return (
      <section className='NotePageMain'>
        {list.map((note,i) =>
        <div key={i}>
          {/* <ErrorBoundary> */}
            <NoteItem
              id={note.id}
              name={note.name}
              modified_date={note.modified_date}
            />
          {/* </ErrorBoundary> */}
          <div className='NotePageMain__content'>
            {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
            )}
          </div>
        </div>          
        )}
      </section>
    )
  }
}

NotePage.propTypes ={
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified_date: PropTypes.string.isRequired,
    folder_id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }))
}

export default NotePage;