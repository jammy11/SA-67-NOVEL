package config

import (
	"fmt"
	"time"

	"github.com/novel-last/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("novel.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {

	db.AutoMigrate(
		&entity.User{},
		&entity.Coin{},
	)


	hashedPassword, _ := HashPassword("123456")
	BirthDay, _ := time.Parse("2006-01-02", "1988-11-12")
	User := &entity.User{
		FirstName: "Software",
		LastName:  "Analysis",
		Email:     "sa@gmail.com",
		Password:  hashedPassword,
		BirthDate:  BirthDay,
		CoinID: 	1,
	}
	db.FirstOrCreate(User, &entity.User{
		Email: "sa@gmail.com",
	})

}
