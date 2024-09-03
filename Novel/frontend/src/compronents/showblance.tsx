import React, { useEffect, useState } from "react";
import { GetCoinById } from "../services/https";

const Balance: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const userId = localStorage.getItem("id");


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await GetCoinById(userId);
        setBalance(response.data.balance); 
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [userId]);

  return (
        <p>{balance}</p> 
  );
};

export default Balance;
