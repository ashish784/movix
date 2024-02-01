import React, {useState} from 'react';
import Carousel from '../../../components/carousel/Carousel';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTab/SwitchTabs';
import useFetch from '../../../hooks/useFetch';


const Upcoming = () => {

    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(`/${endpoint}/upcoming`);
  
    const onTabChange = (tab) => {
         setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Upcoming</span>
            <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Upcoming;