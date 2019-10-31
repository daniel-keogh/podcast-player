import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MainView from './components/MainView';
import Player from './components/Player/Player';

function App() {
  return (
    <div>
      <div className="App">
        <div className="Wrapper">
          <div className="Main">
            <NavBar title="Subscriptions"/>
            <div className="Body">
              <MainView className="MainView" />
            </div>
          </div>
          <div className="Player">
            <Player />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
