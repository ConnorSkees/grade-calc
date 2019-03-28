import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import CardWithTable from './components/CardWithTable'
import FinalCalc from './components/FinalCalc'

import 'antd/dist/antd.css';

const mountNode = document.getElementById('root');

ReactDOM.render(
  <FinalCalc />,
  mountNode
);
// ReactDOM.render(<GradeInput />, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
