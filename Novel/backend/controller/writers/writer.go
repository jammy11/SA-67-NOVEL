package writers

import (
	"net/http"
	"example.com/novel/config"
	"example.com/novel/entity"
	"github.com/gin-gonic/gin"
)

func GetAllWriters(c *gin.Context) {
	var writers []entity.Writer

	db := config.DB()
	// Fetch all writers from the database and preload associated User and their Coin if needed
	if err := db.Preload("User").Preload("User.Coin").Find(&writers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve writers"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"writers": writers})
}

// CreateWriter handles the creation of a new writer
func CreateWriter(c *gin.Context) {
	var writer entity.Writer

	// Bind the incoming JSON data to the Writer struct
	if err := c.ShouldBindJSON(&writer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db := config.DB()
	// Create the writer record in the database, preload the associated User
	if err := db.Preload("User").Preload("User.Coin").Create(&writer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create writer"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Writer created successfully", "writer": writer})
}

// GetWriter fetches a writer by ID
func GetWriter(c *gin.Context) {
	var writer entity.Writer
	id := c.Param("id")
	db := config.DB()
	// Fetch the writer by ID and preload associated User and their Coin
	if err := db.Preload("User").Preload("User.Coin").First(&writer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Writer not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"writer": writer})
}

// UpdateWriter updates an existing writer by ID
func UpdateWriter(c *gin.Context) {
	var writer entity.Writer
	id := c.Param("id")
	db := config.DB()
	// Fetch the existing writer and preload associated User
	if err := db.Preload("User").Preload("User.Coin").First(&writer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Writer not found"})
		return
	}

	// Bind the incoming JSON data to the existing writer
	if err := c.ShouldBindJSON(&writer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Save the updated writer to the database
	if err := db.Preload("User.Coin").Save(&writer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update writer"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Writer updated successfully", "writer": writer})
}

// DeleteWriter deletes a writer by ID
func DeleteWriter(c *gin.Context) {
	var writer entity.Writer
	id := c.Param("id")
	db := config.DB()
	// Fetch the writer by ID
	if err := db.Preload("User.Coin").First(&writer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Writer not found"})
		return
	}

	// Delete the writer record
	if err := db.Preload("User.Coin").Delete(&writer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete writer with ID " + id})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Writer deleted successfully"})
}
