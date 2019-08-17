import React, { Component } from 'react';
import NotefulContext from '../NotefulContext';
import './AddFolder.css';
import PropTypes from 'prop-types';
import ValidationError from '../validationError';

class AddFolder extends Component{
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = NotefulContext;

  state ={
    name: {
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

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0 && this.state.name.touched === true) {
      return "Name is required";
    }
  }

  handleBlurName = () => {
    this.setState({
      name: { ...this.state.name, touched: true }
    });
  };

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
    const nameError = this.validateName();
    return(
      <section className="AddFolder">
        <h2>Create a folder</h2>
        <div className='registration__hint'>* required field</div>
        <form className="AddFolder__form" onSubmit={this.handleSubmit}>
          <div className="AddFolder__field">
            <label htmlFor="AddFolder__name-input">Name*</label>
            <input 
              type="text" 
              id="name" 
              name='folder-name' 
              onChange={e => this.updateName(e.target.value)}
              onBlur={this.handleBlurName}
              aria-label='Name' 
              aria-required='true' 
              aria-describedby='name-error'/>
            <ValidationError id='name-error' message={nameError} />
          </div>
          <div className="AddFolder__button">
            <button type="submit"
              disabled={
                !this.state.name.value
              }
              >Add folder</button>
          </div>
        </form>
      </section>
    )
  }
}

AddFolder.propTypes ={
  folders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }))
}
export default AddFolder; 