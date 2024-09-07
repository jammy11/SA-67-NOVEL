package users


import (

   "net/http"


   "github.com/gin-gonic/gin"


   "example.com/novel/config"

   "example.com/novel/entity"
   

)



func GetAll(c *gin.Context) {


   var users []entity.User


   db := config.DB()

   results := db.Preload("Coin").Find(&users)

   if results.Error != nil {

       c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})

       return

   }

   c.JSON(http.StatusOK, users)


}


func Get(c *gin.Context) {


   ID := c.Param("id")

   var user entity.User


   db := config.DB()

   results := db.Preload("Coin").First(&user, ID)

   if results.Error != nil {

       c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})

       return

   }

   if user.ID == 0 {

       c.JSON(http.StatusNoContent, gin.H{})

       return

   }

   c.JSON(http.StatusOK, user)


}


func Update(c *gin.Context) {


   var users entity.User


   UserID := c.Param("id")


   db := config.DB()

   result := db.Preload("Coin").First(&users, UserID)

   if result.Error != nil {

       c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})

       return

   }


   if err := c.ShouldBindJSON(&users); err != nil {

       c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})

       return

   }


   result = db.Save(&users)

   if result.Error != nil {

       c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})

       return

   }


   c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})

}


func Delete(c *gin.Context) {


   id := c.Param("id")

   db := config.DB()

   if tx := db.Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {

       c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})

       return

   }

   c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}