import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the types for the data
interface Writer {
  ID: number;
  user_name: string;
  email: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  profile: string;
  CoinID: number;
  Coin: {
    ID: number;
    balance: number;
  };
  BookshelfID: number;
  Bookshelf: {
    ID: number;
    Novels: any; // Adjust as needed
  };
  Transactions: any; // Adjust as needed
  Orders: any; // Adjust as needed
  CommentedNovels: any; // Adjust as needed
  writer: boolean;
  income: number;
}

interface Novel {
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
  Bookshelves: any[]; // Adjust as needed
  CommentUsers: any[]; // Adjust as needed
  LikedUsers: any; // Adjust as needed
  writer_id: number;
  Writer: Writer;
}

const apiUrl = 'http://localhost:8000'; // Update with your API base URL

const GetNovelByUser = async (id: string) => {
  return await axios
    .get(`${apiUrl}/novels/writer/${id}`)
    .then((res) => res.data)
    .catch((e) => {
      console.error("Error response:", e.response);
      return [];
    });
};

const NovelList: React.FC = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
    if (userId) {
      const fetchNovels = async () => {
        const data = await GetNovelByUser(userId);
        setNovels(data);
        setLoading(false);
      };

      fetchNovels();
    } else {
      console.error('No user ID found in local storage.');
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {novels.length === 0 ? (
        <p>No novels found.</p>
      ) : (
        <ul>
          {novels.map((novel) => (
            <li key={novel.ID}>
              <h2>{novel.novel_name}</h2>
              <p>{novel.description}</p>
              <p>Type: {novel.novel_type1}, {novel.novel_type2}</p>
              <p>Rate: {novel.rate}</p>
              <p>Price: ${novel.novel_price}</p>
              <p>Likes: {novel.novel_like}</p>
              <p>Buy Amount: {novel.buy_amount}</p>
              <img src={novel.cover} alt={novel.novel_name} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NovelList;
