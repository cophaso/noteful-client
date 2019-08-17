import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import ValidationError from '../validationError';
import './AddNote.css';
import PropTypes from 'prop-types';


class AddNote extends Component{
  static defaultProps = {
    history: {
      push: () => { }
    },
    folders: []
  }
  static contextType = NotefulContext;

  state = {
    name: {
      value: '',
      touched: false
    },
    folder: {
      value: '',
      touched: false
    }
  }

  updateName(name) {
    this.setState({ 
      name: { 
       value: name, 
       touched: true 
      } 
    });
  }

  updateFolder(folder) {
    this.setState({
      folder: {
        value: folder,
        touched: true 
      }
    });
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0 && this.state.name.touched === true) {
      return 'Name is required';
    }
  }

  validateFolder() {
    const folder = this.state.folder.value.trim();
    if (folder.length === 0 && this.state.folder.touched === true) {
      return 'Folder is required';
    }
  }

  handleBlurName = () => {
    this.setState({
      name: { ...this.state.name, touched: true }
    });
  };

  handleBlurFolder = () => {
    this.setState({
      folder: { ...this.state.folder, touched: true}
    });
  };

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
    const nameError = this.validateName();
    const folderError = this.validateFolder();
    const { folders } = this.context
    return(
      <section className='AddFolder'>
        <h2>Create Note</h2>
        <div className='registration__hint'>* required field</div>
        <form className='AddNote__form' onSubmit={this.handleSubmit}>
          <div className='AddNote__field'>
            <label htmlFor='AddNote__name-input'>Name*</label>
            <input 
              type='text' 
              id='name' 
              name='note-name'
              onChange={e => this.updateName(e.target.value)}
              onBlur = {this.handleBlurName}
              aria-label='Name' 
              aria-required='true' 
              aria-describedby='name-error'
            />
            <ValidationError id='name-error' message={nameError} />
          </div>
          <div className='AddNote__field'>
            <label htmlFor='AddNote__content-input'>Content</label>
            <textarea type='text' id='content' name='note-content'/>
          </div>
          <div className='AddNote__field'>
            <label htmlFor='AddNote__content-input'>Folder*</label>
            <select 
              name='note-folder-id'
              onChange={e => this.updateFolder(e.target.value)}
              onBlur = {this.handleBlurFolder}
              aria-label='Folder' 
              aria-required='true'
              aria-describedby='folder-error' >
              <option value={null}></option>
              {folders.map(folder => 
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
            <ValidationError id='folder-error' message={folderError} />
          </div>
          <div className='AddNote__button'>
            <button type='submit'
              disabled={
                !this.state.name.value || !this.state.folder.value
              }
            >Add Note</button>
          </div>
        </form>
      </section>
    )
  }
}

AddNote.propTypes ={
  folders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }))
}

export default AddNote;