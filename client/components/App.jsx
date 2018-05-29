import React from 'react';
import { hot, setConfig } from 'react-hot-loader';
import { createSelector } from 'reselect';

setConfig({ logLevel: 'debug' });

class App extends React.Component {
  state = {
    count: 0
  };

  testSelector = createSelector(state => state.count, count => `Count is: ${count}`);

  render() {
    const testSelector = this.testSelector(this.state);
    return (
      <div>
        <p>{testSelector}</p>
        <p>Modify me and save!</p>
      </div>
    );
  }
}

export default hot(module)(App);
