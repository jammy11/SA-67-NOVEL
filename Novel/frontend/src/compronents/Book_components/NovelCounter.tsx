// src/components/Book_components/NovelCounter.tsx
import React from 'react';
import './NovelCounter.css'; // Create this CSS file if you need specific styling for the counter.
import { BiBook } from "react-icons/bi";

interface NovelCounterProps {
  count: number;
}

const NovelCounter: React.FC<NovelCounterProps> = ({ count }) => {
  return (
    <div className="novel-counter">
      <div className='text_counter'> <BiBook /> Total Novels: {count}</div>
    </div>
  );
};

export default NovelCounter;
