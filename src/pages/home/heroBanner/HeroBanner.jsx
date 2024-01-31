import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import "./style.scss";
import useFetch from '../../../hooks/useFetch';
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const {data, loading} = useFetch("/movie/upcoming");

    useEffect(() => {
         const bg = url.backdrop + 
         data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
         setBackground(bg);
    }, [data]);

useEffect(() => {
    setRandomBackground();
    const intervalId = setInterval(() => {
      setRandomBackground();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [data]);

  const setRandomBackground = () => {
    const bgIndex = Math.floor(Math.random() * 20);
    const bg = url.backdrop + data?.results?.[bgIndex]?.backdrop_path;
    setBackground(bg);

    const shiftAmount = -bgIndex * (100 / 3);
    document.querySelector('.backdrop-img').style.transform = `translateX(${shiftAmount}%)`;
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
        {!loading && <div className="backdrop-img">
            <Img src={background} />
        </div>}
        <div className="opacity-layer"></div>
        <ContentWrapper>
            <div className="heroBannerContent">
                <span className="title">Welcome.</span>
                <span className="subTitle">Millions of movies, TV Shows and people to discover.
                                           Explore now.
                </span>
                <div className="searchInput">
                    <input type="text" placeholder="Search for a Movie or TV shows..."
                    onChange={(e)=> setQuery(e.target.value)}
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
// HeroBanner.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import './style.scss';
// import useFetch from '../../../hooks/useFetch';
// import Img from '../../../components/lazyLoadImage/Img';
// import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

// const HeroBanner = () => {
//   const [background, setBackground] = useState('');
//   const [query, setQuery] = useState('');
//   const navigate = useNavigate();
//   const { url } = useSelector((state) => state.home);
//   const { data, loading } = useFetch('/movie/upcoming');

//   useEffect(() => {
//     setRandomBackground();
//     const intervalId = setInterval(() => {
//       setRandomBackground();
//     }, 5000);

//     return () => clearInterval(intervalId);
//   }, [data]);

//   const setRandomBackground = () => {
//     const bgIndex = Math.floor(Math.random() * 20);
//     const bg = url.backdrop + data?.results?.[bgIndex]?.backdrop_path;
//     setBackground(bg);

//     const shiftAmount = -bgIndex * (100 / 3);
//     document.querySelector('.backdrop-img').style.transform = `translateX(${shiftAmount}%)`;
//   };

//   const handleSearch = () => {
//     if (query.length > 0) {
//       navigate(`/search/${query}`);
//     }
//   };

//   const searchQueryHandler = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="heroBanner">
//       {!loading && <div className="backdrop-img">
//           {[0, 1, 2].map((index) => (
//             <div key={index} className="lazy-load-image-background">
//               <Img src={url.backdrop + data?.results?.[index]?.backdrop_path} />
//             </div>
//           ))}
//         </div>
//       }
//       <div className="opacity-layer"></div>
//       <ContentWrapper>
//         <div className="heroBannerContent">
//           <span className="title">Welcome to the Movie Universe</span>
//           <span className="subTitle">
//             Millions of movies, TV Shows, and people to discover. Explore now.
//           </span>
//           <div className="searchInput">
//             <input
//               type="text"
//               placeholder="Search for a Movie or TV shows..."
//               onChange={(e) => setQuery(e.target.value)}
//               onKeyUp={searchQueryHandler}
//             />
//             <button onClick={handleSearch}>Search</button>
//           </div>
//         </div>
//       </ContentWrapper>
//     </div>
//   );
// };

// export default HeroBanner;

