import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import dummyStore from './dummy-store';
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
      // fake date loading from API call
      setTimeout(() => this.setState(dummyStore), 600);
  }

  render(){
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders
    }
    return (
      <div className="App">
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
