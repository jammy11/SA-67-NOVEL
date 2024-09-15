package bookshelfList

import (
	"net/http"
	"example.com/novel/config"
	"example.com/novel/entity"
	"github.com/gin-gonic/gin"
)

// GetAllBookshelves retrieves all Bookshelf_List entries, showing the relationships between bookshelves and novels
func GetAllBookshelves(c *gin.Context) {
	var Lbookshelves []entity.Bookshelf_List
	db := config.DB()

	// Preload Bookshelf and Novel to include their details
	results := db.Preload("Bookshelf").Preload("Novel").Find(&Lbookshelves)
	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, Lbookshelves)
}

// GetLBookshelf retrieves a single Bookshelf_List entry by Bookshelf_ID
func GetLBookshelf(c *gin.Context) {
	ID := c.Param("id")
	var bookshelfList []entity.Bookshelf_List
	db := config.DB()

	// Preload Bookshelf and Novel for the given Bookshelf_List entry
	results := db.Preload("Bookshelf").Preload("Novel").Where("bookshelf_id = ?", ID).Find(&bookshelfList)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Bookshelf_List entry not found"})
		return
	}

	c.JSON(http.StatusOK, bookshelfList)
}



// CreateLBookshelf creates a new Bookshelf_List entry, linking a bookshelf with a novel
func CreateLBookshelf(c *gin.Context) {
	var bookshelfList entity.Bookshelf_List

	// Bind JSON payload to Bookshelf_List struct
	if err := c.ShouldBindJSON(&bookshelfList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}

	db := config.DB()

	// Check if the specified bookshelf and novel exist
	if err := db.First(&entity.Bookshelf{}, bookshelfList.BookshelfID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bookshelf not found"})
		return
	}
	if err := db.First(&entity.Novel{}, bookshelfList.NovelID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Novel not found"})
		return
	}

	// Create the Bookshelf_List entry
	result := db.Create(&bookshelfList)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create Bookshelf_List entry"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Bookshelf_List entry created successfully", "bookshelf_list": bookshelfList})
}

// UpdateLBookshelf updates an existing Bookshelf_List entry
func UpdateLBookshelf(c *gin.Context) {
	ID := c.Param("id")
	var bookshelfList entity.Bookshelf_List

	db := config.DB()

	// Find the existing Bookshelf_List entry
	result := db.First(&bookshelfList, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Bookshelf_List entry not found"})
		return
	}

	// Bind new data to the Bookshelf_List struct
	if err := c.ShouldBindJSON(&bookshelfList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}

	// Save the updated entry
	result = db.Save(&bookshelfList)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update Bookshelf_List entry"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Bookshelf_List entry updated successfully"})
}

// DeleteLBookshelf deletes a Bookshelf_List entry by ID
func DeleteLBookshelf(c *gin.Context) {
	ID := c.Param("id")
	db := config.DB()

	// Delete the Bookshelf_List entry
	result := db.Delete(&entity.Bookshelf_List{}, ID)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete Bookshelf_List entry"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Bookshelf_List entry not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Bookshelf_List entry deleted successfully"})
}