import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, InputNumber, Table, Card, Tag, Select, Button, Popover, Radio, message } from 'antd';
import GradeInput from './GradeInput'
import GradeTags from './GradeTags'
import AssignmentNameInput from './AssignmentNameInput'

const Option = Select.Option;
const RadioButton = Radio.Button;

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
          <GradeInput value={record.credits} min={.25} max={3} />
        )
      },
      {
        title: 'Grade',
        dataIndex: 'grade',
        key: 'grade',
        render: (text, record) => (
          <GradeInput value={record.grade} min={0} max={100} />
        )
      },
    ],
    gpaData: [
      {
        key: '1',
        className: 'AP Calculus II',
        weight: 'AP',
        credits: 1,
        grade: 55,
      },
      {
        key: '2',
        className: 'Honors Spanish IV',
        weight: 'honors',
        credits: 1,
        grade: 93,
      },
      {
        key: '3',
        className: 'CIS 105',
        weight: 'dualenrollment',
        credits: 1,
        grade: 87,
      },
      {
        key: '4',
        className: 'Freshman Biology',
        weight: 'regular',
        credits: 1.5,
        grade: 99,
      },
    ],
    gradeWanted: 100,
    aPercentages: [{key: 99, letter: "A+"}, {key: 95, letter: "A"}, {key: 93, letter: "A-"}],
    bPercentages: [{key: 91, letter: "B+"}, {key: 87, letter: "B"}, {key: 85, letter: "B-"}],
    cPercentages: [{key: 83, letter: "C+"}, {key: 77, letter: "C"}, {key: 75, letter: "C-"}],
    dPercentages: [{key: 73, letter: "D+"}, {key: 67, letter: "D"}, {key: 65, letter: "D-"}],
    fPercentages: [{key: 64, letter: "F"}],
    view: 'mp'
  };

  handleChange = view => {
    this.setState({ view })
  }

  handleWantedChange = gradeWanted => {
    this.setState({ gradeWanted })
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

    let initialPointsPossible = pointsPossible;

    if ((pointsEarned/pointsPossible)*100 >= gradeWanted){
      message.success('You already have your desired grade :)');
      return '';
    }

    while ((pointsEarned/pointsPossible)*100 < gradeWanted){
      pointsEarned++;
      pointsPossible++;
      diff += 1
      if (diff >= 100){
        message.error(`Unable to achieve desired grade (got to ${((pointsEarned/pointsPossible)*100).toPrecision(3)}%).`)
        console.log(`Grade not possible (got to ${(pointsEarned/pointsPossible)*100})`)
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

  removeDiff = () => {
    let { mpData } = this.state;
    mpData = mpData.filter(arr => arr.key !== 'diff')
    this.setState({ mpData })
  }

  handleRadioClick(value) {
    console.log(value)
    this.setState({ gradeWanted: value })
  }

  renderRadio(arr) {
    return (
      <RadioButton
        value={arr.key}
        onClick={() => this.handleRadioClick(arr.key)}
        key={arr.key} >{arr.key}%</RadioButton>
    )
  }

  render() {
    let { mpData } = this.state;
    let pointsEarned = mpData.reduce((total, item) => total + item['pointsEarned'], 0);
    let pointsPossible = mpData.reduce((total, item) => total + item['pointsPossible'], 0);
    let percentage = (pointsEarned/pointsPossible)*100;

    let aRadio = this.state.aPercentages.map(arr => this.renderRadio(arr))
    let bRadio = this.state.bPercentages.map(arr => this.renderRadio(arr))
    let cRadio = this.state.cPercentages.map(arr => this.renderRadio(arr))
    let dRadio = this.state.dPercentages.map(arr => this.renderRadio(arr))
    let fRadio = this.state.fPercentages.map(arr => this.renderRadio(arr))

    return (
      <div>
        <Card
          title={
            <Select defaultValue="mp" style={{ width: 140 }} onChange={this.handleChange}>
              <Option value="mp">MP Calc</Option>
              <Option value="gpa">GPA Calc</Option>
              <Option value="final">Final Calc</Option>
            </Select>
        }
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
              marginTop: '1%',
              marginBottom: '1%',
            }}
        >
          <div>
            <Input
              readOnly
              style={{ display:'inlineBlock', width: '75%' }}
              value={`Total Points:  ${pointsEarned} / ${pointsPossible}`}
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
              onClick={ this.calculateMPGrade }>Calculate</Button>
            <Button
              style={{ float: "right" }}
              type="secondary"
              onClick={ this.removeDiff }>Clear</Button>
          </div>
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
        </Card>
        <Table
          style={{
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          columns={ this.state.columns }
          pagination={ false }
          dataSource={ this.state.mpData }
        />
      </div>
    )
  };
}

export default CardWithTable;
