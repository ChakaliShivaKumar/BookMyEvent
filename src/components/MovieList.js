import React from 'react';
import Movie from './Movie';
import '../assets/styles/MovieList.css';

import poster1 from '../assets/images/poster1.jpg';
import poster2 from '../assets/images/poster2.jpg';
import poster3 from '../assets/images/poster3.jpg';
import poster4 from '../assets/images/poster4.jpg';
import poster5 from '../assets/images/poster5.jpg';

function MovieList({ searchTerm }) { 
  const movies = [
    {
      id: 1,
      poster: poster1,
      title: 'Hindustani 2',
      description: 'A gripping action-drama with thrilling moments.',
      rating: 5.7,
      votes: '3.9K',
      genre: 'Action/Drama/Thriller'
    },
    {
      id: 2,
      poster: poster2,
      title: 'Kalki 2898 AD',
      description: 'A sci-fi thriller set in the future.',
      rating: 8.7,
      votes: '630.2K',
      genre: 'Action/Sci-Fi/Thriller'
    },
    {
      id: 3,
      poster: poster3,
      title: 'Deadpool & Wolverine',
      description: 'Action-packed adventure with comedic twists.',
      rating: 8.9,
      votes: '268.9K',
      genre: 'Action/Adventure/Comedy'
    },
    {
      id: 4,
      poster: poster4,
      title: 'Sarfira',
      description: 'A biographical drama of a brave soul.',
      rating: 8.9,
      votes: '7.5K',
      genre: 'Biography/Drama'
    },
    {
      id: 5,
      poster: poster5,
      title: 'Kill',
      description: 'An intense action-thriller that keeps you on edge.',
      rating: 9.0,
      votes: '24.7K',
      genre: 'Action/Thriller'
    },
  ];

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  ); 

  return (
    <div className="flex flex-col bg-slate-700 justify-center my-24 px-4 md:px-8">
  {/* Movie List */}
  <div className="movie-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 m-2">
    {filteredMovies.map((movie, index) => (
      <Movie
        key={index}
        id={movie.id}
        poster={movie.poster}
        title={movie.title}
        rating={movie.rating}
        votes={movie.votes}
        genre={movie.genre}
      />
    ))}
  </div>
</div>
  );
}

export default MovieList;
