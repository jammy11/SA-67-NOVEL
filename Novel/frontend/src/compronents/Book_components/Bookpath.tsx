import React from 'react';
import NCard from './Novelbase';

const ncardData = [
  { title: 'The Silent Path', description: 'A journey of a lone wanderer.', likes: 2487, comments: 15, writer: 'Jane Doe', rate: 'PG-13', type: 'Fantasy' },
  { title: 'Moonlit Nights', description: 'Love under the silver moon.', likes: 1503, comments: 20, writer: 'John Smith', rate: 'R', type: 'Romance' },
  { title: 'Broken Chains', description: 'Freedom from a dark past.', likes: 1728, comments: 8, writer: 'Alice Green', rate: 'PG', type: 'Drama' },
  { title: 'The Last Frontier', description: 'Survival on an alien planet.', likes: 3011, comments: 23, writer: 'Bob Brown', rate: 'PG-13', type: 'Sci-Fi' },
  { title: 'Echoes of Time', description: 'A tale lost in the sands of time.', likes: 1945, comments: 12, writer: 'Clara White', rate: 'PG', type: 'Historical' },
  { title: 'Heart of Stone', description: 'An unbreakable bond.', likes: 2789, comments: 33, writer: 'Eve Black', rate: 'PG-13', type: 'Romance' },
  { title: 'Shadow\'s Edge', description: 'A fight against unseen forces.', likes: 2290, comments: 18, writer: 'Dave Blue', rate: 'R', type: 'Thriller' },
  { title: 'Wings of Fire', description: 'Rising from the ashes.', likes: 3132, comments: 29, writer: 'Fiona Gray', rate: 'PG-13', type: 'Fantasy' },
  
];

const NCardList: React.FC = () => {
  return (
    <div className='card-list'>
      {ncardData.map((ncard, index) => (
        <NCard key={index} ncard={ncard} />
      ))}
    </div>
  );
};

export default NCardList;
