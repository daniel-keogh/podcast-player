import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MainView from './components/MainView';
import PlayerWrapper from './components/PlayerWrapper/PlayerWrapper';

function App() {
    return (
        <div>
            <div className="App">
                <div className="Wrapper">
                    <div className="Main">
                        <NavBar title="Subscriptions" />
                        <div className="Body">
                            <MainView className="MainView" />
                        </div>
                    </div>
                    <React.Fragment>
                        <PlayerWrapper clsName="Player"/>
                    </React.Fragment>
                </div>
            </div>
        </div>
    );
}

export default App;
