import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import './movie-card.scss'
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const {movie} = this.props;

  return (
    <Container>
      <Row >
        <Col>
          <Card className='movie-card shadow' border="light" style={{ textAlign: 'center' }}>
            <Col> 
            <Card.Img  variant='top' src={movie.ImagePath} className='poster' crossOrigin="cross-origin"/> 
            </Col>

          <Card.Body>
            <Card.Title >{movie.Title}</Card.Title>

            <Link to = {`/movies/${movie._id}`}> 
              <Button>Open</Button>
            </Link>
          </Card.Body>
          </Card>
        </Col>  
      </Row>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};