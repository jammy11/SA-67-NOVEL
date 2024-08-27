package entity

import (
	"gorm.io/gorm"
)

type TransactionType string

const (
	Deposit    TransactionType = "ฝาก"
	Withdraw   TransactionType = "ถอน"
	Purchase   TransactionType = "ซื้อ"
)

type Transaction struct {
	gorm.Model
	TransactionType string
	PackageID *uint
	Package   Package `gorm:"foreignKey:PackageID"`

	UserID *uint
	User   User `gorm:"foreignKey:UserID"`

	OrderID *uint
	Order   Order `gorm:"foreignKey:OrderID"`
}