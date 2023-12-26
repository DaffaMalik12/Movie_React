  import './App.css'
  import { useEffect, useState } from 'react'
  import {getMovieList, searchMovie} from './api'


  const App = () => {
    const [popularMovie, setPopularMovie] = useState([])

    useEffect(() => {
      getMovieList().then((result) => {
        setPopularMovie(result); // Menyertakan nilai default array kosong jika result undefined
      });
    }, []);

    const PopularMovieList = () => {
      if (!popularMovie) {
        return <div>Data film tidak tersedia.</div>;
      }
    
      return popularMovie.map((movie, i) => {
        return (
          <div className="movie-wrapper mt-5" key={i}>
            <div className="movie-title text-center">{movie.title}</div>
            <img src={`${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt="" className='movie-image' />
            <div className="movie-date text-center">{movie.release_date}</div>
            <div className="movie-rate text-center">{movie.vote_average}</div>
          </div>
        );
      });
    };
    
    
    const search = async (q) => {
      if (q.length > 3) {
        try {
          const query = await searchMovie(q);
          setPopularMovie(query.results || []);
        } catch (error) {
          // Handle the error if needed
          console.error("Error in search:", error);
        }
      }
    };
    

    
    return (
      <>
        <div className='App'>
        <header className='App-header'>
        <h1 className='text-2xl font-bold '>MOVIE REACT</h1>
            <input type='text' placeholder='cari film kesayangan...' className='movie-search h-16 text-xl mb-4 mt-4 p-4 font-bold text-black' 
            onChange={({ target }) => search(target.value)}  />
            <div className="movie-container">
              <PopularMovieList />
            </div>
          </header>
        </div>
      </>
    )
  }

  export default App
