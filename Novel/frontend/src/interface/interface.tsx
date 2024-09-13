export interface CoinCardProps {
    key: number;
    amount: number;
    price: number;
    imgSrc: string;
    showButton?: boolean;
    sendData: (amount: number, price: number, key: number) => void
  }

  export interface Package {
    ID: number;
    pack_amount: number;
    pack_price: number;
    pack_pic: string;
  }


  export interface SignInInterface {

    email?: string;
  
    password?: string;
  
  }
  export interface UsersInterface {
    Profile: string | undefined;
    ID?: number;
    Username?: string;

    FirstName?: string;
  
    LastName?: string;
  
    Email?: string;
  
    Phone?: string;
  
    Age?: number;
  
    BirthDay?: string;
  
    GenderID?: number;
  
    Password?: string;
  }
    
    export interface InterfaceStatusWriter {

      ID?: number;
  
      Writer?: boolean;
      
    
    }
  
  
  export interface UsersInterface {
    id: string;
    email: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
  }
  


  
  export interface OrderInterface {
    id: string;
    user_id: string;
    package_id: string;
    amount: number;
    status: string;
    created_at?: Date;
    updated_at?: Date;
  }
  
  export interface PackageInterface {
    id: string;
    Amount: string;
    price: number;
    Pic: Date;
    updated_at?: Date;
  }
  
  export interface CoinInterface {
    id: string;
    package_id: string;
    amount: number;
    price: number;
    created_at?: Date;
    updated_at?: Date;
  }
  
  export interface GendersInterface {
    id: string;
    name: string;
  }
  export interface TransactionCreateInterface {
    trans_type: string;
    payment?: string;
    user_id: number;
    package_id?: number | null;
    order_id?: number | null;
    amount_t: number; 


  }

  
  export interface TransactionInterface {
  ID: number ;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  trans_type: string;
  payment: string;
  package_id: number| null;
  order_id: number | null;
  user_id: number;
  Package: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    pack_amount: number;
    pack_price: number;
    pack_pic: string;
  };
  User: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    user_name: string;
    email: string;
    id_type: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    gender: string;
    profile: string;
    CoinID: number;
    Coin: {
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: string | null;
      balance: number;
    };
    Transaction: null;
    Order: null;
  };
  Order: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    order_date: string;
    UserID: number;
    NovelID: number;
    Novel: {
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: string | null;
      Name: string;
      Content: string;
      Type: string;
      Rate: string;
      cover: string;
      Price: number;
      Like: number;
      Buy_amount: number;
      Bookshelf: null;
    };
  };
}
interface Coin {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  balance: number;
}

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  userName: string;
  email: string;
  idType: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  profile: string;
  coinID: number;
  coin: Coin;
  transaction?: any;
  order?: any;
}

interface Writer {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  income: number;
  userId: number;
  user: User;
}

export interface Novel {
      id: number;
      createdAt: string;
      updatedAt: string;
      deletedAt?: string | null;
      name: string;
      content: string;
      type: string;
      rate: string;
      cover: string;
      price: number;
      like: number;
      buyAmount: number;
      bookshelf?: Bookshelf[];
      writerId: number;
      writer: Writer;
    }

interface Bookshelf {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  userId: number;
  user: User;
  novel: Novel[];
}
