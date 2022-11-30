import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import './main-list.scss'

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()))
  }

  if (!movies) return <div className="main-view"/>

 return <>
        <Col md={12} style={{ margin: '2em' }}>
                    <VisibilityFilterInput visibilityFilter={visibilityFilter} />
                </Col>
                {filteredMovies.map(m => (
                    <Col xs={12} md={6} lg={3} className="main-grid-item" key={m._id}>
                    <MovieCard  movie={m} />
                    </Col>
                ))};
 </>
}

//Connect MoviesList to the store.
//mapStateToProps function transforms the store into props that the MoviesList component will use. 
export default connect(mapStateToProps, null)(MoviesList);
