package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/novel-last/config"
	"github.com/novel-last/entity"
)

func GetCoin(c *gin.Context) {
	ID := c.Param("id")
	var Coin entity.Coin

	db := config.DB()
	results := db.Preload("Coin").First(&Coin, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if Coin.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, Coin)
}

// PATCH /coin
func UpdateCoin (c *gin.Context) {
	var Coin entity.User

	CoinID := c.Param("id")

	db := config.DB()
	result := db.First(&Coin, CoinID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&Coin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&Coin)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}
