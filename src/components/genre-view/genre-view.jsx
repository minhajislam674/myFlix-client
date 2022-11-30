import React from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';

export class GenreView extends React.Component {

    render() {
       const {genre, onBackClick} = this.props;

       return (
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col>
            <h1> {genre.Name}</h1>
            <p> {genre.Description}</p>
            <Button variant="outline-primary" onClick={()=> {onBackClick()}}>Back</Button>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={12}>
              <h4 >Other {genre.Name} movies</h4>
            </Col>
            <Col>
            
            </Col>
          </Row>
          </Container>
        );
    }
}
