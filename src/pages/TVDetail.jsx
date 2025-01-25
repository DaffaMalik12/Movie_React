import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const TVDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [TV, setTV] = useState(null);
  const [similarTVs, setSimilarTVs] = useState([]);

  useEffect(() => {
    const fetchTVDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_REACT_APP_APIKEY;
        const baseUrl = import.meta.env.VITE_REACT_APP_BASEURL;

        // Fetch TV Details
        const tvResponse = await axios.get(
          `${baseUrl}/tv/${id}?api_key=${apiKey}`
        );
        setTV(tvResponse.data);

        // Fetch Similar TV Shows
        const similarResponse = await axios.get(
          `${baseUrl}/discover/tv?api_key=${apiKey}`
        );
        setSimilarTVs(similarResponse.data.results.slice(0, 12)); // Ambil 6 rekomendasi
      } catch (error) {
        console.error("Error fetching TV details:", error);
      }
    };

    fetchTVDetails();
  }, [id]);

  if (!TV) {
    return (
      <div className="text-3xl flex justify-center items-center">
        Loading
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="navbar mb-2 rounded-md bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">TV React</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">HOME</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="w-full lg:w-1/3">
            <img
              src={`${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${
                TV.poster_path
              }`}
              alt={TV.name}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Details */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-4xl font-bold">{TV.name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
              <span>⭐ {TV.vote_average}</span>
              <span>{TV.first_air_date}</span>
              <span>{TV.genres.map((genre) => genre.name).join(", ")}</span>
            </div>
            <p className="text-gray-300 mt-4">{TV.overview}</p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mt-6">
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
                Watch Trailer
              </button>
              <button className="text-gray-400 hover:text-white transition">
                Remind Me
              </button>
              <button className="text-gray-400 hover:text-white transition">
                Rate
              </button>
              <button className="text-gray-400 hover:text-white transition">
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Similar Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Rekomendasi Film Lain</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {similarTVs.map((show) => (
              <div
                key={show.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={`${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${
                    show.poster_path
                  }`}
                  alt={show.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-2">
                  <h3 className="text-sm font-bold truncate">{show.name}</h3>
                  <p className="movie-date text-sm mt-2 mb-2 text-gray-500 dark:text-gray-400">
                    {TV.first_air_date}
                  </p>
                  <p className="truncate movie-date text-sm mt-2 mb-2 text-gray-500 dark:text-gray-400">
                    {TV.overview}
                  </p>

                  <p className="text-xs text-gray-400">
                    ⭐ {show.vote_average}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVDetail;
