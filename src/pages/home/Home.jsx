import React from 'react';
import HeroBanner from './heroBanner/HeroBanner';
import NowPlaying from './nowPlaying/NowPlaying';
import Popular from './popular/Popular';
import "./style.scss";
import TopRated from './topRated/TopRated';
import Trending from './trending/Trending';
import Upcoming from './upcoming/Upcoming';




const Home = () => {
  return (
    <div className="homePage">
        <HeroBanner />
        <NowPlaying />
        <Trending />
        <Popular />
        <TopRated />
        <Upcoming />
    </div>
  );
};

export default Home;