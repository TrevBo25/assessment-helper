import React, {Component} from 'react';
import axios from 'axios';
import '../styles/AddStudentSearch.css'


export default class AddStudentSearch extends Component {
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
          this.setState(state => ({results:response.data}))
        })
    }
  }

  render(){
    var display = this.state.results.filter((e, i) => i < 5 && this.state.term && e.username[0].toLowerCase() === this.state.term[0].toLowerCase() && e.username.toLowerCase().includes(this.state.term.toLowerCase()) ? true : false)

    return(
      <div className="outterSearch" >
        <ul className={display.length > 0 ? "searchBoxOut" : null}>
          {display.map(e => (<div onClick={() => this.props.submit(e)} className="searchBoxIn"><h3 className="searchName">{e.username}</h3></div>))}
        </ul>
        <input onChange={e => this.setState({term: e.target.value}, this.doSearch())} placeholder="Search by username" value={this.state.term} className="searchInput" />
      </div>
    )
  }
}