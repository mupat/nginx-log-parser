import React from 'react';
import ReactDOM from 'react-dom';

import Visualizer from './component/visualizer'
const worker = new Worker('worker.js');

ReactDOM.render(<Visualizer worker={worker}/>, document.getElementById('root'));
