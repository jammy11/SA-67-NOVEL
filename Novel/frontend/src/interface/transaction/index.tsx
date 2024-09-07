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