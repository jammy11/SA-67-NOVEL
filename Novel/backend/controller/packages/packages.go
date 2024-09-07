package packages

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "example.com/novel/config"
    "example.com/novel/entity"
)

func GetAll(c *gin.Context) {
    var packages []entity.Package
    db := config.DB()
    results := db.Find(&packages)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, packages)
}

func Get(c *gin.Context) {
    ID := c.Param("id")
    var pack entity.Package
    db := config.DB()
    results := db.First(&pack, ID)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, pack)
}
func Update(c *gin.Context) {
    ID := c.Param("id")
    var pack entity.Package

    db := config.DB()
    result := db.First(&pack, ID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Package not found"})
        return
    }

    if err := c.ShouldBindJSON(&pack); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
        return
    }

    result = db.Save(&pack)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update package"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Package updated successfully"})
}

func Create(c *gin.Context) {
    var pack entity.Package

    if err := c.ShouldBindJSON(&pack); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
        return
    }

    db := config.DB()
    result := db.Create(&pack)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create package"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Package created successfully", "package": pack})
}


func Delete(c *gin.Context) {
    ID := c.Param("id")
    db := config.DB()

    result := db.Delete(&entity.Package{}, ID)
    if result.RowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Package not found"})
        return
    }

    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete package"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Package deleted successfully"})
}