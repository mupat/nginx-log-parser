import React from 'react';
import ReactDOM from 'react-dom';

import NginxParser from './component/main'
const worker = new Worker('worker.js');

ReactDOM.render(<NginxParser worker={worker}/>, document.getElementById('root'));
