export interface CoinCardProps {
    amount: number;
    price: number;
    imgSrc: string;
    showButton?: boolean;
    sendData: (amount: number, price: number) => void;
  }

  export interface CoinCardProps2 {
    amount: number;
    price: number;
    imgSrc: string;
    onClick: () => void;
  }