import React, { useState } from 'react';
import './L_Bookshelf.css';
import Headers from '../../compronents/headerselect';
import Button_s from '../../compronents/Book_components/return_button';
import { alignPropType } from 'react-bootstrap/esm/types';
import Pagination from '../../compronents/Book_components/pagination';
import NCardList from '../../compronents/Book_components/Bookpath';
import NCardList2 from '../../compronents/Book_components/Bookpath2';



const L_Bookshelf: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 4;
    const itemsPerPage = 4; 
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
    
    
    return(
        <>
            <Headers/>
            <div className='head-box'>
            <a href='/'> <Button_s/>  </a>
            <div className='head'> Bookshelf </div>
            </div>
            
            <div className='lb'>
             <div className='lb_half'>
              <NCardList/>
              <NCardList2/>
             </div>
            </div>
            
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            
        </>
        
    )
};

export default L_Bookshelf;