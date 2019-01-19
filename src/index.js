import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import GradeInput from './components/GradeInput'
import GradeTags from './components/GradeTags'
import AssignmentNameInput from './components/AssignmentNameInput'
import CardWithTable from './components/CardWithTable'

import 'antd/dist/antd.css';
import { Input, InputNumber, Table, Divider, Card, Form, Tag, Select } from 'antd';

function reset(self) {
  self.reset();
}




const mountNode = document.getElementById('root');


const x = "x"
ReactDOM.render(
  <CardWithTable />,
  mountNode
);
// ReactDOM.render(<GradeInput />, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
