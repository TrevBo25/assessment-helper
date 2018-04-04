import React, {Component} from 'react';
import axios from 'axios';


export default class AddStudentModal extends Component {
  constructor(){
    super()
    this.state = {
      term: '',
      results: []
    }
  }

  componentDidUpdate(){
    console.log(this.state.term)
    axios.get(`/api/search?term=${this.state.term}`)
      .then(response => {
        console.log(response.data)
        this.setState(state => ({results:response.data}))
      })
  }

  render(){
    return(
      <div>
        <input onChange={e => this.setState({term: e.target.value})} placeholder="Please enter the students username" value={this.state.term} />
        <ul>
          {this.state.results.map(e => (<li onClick={() => this.props.submit(e)}>{e.username}</li>))}
        </ul>
      </div>
    )
  }
}