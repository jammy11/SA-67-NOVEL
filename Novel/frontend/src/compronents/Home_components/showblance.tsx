import React, { useEffect, useState } from 'react';
import { GetCoinById } from '../../services/https/Coin/coin';
import { useBalanceContext } from './BalanceContext';

const Balance: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const { refresh } = useBalanceContext(); // Access the context value
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (userId) {
          const response = await GetCoinById(userId);
          setBalance(response.data.balance);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [userId, refresh]); // Re-fetch balance when `refresh` changes

  return <p>{balance}</p>;
};

export default Balance;
