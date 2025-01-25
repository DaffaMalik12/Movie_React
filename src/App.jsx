import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TVMovieList from "./pages/TVMovieList";
import TVDetail from "./pages/TVDetail";
import MovieDetail from "./pages/MovieDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv" element={<TVMovieList />} />
        <Route path="/tv/:id" element={<TVDetail />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
