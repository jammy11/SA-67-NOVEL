import React, { useState } from 'react';
import './Home.css';
import Headers from '../../compronents/Pubblic_components/headerselect';
import 'bootstrap/dist/css/bootstrap.min.css'
import Slider from '../../compronents/Home_components/slideshow';
import CardList1 from '../../compronents/path/pathCat1';
import CardList2 from '../../compronents/path/pathCat2';
import CardList3 from '../../compronents/path/pathCat3';
import CardList4 from '../../compronents/path/pathCat4';
import CardList5 from '../../compronents/path/pathCat5';
import CategoryNav from '../../compronents/Home_components/CategoryNav';
import Trand from '../../compronents/Home_components/Trand';

const Home: React.FC = () => {
  

    return (
        <>
        <Headers/>
        <a id='cat1' className='hide'>1</a>
        <CategoryNav/>
    <div className='l1'>
    <div className='l1_1'>

    <div className='l1_1_1' >
    <h2 id='Treding'>แนะนำ
        <img width="20px" style={{ transform: "translate(0, -5px)" }} src="/src/assets/star.png" alt="star" />
    </h2>

    <Slider />
        
    </div>
    
        <Trand />

    </div>


    <a id='cat2'  className='hide'>2</a>
    <div className='l1_2' >
        <div className='headder'>
    <h2>นิยายใหม่</h2>
    </div>
    
    <CardList1 />
    
   </div>
   <a id='cat3'  className='hide'>3</a>
   <div className='l1_2' >
        <div className='headder'>
    <h2>สุดฮิต</h2>
    </div>
    <CardList2 />
    </div> 

    <a id='cat4'  className='hide'>4</a>
   <div className='l1_2'>
        <div className='headder'>
    <h2>โรแมนติก</h2>
    </div>
    <CardList3 />
   </div>
   <a id='cat5'  className='hide'>5</a>
   <div className='l1_2' >
        <div className='headder'>
    <h2>แฟนตาซี</h2>
    </div>
         <CardList4 />
   </div>

   <a id='cat6'  className='hide'>6</a>
    <div className='l1_2' >
        <div className='headder'>
    <h2>สืบสวน</h2>
    </div>
    <CardList5 />
    
   </div>
</div>


        
        </>
    );
};


export default Home;