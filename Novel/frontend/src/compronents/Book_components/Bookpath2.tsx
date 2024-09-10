import React from 'react';
import './cardlist.css';
import NCardv2 from './Novelbasev2';

const ncardData = [
  { id: 1, title: 'The Silent Path', description: 'A journey of a lone wanderer.', likes: 2487, comments: 15, writer: 'Jane Doe', rate: 'PG-13', type_1: 'Fantasy', type_2: 'Action',cover: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/669b7b504aa1ea001b3127d8/66a233d13m9gmoQM.jpeg'},
  { id: 2, title: 'Moonlit Nights', description: 'Love under the silver moon.', likes: 1503, comments: 20, writer: 'John Smith', rate: 'R', type_1: 'Romance', type_2: 'Fantasy',cover: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/66aaebdca5f59d001c62f63c/66aaecfawo8DIFuK.jpeg' },
  { id: 3, title: 'Broken Chains', description: 'Freedom from a dark past.', likes: 1728, comments: 8, writer: 'Alice Green', rate: 'PG', type_1: 'Drama', type_2: 'Horror',cover: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/6661884a6671e0001cbc17bf/666193cbP0vtEoxD.jpeg' },
  { id: 4, title: 'The Last Frontier', description: 'Survival on an alien planet.', likes: 3011, comments: 23, writer: 'Bob Brown', rate: 'PG-13', type_1: 'Sci-Fi', type_2: 'Action',cover: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/614c1f1ddb22cf001cbe0e55/6192208aBy6WoSao.jpeg' },
  { id: 5, title: 'Echoes of Time', description: 'A tale lost in the sands of time.', likes: 1945, comments: 12, writer: 'Clara White', rate: 'PG', type_1: 'Historical', type_2: 'Fantasy',cover: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/66a8955d53f595001c16c9b8/66a898c0UzkZ3S1E.jpeg' },
  { id: 6, title: 'Heart of Stone', description: 'An unbreakable bond.', likes: 2789, comments: 33, writer: 'Eve Black', rate: 'PG-13', type_1: 'Romance', type_2: 'Action',cover: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/646f0c6165727b001d86663b/65fbecf5aI15cAnp.jpeg' },
  { id: 7, title: 'Shadow\'s Edge', description: 'A fight against unseen forces.', likes: 2290, comments: 18, writer: 'Dave Blue', rate: 'R', type_1: 'Thriller', type_2: 'Horror',cover: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/6698c1b8a2d127001ce14d1e/66ac6d6bQJ1LOG1e.jpeg' },
  { id: 8, title: 'Wings of Fire', description: 'Rising from the ashes.', likes: 3132, comments: 29, writer: 'Fiona Gray', rate: 'PG-13', type_1: 'Fantasy', type_2: 'Action',cover: 'https://s3.ap-southeast-1.amazonaws.com/media.fictionlog/books/66178eeec51323001c3c08b0/66178ffaiqW0Pk8X.jpeg' },
];

const NCardList2: React.FC = () => {
  return (
    <div className='card-list-b'>
      {ncardData.map((ncardv, index) => (
        <NCardv2 key={index} ncardv={ncardv} />
      ))}
    </div>
  );
};

export default NCardList2;