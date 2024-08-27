package entity
import (
	"gorm.io/gorm"
 
 )
 

 type Package struct {
	gorm.Model
	Amount       int       
	Price        int       
	Pic          string   
	Transactions []Transaction `gorm:"foreignKey:PackageID"` 

}
