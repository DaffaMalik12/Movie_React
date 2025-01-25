import { useEffect, useState } from "react";
import { getTVList, searchTV } from "../api";
import { Link } from "react-router-dom";

const App = () => {
  const [popularTV, setPopularTV] = useState([]);
  const [LightMode, setLightMode] = useState(false);

  useEffect(() => {
    getTVList().then((result) => {
      setPopularTV(result || []);
    });
  }, []);

  const PopularTVList = () => {
    if (!popularTV.length) {
      return (
        <div className="text-center text-gray-500">
          Data film tidak tersedia.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
        {popularTV.map((TV) => (
          <Link to={`/tv/${TV.id}`} key={TV.id}>
            <div className="movie-card bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-lg">
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${
                    TV.poster_path
                  }`}
                  alt={TV.name}
                  className="movie-image w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="movie-title text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {TV.name}
                </h2>
                <p className="movie-date text-sm text-gray-500 dark:text-gray-400">
                  {TV.first_air_date}
                </p>
                <p className="movie-rate text-sm font-bold text-yellow-500">
                  ⭐ {TV.vote_average}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };
  const search = async (q) => {
    if (q.length > 3) {
      try {
        const query = await searchTV(q);
        setPopularTV(query.results || []);
      } catch (error) {
        console.error("Error in search:", error);
      }
    }
  };

  return (
    <>
      <div
        className={`App ${
          LightMode ? "bg-gray-50" : "dark bg-gray-900"
        } min-h-screen`}
      >
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/">HOME</Link>
                </li>
                <li>
                  <Link to="/tv">TV List</Link>
                </li>
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">TV React</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/tv">TV LIST</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
              onClick={() => setLightMode(!LightMode)}
            >
              {LightMode ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 py-4">
          <div className="container mx-auto px-4">
            <input
              type="text"
              placeholder="Cari film kesayangan..."
              className="TV-search w-full max-w-lg h-14 p-4 text-lg rounded-md border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={({ target }) => search(target.value)}
            />
          </div>
        </div>
        <main className="container mx-auto px-4 py-8">
          <PopularTVList />
        </main>
        <footer className="bg-gray-800 text-gray-400 py-6">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              &copy; 2025 Layar Warna 21. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
