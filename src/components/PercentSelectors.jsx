import React, { Component } from 'react';
import { Tag, Popover, Radio } from 'antd';

const RadioButton = Radio.Button;

class PercentSelectors extends Component {
  state = {
    aPercentages: [{key: 99, letter: "A+"}, {key: 95, letter: "A"}, {key: 93, letter: "A-"}],
    bPercentages: [{key: 91, letter: "B+"}, {key: 87, letter: "B"}, {key: 85, letter: "B-"}],
    cPercentages: [{key: 83, letter: "C+"}, {key: 77, letter: "C"}, {key: 75, letter: "C-"}],
    dPercentages: [{key: 73, letter: "D+"}, {key: 67, letter: "D"}, {key: 65, letter: "D-"}],
    fPercentages: [{key: 64, letter: "F"}],
  };

  renderRadio(arr) {
    return (
      <RadioButton
        value={arr.key}
        onClick={() => this.props.handleClick(arr.key)}
        key={arr.key} >{arr.key}%</RadioButton>
    )
  }

  render() {
    let aRadio = this.state.aPercentages.map(arr => this.renderRadio(arr))
    let bRadio = this.state.bPercentages.map(arr => this.renderRadio(arr))
    let cRadio = this.state.cPercentages.map(arr => this.renderRadio(arr))
    let dRadio = this.state.dPercentages.map(arr => this.renderRadio(arr))
    let fRadio = this.state.fPercentages.map(arr => this.renderRadio(arr))
    return (
      <div style={{ textAlign: "center", marginTop: "3%" }}>
        <Popover placement="bottom" content={aRadio}>
          <Tag color='green'>A</Tag>
        </Popover>
        <Popover placement="bottom" content={bRadio}>
          <Tag color='lime'>B</Tag>
        </Popover>
        <Popover placement="bottom" content={cRadio}>
          <Tag color='gold'>C</Tag>
        </Popover>
        <Popover placement="bottom" content={dRadio}>
          <Tag color='volcano'>D</Tag>
        </Popover>
        <Popover placement="bottom" content={fRadio}>
          <Tag color='red'>F</Tag>
        </Popover>
      </div>
    )
  };
}

export default PercentSelectors;
