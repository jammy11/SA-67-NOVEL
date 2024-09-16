export interface ICoinCardPack {
    key: number;
    amount: number;
    price: number;
    imgSrc: string;
    showButton?: boolean;
    sendData: (amount: number, price: number, key: number) => void
  }
