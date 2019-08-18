import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import NotePage from './NotePage/NotePage';
import NoteList from './NoteList/NoteList';
import FolderListNav from './FolderListNav/FolderListNav';
import './App.css';
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder/AddFolder';
import NotePageNav from './NotePageNav/NotePageNav';
import AddNote from './AddNote/AddNote';
import ErrorBoundary from './ErrorBoundary';

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

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder],
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  }

  render(){
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote
    }
    return (
      <div className="App">
        <NotefulContext.Provider value={contextValue}>
          <nav className="App__nav" aria-live='polite'>
            <Switch>
              {['/', '/folder/:folderId'].map(path => (
                <Route
                  exact
                  key={path}
                  path={path}
                  render = {() => 
                    <ErrorBoundary>
                      <FolderListNav/>
                    </ErrorBoundary> }
                />
              ))}
              {['/add-folder', '/add-note', '/note/:id'].map(path => (
                <Route 
                  exact 
                  key={path}
                  path={path}
                  component={NotePageNav}
                />
              ))}
            </Switch>     
          </nav>
        <header className="App__header">
          <h1><Link to='/'>Noteful</Link></h1>
        </header>
          <main className="App__main" aria-live='polite'>
            <Switch>
              {['/', '/folder/:folderId'].map(path => (
                <Route 
                  exact 
                  key={path}
                  path={path}
                  component={NoteList}
                />
              ))}
              <Route 
                exact
                key='/note/:id'
                path='/note/:id'
                component={NotePage}
              />
              <Route
                exact
                path='/add-folder'
                component={AddFolder}
              />
              <Route
                exact
                path='/add-note'
                component={AddNote}
              />
            </Switch>  
          </main>
        </NotefulContext.Provider>
      </div>
    )
  }
}

export default App;
