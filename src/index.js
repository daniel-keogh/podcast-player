import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

import { AuthContextProvider, TOKEN_KEY } from './store/authContext';
import { NowPlayingContextProvider } from './store/nowPlayingContext';

axios.defaults.baseURL = 'http://localhost:4000';

// Handle authentication errors
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem(TOKEN_KEY);
            window.location.href = '/auth';
        }
        return error;
    }
);

ReactDOM.render(
    <AuthContextProvider>
        <NowPlayingContextProvider>
            <App />
        </NowPlayingContextProvider>
    </AuthContextProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
