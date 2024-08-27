package entity

import (
	"gorm.io/gorm"
)


type Coin struct {
	gorm.Model
	C_Balance int
	Users []User `gorm:"foreignKey:CoinID"`

}