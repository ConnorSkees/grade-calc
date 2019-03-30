import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Alert, Drawer, Icon, InputNumber, Card, Select, Button, message } from 'antd';
import GradeTags from './GradeTags'
import PercentSelectors from './PercentSelectors'
import AssignmentNameInput from './AssignmentNameInput'

const Option = Select.Option;

const inputStyle = {
  width: `${100/3}%`,
  display: "inline-block",
  marginTop: "3%",
  alignSelf: "center",
}

class FinalCalc extends Component {
  state = {
    gpa: 0,
    isFullYear: true, // as opposed to semester
    isAuto: true, // as opposed to manual

    drawerVisible: false,

    alert: <Alert message="x" style={{visibility: "hidden"}}/>,

    gradeWanted: 95,
    view: 'mp',

    inputs: [
      {
        'title': 'MP 1',
        'value': 0,
        'weight': .9/4,
        'semesterWeight': .9/2,
      },
      {
        'title': 'MP 2',
        'value': 0,
        'weight': .9/4,
        'semesterWeight': .9/2,
      },
      {
        'title': 'MP 3',
        'value': 0,
        'weight': .9/4,
      },
      {
        'title': 'MP 4',
        'value': 0,
        'weight': .9/4,
      },
      {
        'title': 'Final',
        'value': 0,
        'weight': .1,
        'semesterWeight': .1,
      },
    ],

    weightDict: {
      'AP': .5,
      'dualenrollment': .25,
      'honors': .25,
      'regular': 0,
    },
    percentToGPA: {
      // use the maximum per range
      100: 4,   // A+ 99-100
      98: 4,    // A  95-98
      94: 3.67, // A- 93-94
      92: 3.33, // B+ 91-92
      90: 3,    // B  87-90
      86: 2.67, // B- 85-85
      // does not recieve honors weight past this point
      84: 2.33, // C+ 83-84
      82: 2,    // C  77-82
      76: 1.67, // C- 75-76
      74: 1.33, // D+ 73-74
      72: 1,    // D  67-72
      66: .67,  // D- 65-66
      64: 0,    // F  0-64
    }
  };

  toggleDrawer = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  };

  reset = () => {
    this.setState({
      isAuto: true,
      isFullYear: true,
      inputs: [
        {
          'title': 'MP 1',
          'value': 0,
          'weight': .9/4,
          'semesterWeight': .9/2,
        },
        {
          'title': 'MP 2',
          'value': 0,
          'weight': .9/4,
          'semesterWeight': .9/2,
        },
        {
          'title': 'MP 3',
          'value': 0,
          'weight': .9/4,
        },
        {
          'title': 'MP 4',
          'value': 0,
          'weight': .9/4,
        },
        {
          'title': 'Final',
          'value': 0,
          'weight': .1,
          'semesterWeight': .1,
        },
      ]
    })
  }

  toggleAuto = () => {
    let { isAuto, gradeWanted } = this.state;
    this.setState({ isAuto: !isAuto });
    if (!isAuto) {
      this.calculateFinal(gradeWanted);
    }
  }

  toggleFullYear = () => {
    let { isFullYear, gradeWanted } = this.state;
    this.setState({ isFullYear: !isFullYear });
    this.calculateFinal(gradeWanted);
  }

  handleViewChange = view => {
    this.setState({ view });
  }

  updateGradeWanted = gradeWanted => {
    console.log(gradeWanted);
    this.setState({ gradeWanted });
    this.calculateFinal(gradeWanted);
  }

  updateMP = (v, title) => {
    v = v || 0; // v ||= 0;
    let inputs = this.state.inputs.map(i => {
      if (i.title === title){
        i.value = v;
      }
      return i;
    })
    this.setState({ inputs });
    if (this.state.isAuto) {
      this.calculateFinal(this.state.gradeWanted);
    }
  }

  calculateFinal = (gradeWanted) => {
    let { inputs, isFullYear, isAuto } = this.state;
    if (isAuto) {
      let weight = isFullYear ? "weight" : "semesterWeight";
      let finalGrade;
      let total = inputs.filter(i => !i.title.startsWith("Final")&&i[weight]).map(i => i.value*i[weight]).reduce((a, b) => a+b);

      console.log("Total: ", total);
      console.log("Grade Wanted: ", gradeWanted-.5);
			for (let i=0; i*.1+total<=gradeWanted-.5; i++) {
  			finalGrade = i;
  		}
      console.log("Final grade: ", finalGrade);

      if (finalGrade > 100) {
        this.setState({ alert: <Alert message="Desired grade is unachievable." type="error" showIcon/> })
        finalGrade = 100;
      } else if (finalGrade <= 0 || !finalGrade) {
        finalGrade = 0;
        this.setState({ alert: <Alert message="You don't even need to take a final!" type="info" /> })
      } else {
        this.setState({ alert: <Alert message="x" type="info" style={{visibility: "hidden"}}/> })
      }

      let inputss = inputs.map(i => {
        if (i.title.startsWith("Final")){
          i.value = finalGrade;
        }
        return i;
      })
      this.setState({ inputs:inputss })
    }
  }

  calculateFinalGrade = () => {
    let { inputs, isFullYear } = this.state;
    let weight = isFullYear ? "weight" : "semesterWeight";
    if (isFullYear) {
      console.log(inputs.map(i => i.value*i[weight]));
        return inputs.map(i => i.value*i[weight]).reduce((a, b) => a+b)
    }
    return inputs.filter(i => i[weight]).map(i => i.value*i[weight]).reduce((a, b) => a+b)
  }

  render() {
    let decimal = this.calculateFinalGrade();
    console.log(decimal);
    let percentage = Math.round(decimal);

    let { alert, isFullYear, inputs, isAuto, gradeWanted } = this.state;
    if (!isAuto) {
      alert = <Alert message="x" type="info" style={{visibility: "hidden"}}/>
    }

    let output = (
      <React.Fragment>
        <h2>Calculate your final grade  <Icon type="question-circle-o" onClick={this.toggleDrawer}/></h2>

        { alert }
        <div style={{ display: "flex", flexDirection: "column"}}>
          { inputs.map(i => {
            let shouldDisplay = "visible"
            if (!isFullYear && !(i.semesterWeight>0)){
              shouldDisplay = "hidden"
            }

            return (
              <div style={{  alignSelf: "center", visibility: shouldDisplay }}>
                <div style={{ width: `${100/3}%`, display:"inline-block" }}>
                  {i.title}
                </div>
                <InputNumber
                  formatter={ string => string === "0" ? '' : string }
                  style={ inputStyle }
                  key={ i.title }
                  title={ i.title }
                  max={ 100 }
                  min={ 0 }
                  disabled={ i.title.startsWith("Final")&&isAuto }
                  value={ inputs.filter(k => k.title === i.title)[0].value }
                  parser={string => string.replace(/[^\d\.]+/g, '')}
                  onChange={v => this.updateMP(v, i.title) }
                />
              </div>
            )
          }) }
        </div>
        <div style={{ paddingTop: "3%", height: "40px", visibility: isAuto ? "visible" : "hidden" }}>
            <span style={{ paddingRight: "0%" }}>I want</span>
            <GradeTags percentage={ gradeWanted } placement={ "right" } />
            <PercentSelectors style={{ display: "inline-block", float: "right" }} handleClick={ this.updateGradeWanted } />
        </div>
        <div style={{ width: '100%', borderTop: "1px solid gray", textAlign: "center" }}>
          <h1>{ percentage }%</h1>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button onClick={ this.toggleAuto }>{ isAuto ? "Manual" : "Auto" }</Button>
          <Button onClick={ this.reset }>Reset</Button>
          <Button onClick={ this.toggleFullYear }>{ isFullYear ? "Semester" : "Full Year" }</Button>
        </div>
      </React.Fragment>
    )
    // <Button
    //   style={{ float: "right" }}
    //   type="primary"
    //   onClick={ this.calculateFinalGrade }>Calculate</Button>
    // <Button
    //   style={{ float: "right" }}
    //   type="secondary"
    //   onClick={ this.removeDiff }>Clear</Button>

    return (
      <div>
        <Card
          title={
            <Select defaultValue="mp" style={{ width: 140 }} onChange={this.handleViewChange}>
              <Option value="mp">MP Calc</Option>
              <Option value="gpa">GPA Calc</Option>
              <Option value="final">Final Calc</Option>
            </Select>
        }
          style={{
              width: '350px',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '1%',
              marginBottom: '1%',
            }}
        >
        { output }

        </Card>
        <Drawer
          title="Final Grade Calculator"
          placement="right"
          closable={false}
          onClose={this.toggleDrawer}
          visible={this.state.drawerVisible}
        >
          <p>A calculator to see what you need to get on your final to finish with the grade you want.</p>
        </Drawer>
      </div>
    )
  };
}

export default FinalCalc;
