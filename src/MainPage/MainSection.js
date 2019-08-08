import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import MainHeader from './MainHeader';
import NoteList from '../NoteList/NoteList';


class MainSection extends Component{
  render(){
    return(
      <div className='MainPage'>
        <header>
          <MainHeader />
        </header>
        <main>
          <NoteList notes={this.props.store.notes} />
        </main>
      </div>
    )
  }
}

export default MainSection;