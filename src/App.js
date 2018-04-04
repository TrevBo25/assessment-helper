import React, { Component } from 'react';
import axios from 'axios';
import Student from './components/Student';
import Assessment from './components/Assessment';
import AddStudentSearch from './components/AddStudentSearch';

import './styles/App.css'

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

    function getStudents() {
      return axios.get('/api/getInfo')
    }

    function getAssessments() {
      return axios.get('/api/projects')
    }
    
    axios.all([getStudents(), getAssessments()])
      .then(axios.spread((students, assessments) => {
        console.log(assessments.data);
        console.log(students.data)
        this.setState(state => ({assessments: assessments.data.assessments, students: students.data.students}))
      }))

     // axios.all([getAssessments(), getStudents()])
    //   .then(axios.spread((assessments, students) => {
    //     console.log(assessments.data)
    //     console.log(students.data)
    //     res.status(200).json({assessments: assessments.data, students: students.data})
    //   }))
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
      <div className="outterApp">
        <div className="topHolder">
          <div className="topNameHolder" >
            <h2 className="topTitle">Selected Assessment</h2>
            {this.state.selectedAssessment.name ? (<h3 className="topSelected">{this.state.selectedAssessment.name}</h3>) : null}
          </div>
          <div className="buttonHolder">
            {this.state.selectedStudent.name && this.state.selectedAssessment.name ? (<button onClick={this.addStudentToAssessment} className="addButton" >ADD STUDENT TO ASSESSMENT</button>) : null}
          </div>
          <div className="topNameHolder" >
            <h2 className="topTitle">Selected Student</h2>
            {this.state.selectedStudent.name ? (<h3 className="topSelected">{this.state.selectedStudent.name}</h3>) : null}
          </div>
        </div>
        <div className="listsHolder">
          <div className="holderHolder">
            <h3 className="topTitle">Assessments</h3>
            <ul style={{"marginTop": "10px"}}>
              {this.state.assessments.length > 1 ? this.state.assessments.sort().reverse().map(e => (<Assessment assessment={e} key={e.id} select={this.selectAssessment} />)) : <p>loading...</p>}
            </ul>
          </div>
          <div className="holderHolder">
            <h3 className="topTitle">Students</h3> 
            <ul style={{"marginTop": "10px"}}>
              {this.state.students.length > 1 ? this.state.students.map(e => (<Student student={e} key={e.id} select={this.selectStudent} />)) : (this.state.assessments.length > 1 ? <p>please add some students</p> : <p>loading...</p>)}
            </ul>
            {!this.state.showAddStudent ? <div onClick={() => this.toggleModal(true)} className="coolButton"><p>+</p></div> : null}
            {this.state.showAddStudent ? <AddStudentSearch submit={this.addStudentToDB} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
