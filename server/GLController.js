const axios = require('axios');

module.exports = {
  search: (req, res) => {
    const {term} = req.query;
    axios.get(`https://gitlab.com/api/v4/users?search=${term}`, {headers: {'Private-Token': process.env.GL_KEY}})
      .then(response => {
        console.log(response.data)
        res.status(200).json(response.data)
      })
  },
  add: (req, res) => {
    console.log(req.body)
    const {studentID, assessmentID} = req.body;
    console.log(typeof studentID)
    console.log(typeof assessmentID)
    axios.post(`https://gitlab.com/api/v4/projects/${assessmentID}/members`, {user_id: studentID, access_level: 20}, {headers: {'Private-Token': process.env.GL_KEY}})
      .then(response => {
        console.log(response.data)
      })
      .catch(err => console.log('err', err))
  }
}