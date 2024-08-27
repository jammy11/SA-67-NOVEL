package entity


import (

   "time"

   "gorm.io/gorm"

)

type User struct {
	gorm.Model
	Username string
	FirstName string    
	LastName  string    
	Email     string   
	Password  string    
	BirthDate  time.Time 
	Orders []Order `gorm:"foreignKey:UserID"`
	Transactions []Transaction `gorm:"foreignKey:UserID"`
	
	CoinID *uint
	Coin   Coin `gorm:"foreignKey:CoinID"`

}