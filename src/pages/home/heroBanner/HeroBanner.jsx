// import React, {useEffect, useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from "react-redux";
// import "./style.scss";
// import useFetch from '../../../hooks/useFetch';
// import Img from "../../../components/lazyLoadImage/Img";
// import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

// const HeroBanner = () => {
//     const [background, setBackground] = useState("");
//     const [query, setQuery] = useState("");
//     const navigate = useNavigate();
//     const { url } = useSelector((state) => state.home);
//     const {data, loading} = useFetch("/movie/upcoming");

//     useEffect(() => {       
//         setRandomBackground();
//         const intervalId = setInterval(() => {
//           setRandomBackground();
//         }, 2000);
//         }, [data]);
    
//       // const setRandomBackground = () => {
//       //   const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
//       //   setBackground(bg);
//       // };
//       const setRandomBackground = () => {
//         const results = data?.results;
//         if (results && results.length > 0) {
//           const bg = url.backdrop + results[Math.floor(Math.random() * results.length)]?.backdrop_path;
//           setBackground(bg);
//         }
//       };

//     const handleSearch = () => {
//         if (query.length > 0) {
//           navigate(`/search/${query}`);
//         }
//       };
    
//       const searchQueryHandler = (event) => {
//         if (event.key === 'Enter') {
//           handleSearch();
//         }
//       };

//   return (
//     <div className="heroBanner">
//         {loading && <p>Loading...</p>}
//         {!loading && <div className="backdrop-img">
//             <Img src={background} />
//         </div>}
//         <div className="opacity-layer"></div>
//         <ContentWrapper>
//             <div className="heroBannerContent">
//                 <span className="title">Welcome.</span>
//                 <span className="subTitle">Millions of movies, TV Shows and people to discover.
//                                            Explore now.
//                 </span>
//                 <div className="searchInput">
//                     <input type="text" placeholder="Search for a Movie or TV shows..."
//                     onChange={(e)=> setQuery(e.target.value)}
//                     onKeyUp={searchQueryHandler}
//                     />
//                     <button onClick={handleSearch}>Search</button>
//                 </div>
//             </div>
//         </ContentWrapper>
//     </div>
//   );
// };

// export default HeroBanner;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData('/movie/upcoming');
  }, [fetchData]);

  useEffect(() => {
    if (error) {
      console.error('Error fetching upcoming movies:', error);
      // Handle error state (e.g., show an error message)
    } else {
      setRandomBackground();
      const intervalId = setInterval(() => {
        setRandomBackground();
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [data, error]);

  const setRandomBackground = () => {
    const results = data?.results;
    if (results && results.length > 0) {
      const bg =
        url.backdrop +
        results[Math.floor(Math.random() * results.length)]?.backdrop_path;
      setBackground(bg);
    }
  };

  const handleSearch = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const searchQueryHandler = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="heroBanner">
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV Shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a Movie or TV shows..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
