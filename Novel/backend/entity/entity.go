package entity

import (
	"time"

	"gorm.io/gorm"
)



type Coin struct {
	gorm.Model
	Balance float64 `json:"balance"`
}

type Transaction struct {
	gorm.Model

	TransactionType string    `json:"trans_type"`

	Payment string `json:"payment"`

	PackageID       *uint `json:"package_id"` 
	OrderID         *uint `json:"order_id"`

    Package   Package   `gorm:"foreignKey:PackageID"`
	
	UserID          uint `json:"user_id"` 
    User      User      `gorm:"foreignKey:UserID"`

    Order     Order     `gorm:"foreignKey:OrderID"`

	Amount_T	float64 `json:"amount_t"` 
}

type Package struct {
	gorm.Model
	Amount float64 `json:"pack_amount"`
	Price  float64 `json:"pack_price"`
	Pic    string  `gorm:"type:text" json:"pack_pic"`
	Transactions []Transaction
}

type Order struct {
	gorm.Model
	UserID  uint   `json:"user_id"` 
	User	User   `gorm:"foreignKey:UserID"`

    NovelID uint   `json:"novel_id"`
    Novel   Novel  `gorm:"foreignKey:NovelID"`
}
    

type User struct {
	gorm.Model
	Username    string    `json:"user_name" gorm:"unique"`
	Password    string    `json:"-"`
	Email       string    `json:"email" gorm:"unique"`
	FirstName   string    `json:"first_name"`
	LastName    string    `json:"last_name"`
	BirthDate   time.Time `json:"birth_date"`
	Gender      string    `json:"gender"`
	Profile     string    `gorm:"type:longtext"`
	CoinID      uint
	Coin        Coin
	BookshelfID uint
	Bookshelf   Bookshelf

	Transactions []Transaction
	Orders       []Order

	CommentedNovels []*Novel `gorm:"many2many:comment;"`
	
	Writer bool `json:"writer"`
	Income float64 `json:"income"`
}

type Like struct {
	gorm.Model
	
	UserID   uint   `json:"user_id"` 
	User     User   `gorm:"foreignKey:UserID"`

	NovelID  uint   `json:"novel_id"`
	Novel    Novel  `gorm:"foreignKey:NovelID"`
}

type Novel struct {
	gorm.Model
	Name        string  `json:"novel_name"`
	Content     string  `gorm:"type:longtext" json:"content"`
	Visibility  bool    `json:"novel_visibility"`
	Description string  `json:"description"`
	Type1       string  `json:"novel_type1"`
	Type2       string  `json:"novel_type2"`
	Rate        string  `json:"rate"`
	WriterName  string  `json:"writername"`
	Cover       string  `gorm:"type:text" json:"cover"`
	Price       float64 `json:"novel_price"`
	LikeCount   int64   `json:"novel_like"`
	BuyAmount   int64   `json:"buy_amount"`

	Bookshelves  []*Bookshelf `gorm:"many2many:Bookshelf_List;"`
	CommentUsers []*User      `gorm:"many2many:comment;"`
	LikedUsers   []*Like      `gorm:"foreignKey:NovelID"`
	
	WriterID uint    `json:"writer_id"`
	Writer   User  `gorm:"foreignKey:WriterID"`
}

type Bookshelf struct {
	gorm.Model
	Novels []*Novel `gorm:"many2many:Bookshelf_List;"`
}

type Bookshelf_List struct {
	gorm.Model

	BookshelfID uint      `json:"bookshelf_id"`
	Bookshelf   Bookshelf `gorm:"foreignKey:BookshelfID"`

	NovelID     uint      `json:"novel_id"`
	Novel       Novel     `gorm:"foreignKey:NovelID"`
}

type Comment struct {
	gorm.Model
	Description string `json:"description"`

	UserID  uint `json:"user_id"` 
	User    User `gorm:"foreignKey:UserID"`

	NovelID uint  `json:"novel_id"`
	Novel   Novel `gorm:"foreignKey:NovelID"`
}


