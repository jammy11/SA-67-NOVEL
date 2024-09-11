package like

import (
	"net/http"
	"example.com/novel/config"
	"example.com/novel/entity"
	"github.com/gin-gonic/gin"
)

// GetAllLikes retrieves all Like entries, showing the relationships between users and novels they liked
func GetAllLikes(c *gin.Context) {
	var likes []entity.Like
	db := config.DB()

	// Preload User and Novel to include their details
	results := db.Preload("User").Preload("Novel").Find(&likes)
	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, likes)
}

// GetLike retrieves a single Like entry by ID
func GetLike(c *gin.Context) {
	ID := c.Param("id")
	var like entity.Like
	db := config.DB()

	// Preload User and Novel for the given Like entry
	results := db.Preload("User").Preload("Novel").First(&like, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Like entry not found"})
		return
	}
	c.JSON(http.StatusOK, like)
}

// CreateLike creates a new Like entry, linking a user with a novel
func CreateLike(c *gin.Context) {
	var like entity.Like

	// Bind JSON payload to Like struct
	if err := c.ShouldBindJSON(&like); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}

	db := config.DB()

	// Check if the specified user and novel exist
	if err := db.First(&entity.User{}, like.UserID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}
	if err := db.First(&entity.Novel{}, like.NovelID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Novel not found"})
		return
	}

	// Create the Like entry
	result := db.Create(&like)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create Like entry"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Like entry created successfully", "like": like})
}

// UpdateLike updates an existing Like entry
func UpdateLike(c *gin.Context) {
	ID := c.Param("id")
	var like entity.Like

	db := config.DB()

	// Find the existing Like entry
	result := db.First(&like, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Like entry not found"})
		return
	}

	// Bind new data to the Like struct
	if err := c.ShouldBindJSON(&like); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}

	// Save the updated entry
	result = db.Save(&like)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update Like entry"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Like entry updated successfully"})
}

// DeleteLike deletes a Like entry by ID
func DeleteLike(c *gin.Context) {
	ID := c.Param("id")
	db := config.DB()

	// Delete the Like entry
	result := db.Delete(&entity.Like{}, ID)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete Like entry"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Like entry not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Like entry deleted successfully"})
}
