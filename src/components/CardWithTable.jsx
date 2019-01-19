import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, InputNumber, Table, Divider, Card, Form, Tag, Select, Tooltip } from 'antd';
import GradeInput from './GradeInput'
import GradeTags from './GradeTags'
import AssignmentNameInput from './AssignmentNameInput'

const Option = Select.Option;

const columns = [{
    title: 'Assignment',
    dataIndex: 'assignment',
    key: 'assignment',
    render: (text, record) => (
      <AssignmentNameInput
        defaultValue={record.assignment}
      />
    )
  }, {
    title: 'Points Earned',
    dataIndex: 'pointsEarned',
    key: 'pointsEarned',
    render: (text, record) => (
      <div>
        <GradeInput
          style={{  }}
          pointsPossible={record.pointsPossible}
          showGradeTag={true}
          defaultValue={record.pointsEarned}
          max={Math.max(record.pointsPossible, record.pointsEarned)}
          min={0}
        />
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

class CardWithTable extends Component {
  state = {
    data: [{
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
      }],
  };

  sumPointsEarned(){
    let sum = 0;
    let { data } = this.state;
    for (let i=0; i < data.length; i++){
      sum += data[i]['pointsEarned'];
    }
    console.log(sum);
    return sum;
  }

  sumPointsPossible(){
    let sum = 0;
    let { data } = this.state;
    for (let i=0; i < data.length; i++){
      sum += data[i]['pointsPossible'];
    }
    return sum;
  }

  sumInput(){
    return (
      <Input readOnly value={`Total Points:  ${this.sumPointsEarned()} / ${this.sumPointsPossible()}`}/>
    )
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    return (
      <div>
        <Card
          title="MP Grade Calculator"
          extra={
            <Select defaultValue="AP Calculus II" style={{ width: 140 }} onChange={this.handleChange}>
              <Option value="class1">Honors Calculus I</Option>
              <Option value="class2">AP U.S. History</Option>
              <Option value="class3">You're MOm</Option>
            </Select>
          }
          style={{
              width: '350px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
        >
          {this.sumInput()}
        </Card>
        <Table
          style={{
            width: '100%'
          }}
          columns={ columns }
          pagination={ false }
          dataSource={ this.state.data }
        />
      </div>
    )
  };
}

export default CardWithTable;
