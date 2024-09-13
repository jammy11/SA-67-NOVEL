import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Home_components/crad';
import { GetNovels } from '../../services/https/Novel/novel';


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
  writer_id: number;
  Writer: {
    user_name: string;
    email: string;
  };
}



const YourComponent: React.FC = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetNovels();
        setNovels(response.data.novels); // Assuming response.data contains 'novels'
      } catch (error) {
        console.error('Error fetching novels:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className='card-list'>
      {novels.map((novel, index) => (
        <Card key={index} novel={novel} />
      ))}
    </div>
  );
};

export default YourComponent;
