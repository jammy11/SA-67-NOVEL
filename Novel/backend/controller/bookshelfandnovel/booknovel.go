package bookandnovel

import (
	"net/http"
	"strconv"

	"example.com/novel/config"
	"example.com/novel/entity"
	"github.com/gin-gonic/gin"
)

// GetNovelIDsFromBookshelf retrieves all NovelIDs from Bookshelf_List entries for a given BookshelfID
func GetNovelIDsFromBookshelf(c *gin.Context) {
	// Parse BookshelfID from URL parameter
	bookshelfID := c.Param("id")

	// Validate that the bookshelfID is a valid integer
	id, err := strconv.Atoi(bookshelfID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid BookshelfID format"})
		return
	}

	var bookshelfList []entity.Bookshelf_List
	db := config.DB()

	// Query for all Bookshelf_List entries with the given BookshelfID
	results := db.Where("bookshelf_id = ?", id).Find(&bookshelfList)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Bookshelf_List entries not found for the given BookshelfID"})
		return
	}

	// Check if any entries were found
	if len(bookshelfList) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "No Bookshelf_List entries found for the given BookshelfID"})
		return
	}

	// Extract NovelIDs from the fetched Bookshelf_List entries
	var novelIDs []uint
	for _, entry := range bookshelfList {
		novelIDs = append(novelIDs, entry.NovelID)
	}

	// Return the list of NovelIDs
	c.JSON(http.StatusOK, gin.H{"novel_ids": novelIDs})
}
