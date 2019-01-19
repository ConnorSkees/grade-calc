import React, { Component } from 'react';
import { Input } from 'antd';

class AssignmentNameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFocused: false,
        value: this.props.defaultValue,
    };
  }

  handleClick = () => {
    this.setState( { isFocused: true } )
  }

  handleBlur = () => {
    let value = this.state.value ? this.state.value : this.props.defaultValue;
    if (value === ""){
      value = this.props.defaultValue;
    }
    this.setState( { isFocused: false, value } )
  }

  handleChange(event) {
    let { value } = event.target;
    this.setState({ value });
  }

  reset() {
    this.setState({ value: this.props.defaultValue })
  }

  render() {
    let { value } = this.state
    // console.log(`Value: ${value}`)
    if (!this.state.isFocused){
      return (
        <div>
          <span style={{ width: "100%" }} onClick={ this.handleClick }>{ value }</span>
        </div>
      )}
    return (
      <div>
        <Input
          value={ value }
          onChange={ event => this.handleChange(event) }
          onBlur={ () => this.handleBlur(value) }
          autoFocus
          { ...this.props } />
      </div>
    )
  };
}

export default AssignmentNameInput;
