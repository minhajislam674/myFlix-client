import React from 'react';

export class MovieCard extends React.Component {
  render() {
    const {movieData} = this.props;
    return <div className="movie-card">{movieData.Title}</div>;
  }
}
