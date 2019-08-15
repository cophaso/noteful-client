import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import './AddFolder.css';

class AddFolder extends Component{
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      name: e.target['folder-name'].value
    }
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(response => {
        if (!response.ok)
          throw new Error(response.status)
        return response.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render(){
    return(
      <section className="AddFolder">
        <h2>Create a folder</h2>
        <form className="AddFolder__form" onSubmit={this.handleSubmit}>
          <div className="AddFolder__field">
            <label htmlFor="AddFolder__name-input">Name</label>
            <input type="text" id="name" name='folder-name'/>
          </div>
          <div className="AddFolder__button">
            <button type="submit">Add folder</button>
          </div>
        </form>
      </section>
    )
  }
}

export default AddFolder; 