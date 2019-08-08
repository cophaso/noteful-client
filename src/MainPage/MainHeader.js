import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class MainHeader extends Component{
  render(){
    return (
      <h1><Link to='/'>Noteful</Link></h1>
    )
  }
}

export default MainHeader;