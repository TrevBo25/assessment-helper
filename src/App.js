import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  constructor(){
    super()
    this.state = {
      test: ''
    }
  }

  componentDidMount(){
    axios.get('/api/test')
      .then( response => {
        this.setState({test:response.data})
      })
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.test}</h1>
      </div>
    );
  }
}

export default App;
