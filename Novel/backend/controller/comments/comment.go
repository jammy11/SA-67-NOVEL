package comments

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "example.com/novel/config"
    "example.com/novel/entity"
)

func GetAll(c *gin.Context) {
    var comments []entity.Comment
    db := config.DB()
    results := db.Find(&comments)
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
    results := db.First(&comment, ID)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, comment)
}
func Update(c *gin.Context) {
    ID := c.Param("id")
    var comment entity.Comment

    db := config.DB()
    result := db.First(&comment, ID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Comment not found"})
        return
    }

    if err := c.ShouldBindJSON(&comment); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
        return
    }

    result = db.Save(&comment)
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
    result := db.Create(&comment)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create comment"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Comment created successfully", "comment": comment})
}


func Delete(c *gin.Context) {
    ID := c.Param("id")
    db := config.DB()

    result := db.Delete(&entity.Comment{}, ID)
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