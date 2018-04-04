const axios = require('axios');

module.exports = {
  getInfo: (req, res) => {
    axios.get("http://localhost:3001/students")
      .then(response => {
        res.status(200).json({students: response.data})
      })

    // function getAssessments() {
    //   return axios.get("http://localhost:3001/assessments")
    // } 
    
    // function getStudents() {
    //   return axios.get("http://localhost:3001/students")
    // }
  
    // axios.all([getAssessments(), getStudents()])
    //   .then(axios.spread((assessments, students) => {
    //     console.log(assessments.data)
    //     console.log(students.data)
    //     res.status(200).json({assessments: assessments.data, students: students.data})
    //   }))
  },
  
  addStudent: (req, res) => {
    console.log('student', req.body)
    axios.post('http://localhost:3001/students', req.body, {headers: {'Content-Type': 'application/json'}})
      .then(response => {
        console.log("hit")
        res.status(200).send("hello")
      })
  }

}