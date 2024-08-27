import React from 'react';
import NCard from './Novelbase';

const ncardData = [
  { title: 'Whispers in the Dark', description: 'Voices from beyond.', likes: 1888, comments: 10, writer: 'Gavin Silver', rate: 'R', type: 'Horror' },
  { title: 'Starlight Dreams', description: 'A wish upon a star.', likes: 1544, comments: 14, writer: 'Hannah Gold', rate: 'PG', type: 'Adventure' },
  { title: 'Crimson Tide', description: 'The sea hides many secrets.', likes: 2222, comments: 19, writer: 'Isaac Crimson', rate: 'R', type: 'Mystery' },
  { title: 'Golden Horizon', description: 'Chasing the sun.', likes: 2600, comments: 21, writer: 'Jack Amber', rate: 'PG', type: 'Drama' },
  { title: 'Veil of Shadows', description: 'A world consumed by darkness.', likes: 2401, comments: 17, writer: 'Karen Violet', rate: 'PG-13', type: 'Fantasy' },
  { title: 'Frostbite', description: 'Surviving the icy wasteland.', likes: 2755, comments: 22, writer: 'Leo Frost', rate: 'R', type: 'Thriller' },
  { title: 'The Enchanted Forest', description: 'Magic lies within the trees.', likes: 2113, comments: 9, writer: 'Mia Evergreen', rate: 'PG', type: 'Fantasy' },
  { title: 'The Chicken nut', description: 'Eat as much as you want.', likes: 4563, comments: 34, writer: 'Rihito', rate: 'G', type: 'Fantasy' },
];

const NCardList2: React.FC = () => {
  return (
    <div className='card-list'>
      {ncardData.map((ncard, index) => (
        <NCard key={index} ncard={ncard} />
      ))}
    </div>
  );
};

export default NCardList2;