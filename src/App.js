import React, { Component } from 'react';
import axios from 'axios';
import Student from './components/Student';
import Assessment from './components/Assessment';
import AddStudentModal from './components/AddStudentModal';

class App extends Component {
  constructor(){
    super()
    this.state = {
      assessments: [],
      students: [],
      selectedStudent: {},
      selectedAssessment: {},
      showAddStudent: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.addStudentToDB = this.addStudentToDB.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.selectAssessment = this.selectAssessment.bind(this);
    this.selectStudent = this.selectStudent.bind(this);
    this.addStudentToAssessment = this.addStudentToAssessment.bind(this);
  }

  componentDidMount(){
    this.getInfo()
  }

  getInfo(){
    axios.get('/api/getInfo')
      .then( response => {
        const {assessments, students} = response.data
        this.setState(state => ({assessments, students}))
      })
  }

  toggleModal(bool){
    this.setState(state => ({showAddStudent: bool}))
  }

  addStudentToDB(student){
    console.log('student', student)
    axios.post('/api/addStudent', student)
      .then(response => {
        console.log('hithit')
        this.toggleModal(false);
        this.getInfo();
      })
  }

  selectStudent(student){
    this.setState(state => ({selectedStudent: student}))
  }

  selectAssessment(assessment){
    this.setState(state => ({selectedAssessment: assessment}))
  }

  addStudentToAssessment(){
    axios.post('/api/add', {studentID: this.state.selectedStudent.id, assessmentID: this.state.selectedAssessment.id})
      .then(response => {
        console.log(response.data)
      })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <div>
        {!this.state.showAddStudent ? <button onClick={() => this.toggleModal(true)}>Click Me to Show</button> : null}
        {this.state.showAddStudent ? <AddStudentModal submit={this.addStudentToDB} /> : null}
        <br />
        {this.state.selectedStudent.name ? this.state.selectedStudent.name : null}
        <br />
        {this.state.selectedAssessment.name ? this.state.selectedAssessment.name : null}
        <br />
        <button onClick={this.addStudentToAssessment} > add the selected to the selected</button>
        </div>
        <div>
          <ul>
            {this.state.assessments.map(e => (<Assessment assessment={e} key={e.id} select={this.selectAssessment} />))}
          </ul>
          <ul>
            {this.state.students.map(e => (<Student student={e} key={e.id} select={this.selectStudent} />))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
