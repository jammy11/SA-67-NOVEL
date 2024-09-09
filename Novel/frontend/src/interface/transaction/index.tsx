export interface TransactionInterface {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    trans_type: string;
    payment: string;
    package_id: number;
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
        novel_name: string;
        content: string;
        novel_type: string;
        rate: string;
        cover: string;
        novel_price: number;
        novel_like: number;
        buy_amont: number;
        Bookshelf: null;
      };
    };
  }

  export interface Coin {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    balance: number;
  }
  
  export interface User {
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
    Coin: Coin;
    Transaction: any; // คุณสามารถกำหนดประเภทที่ชัดเจนมากกว่านี้ได้
    Order: any; // คุณสามารถกำหนดประเภทที่ชัดเจนมากกว่านี้ได้
  }
  
  export interface Package {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    pack_amount: number;
    pack_price: number;
    pack_pic: string;
  }
  
  export interface Writer {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    income: number;
    user_id: number;
    User: User;
  }
  
  export interface Novel {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    novel_name: string;
    content: string;
    novel_type: string;
    rate: string;
    cover: string;
    novel_price: number;
    novel_like: number;
    buy_amont: number;
    Bookshelf: any; // คุณสามารถกำหนดประเภทที่ชัดเจนมากกว่านี้ได้
    writer_id: number;
    writer: Writer;
  }
  
  export interface Order {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    user_id: number;
    User: User;
    novel_id: number;
    Novel: Novel;
  }
  
  export interface Transaction {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    trans_type: string;
    payment: string;
    package_id: number;
    order_id: number | null;
    user_id: number;
    Package: Package;
    User: User;
    Order: Order;
    amount_t: number;
  }