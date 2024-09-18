package comments

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "example.com/novel/config"
    "example.com/novel/entity"
    "strconv"
)

func GetAll(c *gin.Context) {
    var comments []entity.Comment
    db := config.DB()
    results := db.Preload("User").Find(&comments)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, comments)
}

func Get(c *gin.Context) {
    ID := c.Param("id")
    var comment entity.Comment
    db := config.DB()
    results := db.Preload("User").First(&comment, ID)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"comment":comment} )
}

func GetCommentIDFromNovel(c *gin.Context) {
	// Get the NovelID from the URL parameters
	NovelID := c.Param("id")

	// Convert NovelID to integer
	id, err := strconv.Atoi(NovelID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid NovelID format"})
		return
	}

	// Define a slice to hold comments
	var commentList []entity.Comment
	db := config.DB()

	// Query to find comments associated with the given NovelID
	results := db.Where("novel_id = ?", id).Find(&commentList)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No comments found for the given NovelID"})
		return
	}

	// Check if any entries were found
	if len(commentList) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "No comments found for the given NovelID"})
		return
	}

	// Extract comment IDs from the list
	var commentIDs []uint
	for _, entry := range commentList {
		commentIDs = append(commentIDs, entry.ID) // Assuming `ID` is the primary key of the comment
	}

	// Return the list of comment IDs
	c.JSON(http.StatusOK, gin.H{"comment_ids": commentIDs})
}

func GetCommentByNovel(c *gin.Context) {
    novelID := c.Param("id")  // Get the NovelID from the request parameters
    var comments []entity.Comment  // Slice to hold multiple comments

    db := config.DB()
    
    // Find all comments associated with the NovelID
    results := db.Where("novel_id = ?", novelID).Preload("User").Find(&comments)
    
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    if len(comments) == 0 {
        c.JSON(http.StatusNotFound, gin.H{"message": "No comments found for this novel"})
        return
    }

    c.JSON(http.StatusOK, comments)  // Return the list of comments
}

func GetCommentsByNovelID(c *gin.Context) {
    novelID := c.Param("novelID")
    var comments []entity.Comment
    db := config.DB()
    if err := db.Preload("User").Where("novel_id = ?", novelID).Find(&comments).Error; err != nil {
      c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
      return
    }
    c.JSON(http.StatusOK, comments)
  }

func CountCommentsByNovelID(c *gin.Context) {
    novelID := c.Param("novelID")
    var count int64
    db := config.DB()
    
    if err := db.Model(&entity.Comment{}).Where("novel_id = ?", novelID).Count(&count).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"commentCount": count})
}

func Update(c *gin.Context) {
    ID := c.Param("id")
    var comment entity.Comment

    db := config.DB()
    result := db.Preload("User").First(&comment, ID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Comment not found"})
        return
    }

    if err := c.ShouldBindJSON(&comment); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
        return
    }

    result = db.Preload("User").Save(&comment)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update comment"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Comment updated successfully"})
}

func Create(c *gin.Context) {
    var comment entity.Comment

    if err := c.ShouldBindJSON(&comment); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
        return
    }

    db := config.DB()
    result := db.Preload("User").Create(&comment)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create comment"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Comment created successfully", "comment": comment})
}


func Delete(c *gin.Context) {
    ID := c.Param("id")
    db := config.DB()

    result := db.Preload("User").Delete(&entity.Comment{}, ID)
    if result.RowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Comment not found"})
        return
    }

    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete comment"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Comment deleted successfully"})
}