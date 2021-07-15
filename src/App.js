import React from 'react';
import logo from './logo.svg';
import './App.css';
import Suspense from './Suspense/context';
import { Content } from './SuspenseExample';

class App extends React.Component {
  render() {
    return (
      <Suspense callback={<div>hahahhaah</div>}>
        <Content />
      </Suspense>
    );
  }
}


export default App;
