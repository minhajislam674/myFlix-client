import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
export class MovieView extends React.Component {

    render() {
       const {movie, onBackClick} = this.props;

       return (
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col md>
                <Image src={movie.ImagePath} crossOrigin="cross-origin" fluid/> 
            </Col>
            <Col md>
                <Card>
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    
                    <Card.Subtitle className="mb-2 text-muted">Plot: </Card.Subtitle>
                    <Card.Text>{movie.Description}</Card.Text>

                    <Card.Subtitle className="mb-2 text-muted">Genre: 
                      <Link to={`/genres/${movie.Genre.Name}`}>
                      <a>{movie.Genre.Name}</a>
                      </Link>
                    </Card.Subtitle>

                    <Card.Subtitle className="mb-2 text-muted">Director:
                      <Link to={`/directors/${movie.Director.Name}`}>
                      <a>{movie.Director.Name}</a>
                      </Link>
                    </Card.Subtitle>

                    <Button onClick={()=> {onBackClick()}}>Back</Button>

                </Card.Body>
                </Card>
            </Col>
          </Row>
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