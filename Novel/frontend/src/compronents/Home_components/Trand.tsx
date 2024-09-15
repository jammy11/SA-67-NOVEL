import React, { useEffect, useState } from 'react';
import { GetPublicNovels } from '../../services/https/Novel/novel';
import Card from './cardTrand';

export interface Novel {
  ID: number;
  novel_name: string;
  content: string;
  description: string;
  novel_type1: string;
  novel_type2: string;
  rate: string;
  writername: string;
  cover: string;
  novel_price: number;
  novel_like: number;
  buy_amount: number;
  writer_id: string;
  Writer: {
    user_name: string;
    email: string;
  };

}
const Trand: React.FC = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetPublicNovels();
        
        // Sort novels by buy_amount in descending order and select the top 5
        const topNovels = response.data.novels
          .sort((a: Novel, b: Novel) => b.buy_amount - a.buy_amount)
          .slice(0, 5);
        
        setNovels(topNovels);
      } catch (error) {
        console.error('Error fetching novels:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className='l1_1_2'>
    <h2 id='Treding'>
      ยอดฮิต
      <img width="20px" style={{ transform: 'translate(0, -5px)' }} src="/src/assets/star.png" alt="star" />
    </h2>
    <div className='l1_1_2_1'>
       <div className='card-list'>
       {novels.map((novel, index) => (
          <Card key={novel.ID} novel={novel} index={index} />
      ))}
        </div>
    </div>
    </div> 
  );
};

export default Trand;

