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

const columns = [{
    title: 'Assignment',
    dataIndex: 'assignment',
    key: 'assignment',
    render: (text, record) => (
      <AssignmentNameInput defaultValue={record.assignment} />
    )
  }, {
    title: 'Points Earned',
    dataIndex: 'pointsEarned',
    key: 'pointsEarned',
    render: (text, record) => (
      <div>
        <GradeInput
          style={{  }}
          ref="gradeInput"
          pointsPossible={record.pointsPossible}
          showGradeTag={true}
          defaultValue={record.pointsEarned}
          max={Math.max(record.pointsPossible, record.pointsEarned)}
          min={0} />
      </div>
    )
  }, {
    title: 'Points Possible',
    dataIndex: 'pointsPossible',
    key: 'pointsPossible',
    render: (text, record) => (
      <GradeInput defaultValue={record.pointsPossible} min={record.pointsPossible} max={record.pointsPossible} />
    )
  },];

const data = [{
    key: '1',
    assignment: 'Mp1 Participation Points',
    pointsEarned: 5,
    pointsPossible: 0,
  },
  {
    key: '2',
    assignment: 'Marking Period 1 Class Points',
    pointsEarned: 50,
    pointsPossible: 50,
  },
  {
    key: '3',
    assignment: 'Chapter 10 Chapter Test',
    pointsEarned: 45,
    pointsPossible: 54,
  }
];

const mountNode = document.getElementById('root');


const x = "x"
ReactDOM.render(
  <CardWithTable
    columns={columns}
    data={data}/>,
  mountNode
);
// ReactDOM.render(<GradeInput />, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
