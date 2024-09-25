package bookandnovel

import (
	"net/http"
	"strconv"

	"example.com/novel/config"
	"example.com/novel/entity"
	"github.com/gin-gonic/gin"
)

func GetNovelIDsFromBookshelf(c *gin.Context) {
	// Parse BookshelfID from URL parameter
	bookshelfID := c.Param("id")
	
	// Validate that the bookshelfID is a valid integer
	id, err := strconv.Atoi(bookshelfID)
	if err != nil {
	c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid BookshelfID format"})
	return
	}
	
	db := config.DB()
	
	var bookshelfList []entity.Bookshelf_List
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
	
	// Using a map to store unique NovelIDs
	novelIDMap := make(map[uint]bool)
	var invalidBookshelfListIDs []uint
	
	// Extract valid NovelIDs and track invalid ones
	for _, entry := range bookshelfList {
	var novel entity.Novel
	// Check if the Novel still exists in the database
	if err := db.Where("id = ?", entry.NovelID).First(&novel).Error; err != nil {
	// If the Novel doesn't exist, mark the Bookshelf_List entry for deletion
	invalidBookshelfListIDs = append(invalidBookshelfListIDs, entry.ID)
	} else {
	// If the Novel exists, add its NovelID to the map for uniqueness
	novelIDMap[entry.NovelID] = true
	}
	}
	
	// Delete any invalid Bookshelf_List entries
	if len(invalidBookshelfListIDs) > 0 {
	db.Where("id IN (?)", invalidBookshelfListIDs).Delete(&entity.Bookshelf_List{})
	}
	
	// Convert the map keys to a slice to get the unique NovelIDs
	var uniqueNovelIDs []uint
	for novelID := range novelIDMap {
	uniqueNovelIDs = append(uniqueNovelIDs, novelID)
	}
	
	// Return the valid and unique list of NovelIDs
	c.JSON(http.StatusOK, gin.H{"novel_ids": uniqueNovelIDs})
	}
