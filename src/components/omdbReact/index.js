import React from 'react'
import ReactDOM from 'react-dom'

let movies = require('../../../__test__/fixtures/omdb/posters.json')

const Search = (props) => (
  <div>
    <form>
      <input onSubmit={props.search} type="text" name="search" placeholder="Search movie min 3" onChange={props.handleInputChange}/>
      <button onClick={props.search}>Search</button>
    </form>
  </div>
)

const MovieItem = (props) => (
  <div>
    <p>{props.title}</p>
    <img src={props.poster}/>
  </div>
)

const MovieList = (props) => (
  <div>
    {props.movies.Search.map(el => 
      <MovieItem title={el.Title} poster={el.Poster}/>
    )}
  </div>
)

class Movie extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: movies,
      search: "",
      error: null
    }
  }

  handleInputChange = (e) => {
    let value = e.target.value
    this.setState({search: value})
  }

  fetchMovie = (search) => {
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=ee0200e`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        if (data.Response === 'False') {
          this.setState({
            error: "No Results"
          })
          return
        }
        this.setState({data})
      })
  }
  search = (e) => {
    e.preventDefault()
    let isValid = this.state.search.length > 3
    if (!isValid) {
      this.setState({
        error: "min 3 characters"
      })
      return
    }
    this.setState({error:null})
    this.fetchMovie(this.state.search)
  }

  render() {
    return (
      <div>
        <h1>OMDB Search</h1>
        <div style={{backgroundColor: "red"}}>
          <p>
            {this.state.error}
          </p>          
        </div>
        <p>Search: {this.state.search}</p>
        <Search search={this.search} handleInputChange={this.handleInputChange}/>
        <MovieList movies={this.state.data}/>
      </div>        
    )
  }
}

const App = () => (
  <div>
    <Movie/>
  </div>
)

ReactDOM.render(
  <App/>,
  document.getElementById('react-omdb')
)