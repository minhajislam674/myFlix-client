import React from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import './movie-view.scss'
import CardHeader from "react-bootstrap/esm/CardHeader";
export class MovieView extends React.Component {

    render() {
      const {movie, onBackClick} = this.props;

      
      const handleAddFavorite = (movieId) => {
        let user = localStorage.getItem('user')
        let token = localStorage.getItem('token');
          /* Send a request to the server to add favorite (delete) */
          axios.post(`https://myflix-movies.onrender.com/users/${user}/movies/${movieId}`,{},{
            headers: { Authorization: `Bearer ${token}` }
          })
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        }



       return (
        <Container>
          <Card className="mt-4 mx-auto">
            <Row className="d-flex align-items-center justify-content-center">
              <Col md>
                <CardHeader>
                  <Card.Img src={movie.ImagePath} crossOrigin="cross-origin" /> 
                  </CardHeader>
              </Col>
              <Col md>
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>                
                    <Card.Subtitle className="mb-2 text-muted">Plot:</Card.Subtitle>
                    <Card.Text>{movie.Description}</Card.Text>

                    <Card.Subtitle className="mb-2 text-muted">
                        <span>Genre: </span>
                      <Link to={`/genres/${movie.Genre.Name}`}>
                        <p>{movie.Genre.Name}</p>
                      </Link>
                    </Card.Subtitle>

                    <Card.Subtitle className="mb-2 text-muted">
                      <span>Director: </span>
                      <Link to={`/directors/${movie.Director.Name}`}>
                        <p>{movie.Director.Name}</p>
                      </Link>
                    </Card.Subtitle>

                </Card.Body>

                    <Button 
                        onClick={() => handleAddFavorite(movie._id)}> Add to favorites
                    </Button>
                    <Button variant="outline-primary ml-3"
                      onClick={()=> {onBackClick()}}>Back
                    </Button>

              </Col>
            </Row>
            </Card>
          </Container>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  };  