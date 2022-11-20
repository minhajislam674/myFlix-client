import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export class MainView extends React.Component {

  constructor(){
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registeredUser: null
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

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }
  /* When a user successfully registers, this function updates the `user` property in state to that *particular user*/
  onRegistration(registeredUser) {
    this.setState({
      registeredUser
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

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
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



  render() {
    const {movies, selectedMovie, user, registeredUser} = this.state;

    //If the user was not registered, the RegistrationView is rendered. 
    if (!registeredUser) return <RegistrationView onRegistration={registeredUser => this.onRegistration(registeredUser)} />;

    //If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
    if (!user) return <LoginView 
      onLoggedIn={user => this.onLoggedIn(user)}/>;

    // Before the movies have been loaded
    if (movies.length ===0) return <div className="main-view"/>;
    
    return (
      <>
        <Row className="align-items-center">
          <Col style={{ display: "flex", marginBottom: "10px", justifyContent: "end" }}>
          <Button variant="outline-secondary" onClick={() => { this.onLoggedOut() }} >Logout</Button>
          </Col>
        </Row>

        <Row >
          {selectedMovie
            ? (
              <Col>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            )
            : movies.map(movie => ( 
              <Col>
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            ))
          }
        </Row>
      </>
    );
      }
    }