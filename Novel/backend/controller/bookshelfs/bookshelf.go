package bookshelf

import (
	"net/http"
	"example.com/novel/config"
	"example.com/novel/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GetAllBookshelves retrieves all bookshelves along with their associated novels through Bookshelf_List
func GetAllBookshelves(c *gin.Context) {
	var bookshelves []entity.Bookshelf
	db := config.DB()

	// Preload Bookshelf_List to include novels associated with each bookshelf
	err := db.Preload("Novels", func(db *gorm.DB) *gorm.DB {
		return db.Preload("Bookshelf_List.Novel")
	}).Find(&bookshelves).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, bookshelves)
}

// GetBookshelf retrieves a single bookshelf by ID along with its associated novels through Bookshelf_List
func GetBookshelf(c *gin.Context) {
	ID := c.Param("id")
	var bookshelf entity.Bookshelf
	db := config.DB()

	err := db.Preload("Novels", func(db *gorm.DB) *gorm.DB {
		return db.Preload("Bookshelf_List.Novel")
	}).First(&bookshelf, ID).Error

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Bookshelf not found"})
		return
	}

	c.JSON(http.StatusOK, bookshelf)
}

// CreateBookshelf creates a new bookshelf without any associated novels initially
func CreateBookshelf(c *gin.Context) {
	var bookshelf entity.Bookshelf

	if err := c.ShouldBindJSON(&bookshelf); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}

	db := config.DB()
	if err := db.Create(&bookshelf).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create bookshelf"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Bookshelf created successfully", "bookshelf": bookshelf})
}

// UpdateBookshelf updates the details of a bookshelf
func UpdateBookshelf(c *gin.Context) {
	ID := c.Param("id")
	var bookshelf entity.Bookshelf

	db := config.DB()
	err := db.First(&bookshelf, ID).Error
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Bookshelf not found"})
		return
	}

	if err := c.ShouldBindJSON(&bookshelf); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}

	if err := db.Save(&bookshelf).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update bookshelf"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Bookshelf updated successfully", "bookshelf": bookshelf})
}

// DeleteBookshelf deletes a bookshelf by ID
func DeleteBookshelf(c *gin.Context) {
	ID := c.Param("id")
	db := config.DB()

	result := db.Delete(&entity.Bookshelf{}, ID)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete bookshelf"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Bookshelf not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Bookshelf deleted successfully"})
}
