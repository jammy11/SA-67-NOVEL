package novels

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "example.com/novel/config"
    "example.com/novel/entity"
)

func GetAll(c *gin.Context) {
    var novels []entity.Novel
    db := config.DB()
    results := db.Find(&novels)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, novels)
}

func Get(c *gin.Context) {
    ID := c.Param("id")
    var novel entity.Novel
    db := config.DB()
    results := db.First(&novel, ID)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, novel)
}
func Update(c *gin.Context) {
    ID := c.Param("id")
    var novel entity.Novel

    db := config.DB()
    result := db.First(&novel, ID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Novel not found"})
        return
    }

    if err := c.ShouldBindJSON(&novel); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
        return
    }

    result = db.Save(&novel)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update novel"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Novel updated successfully"})
}

func Create(c *gin.Context) {
    var novel entity.Novel

    if err := c.ShouldBindJSON(&novel); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
        return
    }

    db := config.DB()
    result := db.Create(&novel)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create novel"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Novel created successfully", "novel": novel})
}


func Delete(c *gin.Context) {
    ID := c.Param("id")
    db := config.DB()

    result := db.Delete(&entity.Novel{}, ID)
    if result.RowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Novel not found"})
        return
    }

    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete novel"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Novel deleted successfully"})
}