
import React, { useState } from 'react';
import './L_Bookshelf.css';
import Headers from '../../compronents/Pubblic_components/headerselect';
import Button_s from '../../compronents/Book_components/return_button';

import NCardList2 from '../../compronents/Book_components/Bookpath2';
import Tooltip from '../../compronents/Book_components/mario';


const L_Bookshelf: React.FC = () => {
  // State for managing the current page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4; // Total number of pages
  const itemsPerPage = 4; // Number of items per page (if needed)
  const novelCount = 20;

  // Function to handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Header component */}
      <Headers />

      {/* Header and Return Button */}
      <div className="head-box">
        <a href="/">
          <Button_s />
        </a>
        <div className="head">Bookshelf</div>
      </div>

      {/* Main content area */}
      <div className="lb_base">
        
        {/* Left side with book paths */}
        <div className="lb_half_left">
          <NCardList2/>
          {/* <NCardList /> */}
        </div>
        {/* Right side, currently empty - add content or components here if needed */}
        <div className="lb_half_right">
            {/* <Carder/> */}
            {/* <NovelCounter count={novelCount} /> */}
            <Tooltip/>
        </div>

        
      </div>

      {/* Pagination Component */}
      {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
    </>
  );
};

export default L_Bookshelf;
