import React, { Component } from 'react';
import './App.css';

import Main from '../../components/Main/Main';
import Header from '../../components/Header/Header';
import Aside from '../../components/Aside/Aside';

import ticketsJSON from '../../tickets.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App__wrapper">
          <Aside />
          <Main tickets={ ticketsJSON.tickets }/>
        </div>
      </div>
    );
  }
}

export default App;
