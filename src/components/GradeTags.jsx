import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Tag, Tooltip } from 'antd';

const colorDict = {
  "A": "green",
  "B": "lime",
  "C": "gold",
  "D": "volcano",
  "F": "red",
  "invalid percentage": "geekblue",
}

class GradeTags extends Component {
  state = {};
  render() {
    let A = 93 - 1;
    let B = 85 - 1;
    let C = 76 - 1;
    let D = 66 - 1;
    let F = 0;

    let value;

    let { percentage, placement } = this.props;
    let prettyPercentage = `${Math.round(percentage)}%`;

    if (percentage > A){
      value = "A";
    } else if (percentage > B){
      value = "B";
    } else if (percentage > C){
      value = "C";
    } else if (percentage > D){
      value = "D";
    } else if (percentage >= F){
      value = "F";
    } else {
      value = "invalid percentage";
    }

    return (
      <div style={{display: 'inline-block', paddingLeft: '5%'}}>
        <Tooltip title={ value } placement={ placement || "top" }>
          <Tag color={ colorDict[value] }>{ prettyPercentage }</Tag>
        </Tooltip>
      </div>
    )
  };
}

export default GradeTags;
