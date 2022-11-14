import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        {
          _id: "635932bbfb472953a30232d5",
          Title: "The Terminal",
          Description: "An Eastern European tourist unexpectedly finds himself stranded in JFK airport, and must take up temporary residence there.",
          ImagePath: 'https://th.bing.com/th/id/R.0dd965bb40f7bc3fb36450b9d7941e1f?rik=9m9r%2fj%2f9W1qBsw&pid=ImgRaw&r=0'
      },
      {
          _id: "635932bbfb472953a30232d6",
          Title: "Taxi Driver",
          Description: "A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action.",
          ImagePath: "https://www.imdb.com/title/tt1853728/mediaviewer/rm958180352/"
      },
      {
        _id: "635932bafb472953a30232d1",
        Title: "Interstellar",
        Description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        ImagePath: "https://th.bing.com/th/id/OIP.bWg6aHv4BanhJUsw4Ysd5AHaJ9?pid=ImgDet&w=1310&h=1761&rs=1"
    }
      ],
      selectedMovie: null
    }
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const {movies, selectedMovie} = this.state;

    if (movies.length ===0) return <div className="main-view">The list is empty!</div>;
    
    return(
        <div className="main-view">
          {selectedMovie
            ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            :movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
      }
    }