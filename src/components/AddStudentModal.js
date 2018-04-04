import React, {Component} from 'react';
import axios from 'axios';


export default class AddStudentModal extends Component {
  constructor(){
    super()
    this.state = {
      term: '',
      results: []
    }

    this.doSearch = this.doSearch.bind(this)
  }

  doSearch(){
    if(this.state.term){
      axios.get(`/api/search?term=${this.state.term}`)
        .then(response => {
          console.log(response.data)
          this.setState(state => ({results:response.data}))
        })
    }
  }

  render(){
    var display = this.state.results.filter((e, i) => i < 5 && this.state.term && e.username[0].toLowerCase() === this.state.term[0].toLowerCase() && e.username.toLowerCase().includes(this.state.term.toLowerCase()) ? true : false)

    return(
      <div>
        <input onChange={e => this.setState({term: e.target.value}, this.doSearch())} placeholder="Please enter the students username" value={this.state.term} />
        <ul>
          {display.map(e => (<li onClick={() => this.props.submit(e)}>{e.username}</li>))}
        </ul>
      </div>
    )
  }
}