package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username    string    `json:"user_name"`
	Password    string    `json:"-"`
	Email       string    `json:"email"`
	ID_Type     string    `json:"id_type"`
	FirstName   string    `json:"first_name"`
	LastName    string    `json:"last_name"`
	BirthDate   time.Time `json:"birth_date"`
	Gender      string    `json:"gender"`
    Profile     string  `gorm:"type:text" json:"profile"`
	CoinID      uint
	Coin        Coin
	Transaction []Transaction
	Order       []Order
}

type Coin struct {
	gorm.Model
	Balance float64 `json:"balance"`
}

type Transaction struct {
	gorm.Model
	TransactionType string    `json:"trans_type"`
	Payment string `json:"payment"`
	PackageID       uint
	OrderID         uint
	UserID          uint
    Package   Package   `gorm:"foreignKey:PackageID"`
    User      User      `gorm:"foreignKey:UserID"`
    Order     Order     `gorm:"foreignKey:OrderID"`
}

type Package struct {
	gorm.Model
	Amount float64 `json:"pack_amount"`
	Price  float64 `json:"pack_price"`
	Pic    string  `gorm:"type:text" json:"pack_pic"`
}

type Order struct {
	gorm.Model
	Order   time.Time `json:"order_date"`
	UserID  uint
    NovelID uint
    Novel  Novel
}

type Novel struct {
	gorm.Model
	Name    string
	Content string
	Type    string
	Rate    string
	Cover   string  `gorm:"type:text" json:"cover"`
    Price   float64
    Like    int
    Buy_amount int
    Bookshelf []*Bookshelf `gorm:"many2many:Bookshelf_List;"`
}
type Bookshelf struct{
    gorm.Model
    UserID uint
    User   User
    Novel []*Novel `gorm:"many2many:Bookshelf_List;"`
}
type Bookshelf_List struct{
    gorm.Model
    BookshelfID uint
    Bookshelf   Bookshelf
    NovelID       uint
    Novel       Novel

}

type Writer struct{
    gorm.Model
    Income float64 
    UserID  uint
    User    User
}
type Comment struct{
    gorm.Model
    Description string
    UserID  uint
    User    User
}