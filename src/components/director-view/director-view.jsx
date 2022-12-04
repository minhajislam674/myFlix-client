import React from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export function DirectorView({ director, movies, onBackClick })   {

       return (
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col>
              <h1> {director.Name}</h1>
              <p> {director.Bio}</p>
              <p> Born: {director.BirthYear}</p>
              <Button className="mb-5" variant="outline-primary" onClick={()=> {onBackClick()}}>Back</Button>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
                <h4 >Other movies by {director.Name}</h4>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            {movies.map((m) => (
              <Col xs={12} md={6} lg={4} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))}
          </Row>

          </Container>
        );
    }

