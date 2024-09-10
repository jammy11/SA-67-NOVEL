import React, { useState } from 'react';
import Headers from '../../compronents/Pubblic_components/headerselect';
import './L_Content.css';
import Button_s from '../../compronents/Book_components/return_button';
import Cblock from '../../compronents/Book_components/contentblock';



const L_Content: React.FC = () => {

    return(
        <>
        <Headers/>
        <div className='top-box'>
        <a href='/bookself'> <Button_s/> </a>
        </div>
            <Cblock/>
        </>
    )
}

export default L_Content;