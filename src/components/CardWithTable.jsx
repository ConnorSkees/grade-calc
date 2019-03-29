import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, InputNumber, Table, Card, Select, Button, message } from 'antd';
import GradeInput from './GradeInput'
import GradeTags from './GradeTags'
import PercentSelectors from './PercentSelectors'
import AssignmentNameInput from './AssignmentNameInput'

const Option = Select.Option;

// TODO: select option for weight
// TODO: persistent name changes
// TODO: points possible handle change

class CardWithTable extends Component {
  state = {
    mpData: [{'assignment': 'Dhmo Petition',
      'key': 'zi3CHdkW2g',
      'pointsEarned': 10.0,
      'pointsPossible': 10.0},
     {'assignment': 'Retest Ch 2',
      'key': 'Nj3ByuUPZx',
      'pointsEarned': 12.0,
      'pointsPossible': 0.0},
     {'assignment': 'Illustrated Poem',
      'key': 'D2p8ElRvBj',
      'pointsEarned': 15.0,
      'pointsPossible': 15.0},
     {'assignment': 'Ch 2 Exam - Measurements',
      'key': 'Ps6LJi2Efi',
      'pointsEarned': 86.0,
      'pointsPossible': 100.0},
     {'assignment': 'Organizing Data Activity',
      'key': 'VwmfAArxPn',
      'pointsEarned': 30.0,
      'pointsPossible': 30.0},
     {'assignment': 'Article Critique 3',
      'key': 'D82jyod3Z6',
      'pointsEarned': 10.0,
      'pointsPossible': 10.0},
     {'assignment': 'Intro To Chem Retest',
      'key': 'H4ezXuUswS',
      'pointsEarned': 12.0,
      'pointsPossible': 0.0},
     {'assignment': 'Article Critique 2',
      'key': 'EuEDIBA7D4',
      'pointsEarned': 10.0,
      'pointsPossible': 10.0},
     {'assignment': 'Dhmo Acrostic',
      'key': 'EUTsCHU6Cl',
      'pointsEarned': 10.0,
      'pointsPossible': 10.0},
     {'assignment': 'Dhmo Facts And Inferences',
      'key': 'C01K8dbXPE',
      'pointsEarned': 10.0,
      'pointsPossible': 10.0},
     {'assignment': 'Observation Experiment Lab',
      'key': '9ralG0gWzS',
      'pointsEarned': 34.0,
      'pointsPossible': 36.0},
     {'assignment': 'Intro To Chem Exam',
      'key': '5koYPIJD1m',
      'pointsEarned': 82.0,
      'pointsPossible': 95.0},
     {'assignment': 'Autobiography Of An Elements',
      'key': '3rpkVWhGKQ',
      'pointsEarned': 30.0,
      'pointsPossible': 30.0},
     {'assignment': 'Article Critique 1',
      'key': 'xWL4dSBDlr',
      'pointsEarned': 10.0,
      'pointsPossible': 10.0},
     {'assignment': 'Lab Safety Exam',
      'key': 'tGRCxUoO0n',
      'pointsEarned': 125.0,
      'pointsPossible': 134.0},
     {'assignment': 'Textbook Activity',
      'key': 'IzYJ2tMUI2',
      'pointsEarned': 23.0,
      'pointsPossible': 25.0}
    ],
    mpColumns: [{
        title: 'Assignment',
        dataIndex: 'assignment',
        key: 'assignment',
        render: (text, record) => (
          <div>
          <AssignmentNameInput
            defaultValue={record.assignment}
          /><GradeTags percentage={(record.pointsEarned/record.pointsPossible)*100} />
        </div>
        )
      }, {
        title: 'Points Earned',
        dataIndex: 'pointsEarned',
        key: 'pointsEarned',
        render: (text, record) => (
            <GradeInput
              style={{  }}
              pointsPossible={record.pointsPossible}
              defaultValue={record.pointsEarned}
              max={Math.max(record.pointsPossible, record.pointsEarned)}
              onChange={value => {
                let thisData = this.state.mpData.filter(x => x.key === record.key)[0];

                let max = Math.max(record.pointsPossible, record.pointsEarned);
                if (value === undefined){
                  value = 0;
                } else if (value > max){
                  value = max;
                }

                thisData.pointsEarned = value;
                this.setState({ mpData: thisData&&this.state.mpData })
              }}
              value={record.pointsEarned}
              min={0}
            />
        )
      }, {
        title: 'Points Possible',
        dataIndex: 'pointsPossible',
        key: 'pointsPossible',
        render: (text, record) => (
          <GradeInput value={record.pointsPossible} defaultValue={record.pointsPossible} min={record.pointsPossible} max={record.pointsPossible} />
        )
      }, ],

    gpaColumns: [{
        title: 'Class',
        dataIndex: 'className',
        key: 'className',
        render: (text, record) => (
          <div>
          <AssignmentNameInput
            defaultValue={record.className}
          />
        </div>
        )
      },
      {
        title: 'Weight',
        dataIndex: 'weight',
        key: 'weight',
        render: (text, record) => (
          <AssignmentNameInput
            defaultValue={record.weight}
          />
        )
      },
      {
        title: 'Credits',
        dataIndex: 'credits',
        key: 'credits',
        render: (text, record) => (
          <GradeInput
            value={record.credits}
            min={0}
            max={3}
            step={.5}
            onChange={value => {
              let thisData = this.state.gpaData.filter(x => x.key === record.key)[0];

              let max = 3;
              let min = 0;

              if (value === undefined || value < min){
                value = min;
              } else if (value > max){
                value = max;
              }

              thisData.credits = value;
              this.setState({ gpaData: thisData&&this.state.gpaData });
              this.updateGPA();
            }}
          />
        )
      },
      {
        title: 'Grade',
        dataIndex: 'grade',
        key: 'grade',
        render: (text, record) => (
          <GradeInput
            value={record.grade}
            min={0}
            max={100}
            onChange={value => {
              let thisData = this.state.gpaData.filter(x => x.key === record.key)[0];

              let max = 100;
              let min = 0;

              if (value === undefined || value < min){
                value = min;
              } else if (value > max){
                value = max;
              }

              thisData.grade = value;
              this.setState({ gpaData: thisData&&this.state.gpaData });
              this.updateGPA();
            }}
          />
        )
      },
    ],
    gpaData: [
      {
        key: '1',
        className: 'AP Calculus II',
        weight: 'AP',
        credits: 1,
        grade: 95,
      },
      {
        key: '2',
        className: 'Honors Spanish IV',
        weight: 'honors',
        credits: 1,
        grade: 95,
      },
      {
        key: '3',
        className: 'CIS 105',
        weight: 'dualenrollment',
        credits: 1,
        grade: 95,
      },
      {
        key: '4',
        className: 'Freshman Biology',
        weight: 'regular',
        credits: 1.5,
        grade: 99,
      },
    ],
    gpa: 0,

    gradeWanted: 100,
    view: 'mp',

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

  average(arr) {
    return arr.reduce((a, b) => a + b, 0)/arr.length;
  }

  handleViewChange = view => {
    this.setState({ view })
  }

  handleWantedChange = gradeWanted => {
    this.setState({ gradeWanted })
  }

  handleMPClassChange = () => {
    console.log("MP class changed. Nothing happened (for now).")
  }

  calculateMPGrade = () => {
    this.removeDiff()
    let { mpData, gradeWanted } = this.state;
    gradeWanted -= .5;
    console.log(gradeWanted)
    let diff_entry = mpData.filter(x => x['key'] === 'diff')

    let pointsEarned = mpData.reduce((total, item) => total + item['pointsEarned'], 0);
    let pointsPossible = mpData.reduce((total, item) => total + item['pointsPossible'], 0);
    let diff = 0;

    if ((pointsEarned/pointsPossible)*100 >= gradeWanted){
      message.success('You already have your desired grade :)');
      return '';
    }

    while ((pointsEarned/pointsPossible)*100 < gradeWanted){
      pointsEarned++;
      pointsPossible++;
      diff += 1
      if (diff >= 100){
        let percentage = ((pointsEarned/pointsPossible)*100).toPrecision(3);
        message.error(`Got to ${percentage}% with 100 points.`)
        break
      }
    }

    if (diff_entry.length > 0) {
      mpData[0] = {
        key: 'diff',
        assignment: `Points needed to get ${gradeWanted}`,
        pointsEarned: diff,
        pointsPossible: diff,
      }
    } else {
      mpData.unshift({
        key: 'diff',
        assignment: `Points needed to get ${gradeWanted}`,
        pointsEarned: diff,
        pointsPossible: diff,
      })
    }
    this.setState({ mpData })
  }

  updateGPA = () => {
    let gpa = this.calculateGPA();
    this.setState({ gpa });
  }

  calculateGPA = () => {
    let { gpaData, weightDict, percentToGPA } = this.state;

    let totalCredits = 0;
    let totalPoints = 0;

    for(let i=0; i<gpaData.length; i++){
      let { grade, credits, weight } = gpaData[i];
        weight = weightDict[weight];
        for(let [key, value] of Object.entries(percentToGPA)){
          key = parseInt(key)
          if (grade <= key){
            grade = value;
            if (key > 84){
              grade += weight;
            }
            break;
          }
        }
        grade *= credits;
        totalPoints += grade;
        totalCredits += credits;
    }
    let gpa = (totalPoints/totalCredits).toPrecision(3);
    return gpa;
  }

  removeDiff = () => {
    let { mpData } = this.state;
    mpData = mpData.filter(arr => arr.key !== 'diff')
    this.setState({ mpData })
  }

  handleRadioClick = value => {
    console.log(value)
    this.setState({ gradeWanted: value })
  }

  render() {
    let { view, mpData, mpColumns, gpaData, gpaColumns } = this.state;
    let pointsEarned = mpData.reduce((total, item) => total + item['pointsEarned'], 0);
    let pointsPossible = mpData.reduce((total, item) => total + item['pointsPossible'], 0);
    let percentage = (pointsEarned/pointsPossible)*100;
    let gpa = this.calculateGPA();

    let data, columns, calculate, output;
    switch (view){
      case 'mp':
        data = mpData;
        columns = mpColumns;
        calculate = this.calculateMPGrade;
        output = (
          <React.Fragment>
            <div>
              <Input
                readOnly
                style={{ display:'inlineBlock', width: '75%' }}
                value={ `Total Points:  ${pointsEarned} / ${pointsPossible}` }
              />
              <GradeTags percentage={ percentage } />
            </div>
            <div style={{ paddingTop: "3%" }}>
              <span style={{ paddingRight: "5%" }}>I want</span>
              <InputNumber
                formatter={value => `${value}%`}
                value={this.state.gradeWanted}
                max={100}
                min={0}
                parser={string => string.replace(/[^\d\.]+/g, '')}
                onChange={gradeWanted => this.handleWantedChange(gradeWanted) }
              />
              <Button
                style={{ float: "right" }}
                type="primary"
                onClick={ calculate }>Calculate</Button>
              <Button
                style={{ float: "right" }}
                type="secondary"
                onClick={ this.removeDiff }>Clear</Button>
            </div>
            <PercentSelectors handleClick={this.handleRadioClick} />
          </React.Fragment>
        )
        break;

      case 'gpa':
        data = gpaData;
        columns = gpaColumns;
        calculate = this.calculateGPA;
        output =  <span style={{ fontSize: '3em' }}>{ gpa }</span>
        break;

      default:
        data = mpData;
        columns = mpColumns;
        calculate = this.calculateMPGrade;
        break;
    }
    console.log(data)
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
          extra={
            <Select defaultValue="AP Calculus II" style={{ width: 140 }} onChange={this.handleMPClassChange}>
              <Option value="class1">Honors Calculus I</Option>
              <Option value="class2">AP U.S. History</Option>
              <Option value="class3">You're MOm</Option>
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

        <Table
          style={{
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          columns={ columns }
          pagination={ false }
          dataSource={ data }
        />
      </div>
    )
  };
}

export default CardWithTable;
