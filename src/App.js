import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import store from './dummy-store';
import MainSection from './MainPage/MainSection';
import NotePage from './NotePage/NotePage';

class App extends Component {
  state ={
    store
  }

  render(){
    return (
      <div className="App">
        <Switch>
          <Route 
            exact path='/' 
            render={() => <MainSection store={this.state.store}/>}
          />
          <Route 
            path='/note/:id'
            component={NotePage}
          />   
        </Switch>     
      </div>
    )
  }
}

export default App;
