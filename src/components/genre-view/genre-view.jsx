import React from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';

export class GenreView extends React.Component {

    render() {
       const {genre, onBackClick} = this.props;

       return (
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col>
            <h1> Genre View </h1>
            <Button onClick={()=> {onBackClick()}}>Back</Button>
            
            </Col>
          </Row>
          </Container>
        );
    }
}
