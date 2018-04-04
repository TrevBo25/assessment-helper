import axios from 'axios';

module.exports = {
  test: () => (axios.get('/api/test')),

}