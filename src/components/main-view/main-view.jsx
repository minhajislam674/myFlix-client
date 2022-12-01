import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import './main-view.scss'
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { Menubar } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


class MainView extends React.Component {

  constructor(){
    super();

  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token'); //get the value of the token from localStorage
    // If the access token is present, it means the user is already logged in and you we call the getMovies method, which makes a GET request to the “movies” endpoint.
     if (accessToken !== null) {
      this.getMovies(accessToken);
      this.getUser(accessToken);
     }
  }
    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    onLoggedIn(authData) {
      console.log(authData);
      this.props.setUser(authData.user);
  
      //The auth information received from the handleSubmit method—the token and the user—is saved in localStorage.
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token); //this.getMovies(authData) is called and gets the movies from your API once the user is logged in. 
    }

  getMovies (token) {
    axios.get('https://myflix-movies.onrender.com/movies/', {
      headers: { Authorization: `Bearer ${token}`} //passing bearer authorization in the header of our HTTP requests
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getUser = () => {
    const token = localStorage.getItem("token");
    const Username = localStorage.getItem("user");
    axios
      .get(`https://myflix-movies.onrender.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleFavorite = (movieId, operation) => {
    const {favoriteMovies } = this.state;
    let user = localStorage.getItem('user')
    let token = localStorage.getItem('token');
    if (token !== null && user !== null) {
      // Add MovieID to Favorites (local state & webserver)
      if (operation === "add") {
        this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
        axios
          .put(
            `https://myflix-movies.onrender.com/users/${user}/movies/${movieId}`,
            {},
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((response) => {
            console.log(`Movie added to ${user}`);
            alert(`Movie added successfully`);
          })
          .catch(function (error) {
            console.log(error);
          });
  
        // Remove MovieID from Favorites (local state & webserver)
      } else if (operation === "remove") {
        this.setState({
          favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
        });
        axios
          .delete(
            `https://myflix-movies.onrender.com/users/${user}/movies/${movieId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  

  render() {
    let { movies, user } = this.props;
    const username = localStorage.getItem("user");
    return (
      <Router>
        <Menubar user={username}/>

        <Row className="main-view justify-content-md-center mt-10">

            <Route exact path="/" render = {() => {
            if (!username) return (
            <Col> 
              <LoginView onLoggedIn={username => this.onLoggedIn(username)} />
            </Col>)

            if (movies.length === 0) return <div className="main-view"/>;
              return <MoviesList movies={movies} />
            }} />

            <Route path="/register" render={() => {
              if (username) return <Redirect to="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />

            <Route path="/movies/:movieId" render={({match, history}) => {
              if (!username) return <Col>
              <LoginView onLoggedIn={username => this.onLoggedIn(username)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />
              return <Col>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
            }} />

            <Route path="/directors/:name" render={({match, history}) => {
              if (!username) return <Col>
              <LoginView onLoggedIn={username => this.onLoggedIn(username)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />
              return <Col>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={ ()=> history.goBack()} />
              </Col>
            }} />

            <Route path="/genres/:name" render={({match, history}) => {
              if (!username) return <Col>
              <LoginView onLoggedIn={username => this.onLoggedIn(username)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />
              return <Col>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={ ()=> history.goBack()} />
              </Col>
            }} />

            <Route path={`/users/${username}`} render={({history}) => {
            if (!username) return <Redirect to="/" />
            return <Col>
            <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()}/>
            </Col>
            }} />

        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies,
    user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser } ) (MainView);