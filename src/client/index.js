/*import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App.js'; // Add the .js extension

ReactDOM.hydrate(<App todos={window.__INITIAL_DATA__} />, document.getElementById('root'));*/
import React from 'react';
import { hydrateRoot } from 'react-dom/client'; // Use hydrateRoot for React 18
import App from '../App.js';

const root = document.getElementById('root');
hydrateRoot(root, <App />);