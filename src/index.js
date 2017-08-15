import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gameboard from './Gameboard';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Gameboard />, document.getElementById('root'));
registerServiceWorker();
