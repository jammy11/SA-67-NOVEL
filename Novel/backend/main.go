package main

import (
	"github.com/novel-last/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("novel.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&entity.Coin{}, &entity.Order{}, &entity.Package{}, &entity.Transaction{}, &entity.User{})
}
