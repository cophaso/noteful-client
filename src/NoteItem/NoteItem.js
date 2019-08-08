import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import NotePage from '../NotePage/NotePage';

class NoteItem extends Component {
  render(){
    return(
      <li className='note-item'>
        <Link to={`/note/${this.props.id}`} >
          {this.props.name}
        </Link>
      </li>
    )
  }
}

export default NoteItem