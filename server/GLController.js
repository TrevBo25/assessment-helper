const axios = require('axios');
const moment = require('moment');

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
    const {studentID, assessmentID} = req.body;
    console.log(moment().add(1, 'd').format('YYYY-MM-DD'))
    axios.post(`https://gitlab.com/api/v4/projects/${assessmentID}/members`, {user_id: studentID, access_level: 20, expires_at: moment().add(1, 'd').format('YYYY-MM-DD')}, {headers: {'Private-Token': process.env.GL_KEY}})
      .then(response => {
        console.log(response.data)
      })
      .catch(err => console.log('err', err))
  },

  getProjects: (req, res) => {
    axios.get(`https://gitlab.com/api/v4/groups/2487502/projects`, {headers: {'Private-Token': process.env.GL_KEY}})
      .then(response => {
        res.status(200).json({assessments: response.data})
      })
  }
}