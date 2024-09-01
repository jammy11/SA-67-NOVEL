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
  export interface SignInInterface {

    email?: string;
  
    password?: string;
  
  }
  export interface UsersInterface {

    ID?: number;
  
    FirstName?: string;
  
    LastName?: string;
  
    Email?: string;
  
    Phone?: string;
  
    Age?: number;
  
    BirthDay?: string;
  
    GenderID?: number;
  
    Password?: string;
  
  }
