import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title , category }) => {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);
  const cardsRef = useRef(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGJlMDg0MGZmNjkxMThiODYwOTFkN2NmNGNmNjMwMyIsIm5iZiI6MTc2MDY4NzE1OC42OTgsInN1YiI6IjY4ZjFmNDM2YTZhZjM5OWZkZTc3ZGEwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iQWauQcGFoA7znG9PHb-kcBYNuZtA8Q_ML4z1WTNoEs",
    },
  };

  const handleWheel = (event) => {
    if (!cardsRef.current) return;
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await fetch(
  `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`,
  options
);

        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        if (mounted) setApiData(data.results || []);
      } catch (err) {
        console.error("fetch error:", err);
        if (mounted) setError(err.message);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>

      {error && <div className="cards-error">Error: {error}</div>}

      <div
        className="card-list"
        ref={cardsRef}
        onWheel={handleWheel} 
      >
        {apiData.length === 0 && !error && (
          <div className="cards-loading">Loading...</div>
        )}

        {apiData.map((card, index) => {
          const imgPath =
            card?.backdrop_path || card?.poster_path || "/placeholder.png";
          const titleText = card?.original_title || card?.title || "Untitled";
          return (
            <Link to={`/player/${card.id}`} className="card" key={card?.id ?? index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${imgPath}`}
                alt={titleText}
                className="card-img"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
              <p className="card-title">{titleText}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
