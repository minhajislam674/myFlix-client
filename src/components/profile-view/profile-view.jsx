import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Figure } from "react-bootstrap";
import { UserUpdate } from "./update-user";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      FavoriteMovies: [],
      movies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }


  getUser = () => {
    const token = localStorage.getItem("token");
    const Username = localStorage.getItem("user");
    axios
      .get(`https://api-thisismyflix.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  onRemoveFavorite = (movie) => {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(
        `https://api-thisismyflix.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  render() {
    const { movies, onBackClick } = this.props;
    const { FavoriteMovies, Username, Email } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <Card className="user-profile mt-4">
              <Card.Header>USER PROFILE</Card.Header>
              <Card.Body>
                <div>
                  <p>Username: {Username}</p>
                  <p>Email: {Email}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="user-profile mt-4">
              <Card.Header>EDIT PROFILE</Card.Header>
              <Card.Body>
                <div>
                    <UserUpdate/>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="favorite-movies mt-4">
          <Card.Header>FAVORITE MOVIES</Card.Header>
          <Card.Body >
            <Row className="text-align-center">
              {FavoriteMovies.length === 0 && (
                <Col>
                    <p>Your list is currently empty.</p>
                </Col>
              )}
              {FavoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (
                    movie._id ===
                    FavoriteMovies.find((fav) => fav === movie._id)
                  ) {
                    return (
                      <Col key={movie._id} md={4}>
                        <Figure>
                          <Link to={`/movies/${movie._id}`}>
                            <Figure.Image
                              className="card-img"
                              src={movie.ImagePath}
                              crossOrigin="anonymous"
                              alt={movie.Title}
                            />
                            <Figure.Caption className="text-dark">{movie.Title}</Figure.Caption>
                          </Link>
                          <Button
                            className="mt-3"
                            value={movie._id}
                            variant="secondary"
                            onClick={() => this.onRemoveFavorite(movie)}>
                            Remove
                          </Button>
                        </Figure>
                      </Col>
                    );
                  }
                })}
            </Row>
            <div>
              <Button variant="outline-primary" onClick={()=> {onBackClick()}}>Back</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  User: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.array,
  }),
};