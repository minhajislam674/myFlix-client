import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';



import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export class MainView extends React.Component {

  constructor(){
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token'); //get the value of the token from localStorage
    // If the access token is present, it means the user is already logged in and you we call the getMovies method, which makes a GET request to the “movies” endpoint.
     if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
     }
  }

  getMovies (token) {
    axios.get('https://api-thisismyflix.herokuapp.com/movies/', {
      headers: { Authorization: `Bearer ${token}`} //passing bearer authorization in the header of our HTTP requests
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      }); 
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username //The user’s username (authData.user.Username) is saved in the user state.
    });
    //The auth information received from the handleSubmit method—the token and the user—is saved in localStorage.
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token); //this.getMovies(authData) is called and gets the movies from your API once the user is logged in. 
  }

  render() {
    const {movies, user} = this.state;
    return (
      <Router>
        <Row className="main-view justify-content-md-center">

            <Route exact path="/" render = {() => {
            if (!user) return (
            <Col> 
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>)

            if (movies.length === 0) return <div className="main-view"/>;
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />

            <Route path="/movies/:movieId" render={({match, history}) => {
              if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
            }} />

            <Route path="/directors/:name" render={({match, history}) => {
              if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={ ()=> history.goBack()} />
              </Col>
            }} />

            <Route path="/genres/:name" render={({match, history}) => {
              if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={ ()=> history.goBack()} />
              </Col>
            }} />

        </Row>
      </Router>
    );
  }
}