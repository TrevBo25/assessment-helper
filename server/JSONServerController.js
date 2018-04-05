const axios = require('axios');

module.exports = {
  getInfo: (req, res) => {
    axios.get("http://localhost:3001/students")
      .then(response => {
        res.status(200).json({students: response.data})
      })
      .catch(err => console.log('err', err))
  },
  
  addStudent: (req, res) => {
    axios.post('http://localhost:3001/students', req.body, {headers: {'Content-Type': 'application/json'}})
      .then(response => {
        res.status(200).send("hello")
      })
      .catch(err => console.log('err', err))
  }

}