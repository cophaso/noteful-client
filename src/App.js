import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import NotePage from './NotePage/NotePage';
import NoteList from './NoteList/NoteList';
import FolderListNav from './FolderListNav/FolderListNav';
import './App.css';
import NotefulContext from './NotefulContext';

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:9090/notes`),
      fetch(`http://localhost:9090/folders`)
    ])
    .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
            throw new Error(notesRes.status)
        if (!foldersRes.ok)
          throw new Error(foldersRes.status)

        return Promise.all([notesRes.json(), foldersRes.json()]);
    })
    .then(([notes, folders]) => {
        this.setState({notes, folders});
    })
    .catch(error => {
        console.error({error});
    });
  }


  handleDeleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  render(){
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    }
    return (
      <div className="App">
        {console.log(contextValue)}
        <NotefulContext.Provider value={contextValue}>
          <nav className="App__nav">
          {['/', '/folder/:folderId'].map(path => (
            <Route
              exact
              key={path}
              path={path}
              component={FolderListNav}
            />
          ))}      
          </nav>
          <header className="App__header">
            <h1><Link to='/'>Noteful</Link></h1>
          </header>
          <main className="App__main">
            <Switch>
              <Route 
                exact path='/' 
                component={NoteList}
              />
              <Route 
                path='/note/:id'
                component={NotePage}
              />
              <Route
                exact path={'/folder/:folderId'}
                component={NoteList}
              />
            </Switch>  
          </main>
        </NotefulContext.Provider>
      </div>
    )
  }
}

export default App;
