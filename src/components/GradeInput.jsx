import React, { Component } from 'react';
import { InputNumber } from 'antd';


class GradeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFocused: false,
        value: this.props.value
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

  render() {
    let { value } = this.props;
    // console.log(`Value: ${value}`)

    if (!this.state.isFocused){
      return (
      <div>
        <span onClick={ this.handleClick }>{ value }</span>
    </div>
      )}
    return (
      <div>
        <InputNumber
          value={ value }
          onChange={value => this.props.handleChange(value)}
          onBlur={ this.handleBlur }
          autoFocus
          formatter={value => `${value}`}
          parser={string => string.replace(/\D+/g, '')}
          { ...this.props } />
    </div>
    )
  };
}

export default GradeInput;