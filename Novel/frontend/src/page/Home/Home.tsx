import React, { useEffect, useState } from 'react';
import { MusicProvider } from '../../compronents/song_components/musicprovider';
import './Home.css';
import Headers from '../../compronents/Pubblic_components/headerselect';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '../../compronents/Home_components/slideshow';
import CardList1 from '../../compronents/Home_components/GroupCategory/romantic';
import CardList2 from '../../compronents/Home_components/GroupCategory/action';
import CardList3 from '../../compronents/Home_components/GroupCategory/horror';
import CardList4 from '../../compronents/Home_components/GroupCategory/fantasy';
import CardList5 from '../../compronents/Home_components/GroupCategory/comedy';
import CategoryNav from '../../compronents/Home_components/CategoryNav';
import Trand from '../../compronents/Home_components/GroupCategory/Trand';
import SLoader from '../../compronents/Book_components/simpleLoader';

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate data fetching
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay for 1 second
      setLoading(false);
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <SLoader />; // Show the loader while loading data
  }

  return (
    <MusicProvider>
      <Headers />
      <a id='cat1' className='hide'>1</a>
      <CategoryNav />
      <div className='l1'>
        <div className='l1_1'>
          <div className='l1_1_1'>
            <h2 id='Treding'>แนะนำ
              <img width="20px" style={{ transform: "translate(0, -5px)" }} src="/src/assets/star.png" alt="star" />
            </h2>
            <Slider />
          </div>
          <Trand />
          <a id='cat1_2'  className='hide'>1_2</a>
        </div>

        <a id='cat2' className='hide'>2</a>
        <div className='l1_2'>
          <div className='headder'>
            <h2>โรแมนติก</h2>
          </div>
          <CardList1 />
        </div>

        <a id='cat3' className='hide'>3</a>
        <div className='l1_2'>
          <div className='headder'>
            <h2>แอ็คชั่น</h2>
          </div>
          <CardList2 />
        </div>

        <a id='cat4' className='hide'>4</a>
        <div className='l1_2'>
          <div className='headder'>
            <h2>สยองขวัญ</h2>
          </div>
          <CardList3 />
        </div>

        <a id='cat5' className='hide'>5</a>
        <div className='l1_2'>
          <div className='headder'>
            <h2>แฟนตาซี</h2>
          </div>
          <CardList4 />
        </div>

        <a id='cat6' className='hide'>6</a>
        <div className='l1_2'>
          <div className='headder'>
            <h2>คอมเมดี้</h2>
          </div>
          <CardList5 />
        </div>
      </div>
    </MusicProvider>
  );
};

export default Home;
