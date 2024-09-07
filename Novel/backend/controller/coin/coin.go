package coins

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "example.com/novel/config"
    "example.com/novel/entity"
)

func GetAll(c *gin.Context) {
    var coins []entity.Coin
    db := config.DB()
    results := db.Find(&coins)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, coins)
}

func Get(c *gin.Context) {
    ID := c.Param("id")
    var coin entity.Coin
    db := config.DB()
    results := db.First(&coin, ID)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, coin)
}

func Update(c *gin.Context) {
    var coin entity.Coin
    CoinID := c.Param("id")
    db := config.DB()
    result := db.First(&coin, CoinID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
        return
    }
    if err := c.ShouldBindJSON(&coin); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
        return
    }
    result = db.Save(&coin)
    if result.Error != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

func Delete(c *gin.Context) {
    id := c.Param("id")
    db := config.DB()
    if tx := db.Exec("DELETE FROM coins WHERE id = ?", id); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}
