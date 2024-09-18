package like

import (
	"net/http"
	"strconv"
	"example.com/novel/config"
	"example.com/novel/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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
	var like entity.Like
	userID := c.Query("user_id") // Assuming user_id is passed as a query parameter
	novelID := c.Query("novel_id") // Assuming novel_id is passed as a query parameter

	db := config.DB()

	// Find the existing Like entry based on UserID and NovelID
	result := db.Where("user_id = ? AND novel_id = ?", userID, novelID).First(&like)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Like entry not found"})
		return
	}

	// Bind the updated data to the Like struct (mainly Is_liked)
	if err := c.ShouldBindJSON(&like); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}

	// Save the updated Like entry (update Is_liked status)
	result = db.Save(&like)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update Like entry"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Like entry updated successfully", "like": like})
}


// DeleteLike deletes a Like entry by ID
func DeleteLike(c *gin.Context) {
    userID := c.Query("user_id") // Get user_id from query parameters
    novelID := c.Query("novel_id") // Get novel_id from query parameters

    if userID == "" || novelID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "User ID and Novel ID are required"})
        return
    }

    db := config.DB()

    // Find the Like entry matching user_id and novel_id
    var like entity.Like
    result := db.Where("user_id = ? AND novel_id = ?", userID, novelID).First(&like)
    if result.Error != nil {
        if result.Error == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "Like entry not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve Like entry"})
        }
        return
    }

    // Delete the Like entry
    result = db.Delete(&like)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete Like entry"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Like entry deleted successfully"})
}

func FindLike(c *gin.Context) {
    userID := c.Query("user_id") // Get user_id from query parameters
    novelID := c.Query("novel_id") // Get novel_id from query parameters

    if userID == "" || novelID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "User ID and Novel ID are required"})
        return
    }

    db := config.DB()

    // Find the Like entry matching user_id and novel_id
    var like entity.Like
    result := db.Where("user_id = ? AND novel_id = ?", userID, novelID).First(&like)
    
    if result.Error != nil {
        if result.Error == gorm.ErrRecordNotFound {
            // No like entry found
            c.JSON(http.StatusOK, gin.H{"exists": false})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve Like entry"})
        }
        return
    }

    // Like entry found
    c.JSON(http.StatusOK, gin.H{"exists": true})
}

func CountLikeByNovelID(c *gin.Context) {
    novelID := c.Param("novelID")
    var count int64
    db := config.DB()
    
    if err := db.Model(&entity.Like{}).Where("novel_id = ?", novelID).Count(&count).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"likeCount": count})
}


func FindLikeByUserIDANovelID(c *gin.Context) {
	// Get NovelID from URL parameters and UserID from query string
	novelID := c.Param("id")
	userIDStr := c.Query("user_id") // UserID as string from query

	// Convert userIDStr to integer
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user_id parameter"})
		return
	}

	db := config.DB()

	var like entity.Like

	// Query the database to find a Like by NovelID and UserID
	if err := db.Where("novel_id = ? AND user_id = ?", novelID, userID).First(&like).Error; err != nil {
		if err.Error() == "record not found" {
			c.JSON(http.StatusOK, gin.H{"isLiked": false})
			return
		}
		// If some other error occurred
		c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occurred while querying the like entry"})
		return
	}

	// If a like is found, return true
	c.JSON(http.StatusOK, gin.H{"isLiked": true})
}

