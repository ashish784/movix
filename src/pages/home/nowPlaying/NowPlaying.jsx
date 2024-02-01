import React, { useState } from 'react';
import Carousel from '../../../components/carousel/Carousel';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTab/SwitchTabs';
import useFetch from '../../../hooks/useFetch';

const NowPlaying = () => {
  const [mediaType, setMediaType] = useState("movie");

  const { data, loading } = useFetch(`/${mediaType}/now_playing`);

  const onTabChange = (tab) => {
    setMediaType(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Now Playing</span>
        <SwitchTabs data={["Movies"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={mediaType} />
    </div>
  );
};

export default NowPlaying;
