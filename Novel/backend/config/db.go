package config


import (

   "fmt"

   "time"

   "example.com/novel/entity"

   "gorm.io/driver/sqlite"

   "gorm.io/gorm"

)


var db *gorm.DB


func DB() *gorm.DB {

   return db

}


func ConnectionDB() {

   database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})

   if err != nil {

       panic("failed to connect database")

   }

   fmt.Println("connected database")

   db = database

}


func SetupDatabase() {


   db.AutoMigrate(
       &entity.Coin{},
       &entity.User{},
       &entity.Writer{},
       &entity.Order{},
       &entity.Package{},
       &entity.Transaction{},
       &entity.Novel{},
       &entity.Comment{},
   )


   hashedPassword, _ := HashPassword("1")

   BirthDate, _ := time.Parse("2006-01-02", "1988-11-12")

   User := &entity.User{
       Username: "C4sama",

       FirstName: "ท่านเบสท์",

       LastName:  "สุดเท่",

       Email:     "Best@gmail.com",
       Profile: "",
       Password:  hashedPassword,
       BirthDate: BirthDate,
       Gender: "Male",
       CoinID: 1,


  
   }

   db.FirstOrCreate(User, &entity.User{

       Email: "Best@gmail.com",

   })


}