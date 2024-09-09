package bookshelf

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "example.com/novel/config"
    "example.com/novel/entity"
)

func GetAllBookshelves(c *gin.Context) {
    var bookshelves []entity.Bookshelf
    db := config.DB()

    // Preload novels for each bookshelf
    results := db.Preload("Novel").Preload("Bookshelf").Find(&bookshelves)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, bookshelves)
}
func GetBookshelf(c *gin.Context) {
    ID := c.Param("id")
    var bookshelf entity.Bookshelf
    db := config.DB()

    results := db.Preload("Novel").Preload("Bookshelf").First(&bookshelf, ID)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, bookshelf)
}
func CreateBookshelf(c *gin.Context) {
    var bookshelf entity.Bookshelf

    if err := c.ShouldBindJSON(&bookshelf); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
        return
    }

    db := config.DB()
    result := db.Preload("Novel").Preload("Bookshelf").Create(&bookshelf)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create bookshelf"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Bookshelf created successfully", "bookshelf": bookshelf})
}
func UpdateBookshelf(c *gin.Context) {
    ID := c.Param("id")
    var bookshelf entity.Bookshelf

    db := config.DB()
    result := db.Preload("Novel").Preload("Bookshelf").First(&bookshelf, ID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Bookshelf not found"})
        return
    }

    if err := c.ShouldBindJSON(&bookshelf); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
        return
    }

    result = db.Save(&bookshelf)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update bookshelf"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Bookshelf updated successfully"})
}
func DeleteBookshelf(c *gin.Context) {
    ID := c.Param("id")
    db := config.DB()

    result := db.Preload("Novel").Preload("Bookshelf").Delete(&entity.Bookshelf{}, ID)
    if result.RowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Bookshelf not found"})
        return
    }

    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete bookshelf"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Bookshelf deleted successfully"})
}
