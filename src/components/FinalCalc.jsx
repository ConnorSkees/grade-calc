import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Alert, Drawer, InputNumber, Card, Select, Button } from 'antd';
import GradeTags from './GradeTags'
import PercentSelectors from './PercentSelectors'


const inputStyle = {
  width: `${100/3}%`,
  display: "inline-block",
  marginTop: "3%",
  alignSelf: "center",
}

const cardStyle = {
    width: '350px',
    margin: "auto",
    marginTop: "10vh",
    marginBottom: "10vh",
}

class FinalCalc extends Component {
  constructor(props){
    super(props)
    this.state = {
      gpa: 0,
      isAuto: true, // as opposed to manual
      drawerVisible: false,
      alert: <Alert message="x" style={{visibility: "hidden"}}/>,
      gradeWanted: 95,
      finalWeight: .1,
      mpCount: 4,
      inputs: [],
    };
    this.initInputs();
  }

  toggleDrawer = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  };

  initInputs() {
    let { finalWeight, mpCount } = this.state;
    let inputs = [];
    for(let i=0; i < mpCount; i++){
      inputs.push({
          'title': `MP ${i+1}`,
          'value': 0,
          'weight': (1-finalWeight)/mpCount,
      })
    }

    inputs.push({
      'title': 'Final',
      'value': 0,
      'weight': finalWeight,
    })
    this.state.inputs = inputs;
  }

  reset = () => {
    let finalWeight = .1;
    let mpCount = 4;

    this.setState({
      isAuto: true,
      alert: <Alert message="x" style={{visibility: "hidden"}}/>,
      gradeWanted: 95,
      mpCount,
      finalWeight
    })


    let inputs = [];
    for(let i=0; i < mpCount; i++){
      inputs.push({
          'title': `MP ${i+1}`,
          'value': 0,
          'weight': (1-finalWeight)/mpCount,
      })
    }

    inputs.push({
      'title': 'Final',
      'value': 0,
      'weight': finalWeight,
    })

    this.setState({ inputs })
  }

  toggleAuto = () => {
    let { isAuto, gradeWanted } = this.state;
    this.setState({ isAuto: !isAuto });
    if (!isAuto) {
      this.calculateFinal(gradeWanted);
    }
  }

  toggleFullYear = () => {
    let { inputs } = this.state;
    if (inputs.length > 3) {
      this.updateMPCount(2);
    } else {
      this.updateMPCount(4);
    }
  }

  updateFinalWeight = (finalWeight) => {
    let { inputs, mpCount } = this.state;
    finalWeight /= 100;
    inputs.map(i => {
      if (i.title === "Final") {
        i.weight = finalWeight;
      } else {
        i.weight = (1-finalWeight)/mpCount;
      }
      return i;
    })
    this.setState({ finalWeight, inputs })
  }

  updateMPCount = (mpCount) => {
    let { finalWeight, inputs } = this.state;
    let newInputs = [];
    let value;
    for(let i=0; i < mpCount; i++){
      let thisInput = inputs[i];
      try {
        value = thisInput.title === "Final" ? 0 : thisInput.value || 0;
      } catch {
        value = 0;
      }
      newInputs.push({
          'title': `MP ${i+1}`,
          'value': value,
          'weight': (1-finalWeight)/mpCount,
      })
    }

    newInputs.push({
      'title': 'Final',
      'value': 0,
      'weight': finalWeight,
    })
    this.setState({ inputs: newInputs, mpCount })
  }

  updateGradeWanted = gradeWanted => {
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
    let { inputs, isAuto, finalWeight } = this.state;
    if (isAuto) {
      let finalGrade;
      let total = inputs.filter(i => !i.title.startsWith("Final")&&i.weight).map(i => i.value*i.weight).reduce((a, b) => a+b);

      // console.log("Total: ", total);
      // console.log("Grade Wanted: ", gradeWanted-.5);
			for (let i=0; i*finalWeight+total<=gradeWanted-.5; i++) {
        if (i > 101){
          break;
        }
  			finalGrade = i;
  		}
      // console.log("Final grade: ", finalGrade);

      if (finalGrade > 100) {
        this.setState({ alert: <Alert message="Desired grade is unachievable." type="error" showIcon/> })
        finalGrade = 100;
      } else if (finalGrade <= 0 || !finalGrade) {
        finalGrade = 0;
        this.setState({ alert: <Alert message="You don't even need to take a final!" type="success" showIcon/> })
      } else {
        this.setState({ alert: <Alert message="x" type="info" style={{visibility: "hidden"}}/> })
      }

      let inputss = inputs.map(i => {
        if (i.title === "Final"){
          i.value = finalGrade;
        }
        return i;
      })
      this.setState({ inputs:inputss })
    }
  }

  render() {
    let { alert, inputs, isAuto, gradeWanted, finalWeight } = this.state;

    console.log(inputs)

    let percentage = Math.round(inputs.map(i => i.value*i.weight).reduce((a, b) => a+b))

    if (!isAuto) {
      alert = <Alert message="x" type="info" style={{visibility: "hidden"}}/>
    }

    let output = (
      <React.Fragment>
        <h2>Calculate your final grade</h2>
        { alert }
        <div style={{ display: "flex", flexDirection: "column"}}>
          { inputs.map(i => {
            let shouldDisplay = "visible"
            if (i.title === "Final" && !this.state.finalWeight){
              shouldDisplay = "hidden"
            }

            return (
              <div key={ i.title } style={{  alignSelf: "center", visibility: shouldDisplay }}>
                <label style={{ width: `${100/3}%`, display:"inline-block" }} htmlFor={ i.title }>
                  {i.title}
                </label>
                <InputNumber
                  formatter={ string => string === "0" ? '' : string }
                  style={ inputStyle }
                  key={ i.title }
                  id={ i.title }
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
          <Button type="primary" onClick={ this.reset }>Reset</Button>
          <Button onClick={ this.toggleFullYear }>{ inputs.length > 3 ? "Semester" : "Full Year" }</Button>
        </div>
      </React.Fragment>
    )

    return (
      <div>
        <Card
          title={ "MP Calc" }
        extra={
          <Button onClick={ this.toggleDrawer } >Advanced</Button>
        }
          style={ cardStyle }
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
          <Button onClick={ () => this.updateFinalWeight(finalWeight ? 0 : 10) }>{ finalWeight ? "No Final" : "Final" }</Button>
            <div>
              <span>
                Final Weight:
              </span>
              <InputNumber
                style={{ width: `${100/3}%`, display: "inline-block", marginTop: "3%", marginLeft: "3%" }}
                max={ 100 }
                min={ 0 }
                value={ Math.trunc(this.state.finalWeight*100) }
                parser={string => string.replace(/[^\d\.]+/g, '')}
                onChange={v => this.updateFinalWeight(v) }
                />
            </div>
            <div>
              <span>
                MP Count:
              </span>
              <InputNumber
                style={{ width: `${100/3}%`, display: "inline-block", marginTop: "3%", marginLeft: "3%" }}
                max={ 10 }
                min={ 1 }
                value={ this.state.mpCount }
                parser={string => string.replace(/[^\d\.]+/g, '')}
                onChange={v => this.updateMPCount(v) }
                />
            </div>
        </Drawer>
      </div>
    )
  };
}

export default FinalCalc;
