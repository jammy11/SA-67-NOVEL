import React, { useEffect, useState } from 'react';
import { GetPackages } from '../services/https';
import CoinCard from './coinCard';
interface Package {
  ID: number;
  pack_amount: number;
  pack_price: number;
  pack_pic: string;
}

const PackageList: React.FC = () => {


  return (
    <div>
      
    </div>
  );
};

export default PackageList;
