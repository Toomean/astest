import React, { Component } from 'react';

import Header from 'components/Header/Header';
import Layout from 'containers/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Layout />
      </div>
    );
  }
}

export default App;
