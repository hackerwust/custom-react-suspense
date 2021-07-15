import React from 'react';
import logo from './logo.svg';
import './App.css';
import Suspense from './Suspense/context';
import { Example } from './SuspenseExample';

class App extends React.Component {
  render() {
    return (
      <Suspense callback={<div>---data loading---</div>}>
        <Example />
      </Suspense>
    );
  }
}


export default App;
