import React, {Component} from 'react';
//import { Route, BrowseRouter } from 'react-router-dom';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
//import {Header} from './components/header'
//import Footer from './components/footer';
import MovieForm from './components/movie-form';
import {withCookies} from 'react-cookie';

var FontAwesome = require('react-fontawesome');

class App extends Component {

  state = {
    movies : [],
    selectedMovie: null,
    editedMovie: null,
    token: this.props.cookies.get('mr-token')

  }

  
  componentDidMount(){
    if(this.state.token){
        //fetch data
          fetch(`${process.env.REACT_APP_API_URL}/api/movies/`,{
            method : 'GET',
            headers: {
              'Authorization' : `token ${this.state.token}`
            }
          }).then(resp=> resp.json())
          .then(res=> this.setState({movies:res}))
          .catch(error=>console.log(error))
    
  }
    else{
      window.location.href= "/";
    }

    
}

  loadMovie = movie =>{
    //console.log(movie);
    this.setState({selectedMovie:movie, editedMovie:null});
  }
  movieDeleted = selMovie =>{
    //console.log(movie);
    const movies = this.state.movies.filter(movie => movie.id !== selMovie.id);
    this.setState({movies:movies, selectedMovie: null})
  }
  editClicked = selMovie =>{
    //console.log(movie);
    this.setState({editedMovie:selMovie});
  }
  newMovie = () =>{
    //console.log(movie);
    this.setState({editedMovie:{title:'',description: ''}});
  }
  cancelForm = () =>{
    //console.log(movie);
    this.setState({editedMovie:null});
  }
  addMovie =movie =>{
    //console.log(movie);
    this.setState({movies:[...this.state.movies, movie]});
  }
  render() {
    return (
      <div className="App">
        <h1>
        <FontAwesome name="film"/>
        <span>Movie Rater</span></h1>
          <div className="layout">
          
            <MovieList movies={this.state.movies} movieClicked={this.loadMovie} token={this.state.token}
            movieDeleted={this.movieDeleted} editClicked={this.editClicked} newMovie={this.newMovie} />
            <div>
              {!this.state.editedMovie ? 
                <MovieDetails movie={this.state.selectedMovie} token={this.state.token} updateMovie={this.loadMovie}/>
              : <MovieForm movie={this.state.editedMovie} token={this.state.token} cancelForm={this.cancelForm} 
              newMovie={this.addMovie} editedMovie={this.loadMovie}/>
              }
            
            
            </div>
          </div>
          
      </div>
      
    );
  }
}

export default withCookies(App);
