import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import './AddNote.css';

class AddNote extends Component{
  static defaultProps = {
    history: {
      push: () => { }
    }
  }
  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault()
    const note = {
      name: e.target['note-name'].value,
      modified: new Date(),
      folderId: e.target['note-folder-id'].value,
      content: e.target['note-content'].value
    }
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(note),
    })
      .then(response => {
        if (!response.ok)
          throw new Error(response.status)
        return response.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render(){
    const { folders } = this.context
    return(
      <section className='AddFolder'>
        <h2>Create Note</h2>
        <form className='AddNote__form' onSubmit={this.handleSubmit}>
          <div className='AddNote__field'>
            <label htmlFor='AddNote__name-input'>Name</label>
            <input type="text" id="name" name='note-name'/>
          </div>
          <div className='AddNote__field'>
            <label htmlFor='AddNote__content-input'>Content</label>
            <textarea type="text" id="content" name='note-content'/>
          </div>
          <div className='AddNote__field'>
            <label htmlFor='AddNote__content-input'>Folder</label>
            <select name='note-folder-id'>
              <option value={null}>...</option>
              {folders.map(folder => 
                <option key={folder.id} value={folder.name}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className="AddNote__button">
            <button type="submit">Add folder</button>
          </div>
        </form>
      </section>
    )
  }

}

export default AddNote;