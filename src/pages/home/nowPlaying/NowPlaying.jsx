// import React, { useState } from 'react';
// import Carousel from '../../../components/carousel/Carousel';
// import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
// import SwitchTabs from '../../../components/switchTab/SwitchTabs';
// import useFetch from '../../../hooks/useFetch';

// const NowPlaying = () => {
//   const [mediaType, setMediaType] = useState("movie");

//   const { data, loading } = useFetch(`/${mediaType}/now_playing`);

//   const onTabChange = (tab) => {
//     setMediaType(tab === "Movies" ? "movie" : "tv");
//   };

//   return (
//     <div className="carouselSection">
//       <ContentWrapper>
//         <span className="carouselTitle">Now Playing</span>
//         <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
//       </ContentWrapper>
//       <Carousel data={data?.results} loading={loading} endpoint={mediaType} />
//     </div>
//   );
// };

// export default NowPlaying;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import useFetch from '../../../hooks/useFetch';
import './style.scss';

const NowPlaying = () => {
  const [lastWatchedVideo, setLastWatchedVideo] = useState(null);
  const [endpoint, setEndpoint] = useState("movie"); // Set the default endpoint to "movie"
  const { data, loading } = useFetch(`/${endpoint}/now_playing`); // Use the endpoint variable

  useEffect(() => {
    // Retrieve last watched video from local storage
    const storedLastWatchedVideo = localStorage.getItem('lastWatchedVideo');
    setLastWatchedVideo(storedLastWatchedVideo ? JSON.parse(storedLastWatchedVideo) : null);
  }, []);

  return (
    <div className="nowPlayingSection">
      <ContentWrapper>
        <span className="sectionTitle">Now Playing</span>
        {lastWatchedVideo ? (
          <div className="nowPlayingVideo">
            <Link to={`/${lastWatchedVideo.mediaType}/${lastWatchedVideo.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${lastWatchedVideo.poster_path}`}
                alt={`Now Playing: ${lastWatchedVideo.title}`}
              />
              <h2>{`Now Playing: ${lastWatchedVideo.title}`}</h2>
            </Link>
          </div>
        ) : (
          <span className="noNowPlaying">No last watched video available.</span>
        )}
        {loading && <p>Loading now playing movies...</p>}
        {data?.results && (
          <div className="nowPlayingList">
            {data.results.map((movie) => (
              <div key={movie.id} className="nowPlayingItem">
                <Link to={`/${endpoint}/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={`Now Playing: ${movie.title}`}
                  />
                  <h3>{movie.title}</h3>
                </Link>
              </div>
            ))}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default NowPlaying;
