import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, InputNumber, Table, Divider, Card, Form, Tag, Select, Tooltip } from 'antd';

const Option = Select.Option;

class CardWithTable extends Component {
  state = {};

  sumPointsEarned(){
    let sum = 0;
    let { data } = this.props
    for (let i=0; i < data.length; i++){
      sum += data[i]['pointsEarned']
    }
    console.log(sum)
    return sum;
  }

  sumPointsPossible(){
    let sum = 0;
    let { data } = this.props
    for (let i=0; i < data.length; i++){
      sum += data[i]['pointsPossible']
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
          columns={this.props.columns}
          pagination={false}
          dataSource={this.props.data} />
      </div>
    )
  };
}

export default CardWithTable;
