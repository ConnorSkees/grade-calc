import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Tag, Tooltip } from 'antd';

class GradeTags extends Component {
  state = {};
  render() {
    let A = 93;
    let B = 85;
    let C = 76;
    let D = 66;
    let F = 0;
    let color = "geekblue";
    let value = "no percentage specified";

    let { percentage } = this.props;
    let prettyPercentage = `${percentage.toPrecision(3)}%`;

    if (isNaN(percentage)){
      prettyPercentage = "100%";
    } else if (percentage === Infinity){
      prettyPercentage = "100%";
    }

    if (percentage > A){
      color = "green";
      value = "A";
    } else if (percentage > B){
      color = "lime";
      value = "B";
    } else if (percentage > C){
      color = "gold";
      value = "C";
    } else if (percentage > D){
      color = "volcano";
      value = "D";
    } else if (percentage >= F){
      color = "red";
      value = "F";
    } else {
      color = "geekblue";
      value = "F";
    }

    return (
      <div style={{display: 'inline-block', paddingLeft: '5%'}}>
        <Tooltip title={ prettyPercentage }>
          <Tag color={ color }>{ value }</Tag>
        </Tooltip>
      </div>
    )
  };
}

export default GradeTags;
