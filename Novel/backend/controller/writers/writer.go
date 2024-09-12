package writers

import (
	"net/http"
	"example.com/novel/config"
	"example.com/novel/entity"
	"github.com/gin-gonic/gin"
)

func GetAllWriters(c *gin.Context) {
	var writers []entity.User

	db := config.DB()
	// Fetch all writers from the database and preload associated User and their Coin if needed
	if err := db.Where("writer = true").Find(&writers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve writers"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"writer": writers})
}





