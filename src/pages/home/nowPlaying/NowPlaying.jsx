// import React, { useState } from 'react';
// import Carousel from '../../../components/carousel/Carousel';
// import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
// import SwitchTabs from '../../../components/switchTab/SwitchTabs';
// import useFetch from '../../../hooks/useFetch';

// const NowPlaying = () => {
//   const [mediaType, setMediaType] = useState("movie"); // Default to "movie"

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
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import useFetch from '../../../hooks/useFetch';
import Spinner from '../../../components/spinner/Spinner'; // Import the Spinner component

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const { data, loading } = useFetch('/movie/now_playing'); // Updated endpoint

  useEffect(() => {
    if (data) {
      setNowPlaying(data.results[0]); // Assuming you want to display the first result
    }
  }, [data]);

  return (
    <div className="nowPlayingSection">
      <ContentWrapper>
        <span className="sectionTitle">Now Playing</span>
        {loading && <Spinner />} {/* Show Spinner while loading */}
        {nowPlaying ? (
          <div className="nowPlayingVideo">
            <h2>{nowPlaying.title}</h2>
            {/* Add more details or components for the now-playing video */}
            <img
              src={`https://image.tmdb.org/t/p/w500${nowPlaying.poster_path}`}
              alt={nowPlaying.title}
            />
          </div>
        ) : !loading && (
          <span className="noNowPlaying">No video currently playing</span>
        )}
      </ContentWrapper>
    </div>
  );
};

export default NowPlaying;

