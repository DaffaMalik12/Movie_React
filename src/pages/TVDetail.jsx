import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TVDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [TV, setTV] = useState(null);

  useEffect(() => {
    const fetchTVDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_REACT_APP_APIKEY;
        const baseUrl = import.meta.env.VITE_REACT_APP_BASEURL;

        const response = await axios.get(
          `${baseUrl}/tv/${id}?api_key=${apiKey}`
        );
        setTV(response.data);
      } catch (error) {
        console.error("Error fetching TV details:", error);
      }
    };

    fetchTVDetails();
  }, [id]);

  if (!TV) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <img
          src={`${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${TV.poster_path}`}
          alt={TV.name}
          className="w-64 rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {TV.name}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            First Air Date: {TV.first_air_date}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Rating: ⭐ {TV.vote_average}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-4">
            {TV.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TVDetail;
