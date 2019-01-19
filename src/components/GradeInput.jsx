import React, { Component } from 'react';
import { InputNumber } from 'antd';
import GradeTags from "./GradeTags"


class GradeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFocused: false,
        value: this.props.defaultValue,
    };
  }

  handleClick = () => {
    this.setState( { isFocused: true } );
  }

  handleBlur = () => {
    this.setState( { isFocused: false } );
  }

  handleChange(value) {
    if (value === undefined){
      value = 0;
    }
    this.setState({ value });
  }

  reset() {
    this.setState({ value: this.props.defaultValue })
  }

  render() {
    let { value } = this.state;
    let percentage = (value/Math.max(this.props.pointsPossible, 1));
    percentage = percentage ? percentage*100 : 100;
    // console.log(`Percentage: ${percentage}`)
    // console.log(`Value: ${value}`)
    let gradeTag = ""
    if (this.props.showGradeTag){
      gradeTag = <GradeTags percentage={percentage} />

    }

    if (!this.state.isFocused){
      return (
      <div>
        {gradeTag}
        <span onClick={ this.handleClick }>{ value }</span>
    </div>
      )}
    return (
      <div>
        {gradeTag}
        <InputNumber
          value={ value }
          onChange={value => this.handleChange(value)}
          onBlur={() => this.handleBlur(value)}
          autoFocus
          formatter={value => `${value}`}
          { ...this.props } />
    </div>
    )
  };
}

export default GradeInput;
