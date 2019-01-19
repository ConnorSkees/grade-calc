import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, InputNumber, Table, Divider, Card, Form, Tag, Select, Tooltip } from 'antd';
import GradeInput from './GradeInput'
import GradeTags from './GradeTags'
import AssignmentNameInput from './AssignmentNameInput'

const Option = Select.Option;

class CardWithTable extends Component {
  state = {
    data: [{'assignment': 'Dhmo Petition',
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
    columns: [{
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
                let thisData = this.state.data.filter(x => x.key === record.key)[0];

                let max = Math.max(record.pointsPossible, record.pointsEarned);
                if (value === undefined){
                  value = 0;
                } else if (value > max){
                  value = max;
                }

                thisData.pointsEarned = value;
                this.setState({ data: thisData&&this.state.data })
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
  };

    }
    console.log(sum);
    return sum;
  }

    let { data } = this.state;
  }

  }

  }

  render() {
    return (
      <div>
        <Card
          title="MP Grade Calculator"
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
            }}
        >
          {this.sumInput()}
        </Card>
        <Table
          style={{
            width: '100%'
          }}
          columns={ columns }
          pagination={ false }
          dataSource={ this.state.data }
        />
      </div>
    )
  };
}

export default CardWithTable;
