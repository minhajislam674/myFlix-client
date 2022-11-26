import React from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';

export class DirectorView extends React.Component {

    render() {
       const {director, onBackClick} = this.props;

       return (
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col>
            <h1> {director.Name}</h1>
            <p> {director.Bio}</p>
            <p> Born: {director.BirthYear}</p>
            <Button variant="outline-primary" onClick={()=> {onBackClick()}}>Back</Button>
            
            </Col>
          </Row>
          </Container>
        );
    }
}
