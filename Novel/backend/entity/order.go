package entity


import (
   "gorm.io/gorm"

)

type Order struct {
	gorm.Model
	Transactions []Transaction `gorm:"foreignKey:OrderID"`
	
	UserID *uint
	User   User `gorm:"foreignKey:UserID"`

}