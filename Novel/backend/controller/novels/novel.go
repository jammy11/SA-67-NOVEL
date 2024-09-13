package novels

import (
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
    "example.com/novel/config"
    "example.com/novel/entity"
)

// GetAll returns all novels
func GetAll(c *gin.Context) {
    var novels []entity.Novel
    db := config.DB()

    results := db.Preload("Bookshelves").Preload("CommentUsers").Preload("LikedUsers").Preload("Writer").Find(&novels)

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"novels": novels})
}

// Get returns a novel by ID
func Get(c *gin.Context) {
    ID, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    var novel entity.Novel
    db := config.DB()

    results := db.Preload("Writer").Preload("Bookshelf").First(&novel, ID)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"novel": novel})
}
//GETNOVELBYuserID
func GetNovelsByUser(c *gin.Context) { 
    // รับ UserID จากพารามิเตอร์ของ URL
    userIDStr := c.Param("id")
    userID, err := strconv.Atoi(userIDStr)
    if err != nil {
        // หากแปลงค่าล้มเหลว ให้ตอบกลับ HTTP 400 (Bad Request)
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User ID"})
        return
    }

    // สร้างตัวแปรเพื่อเก็บรายการนิยาย
    var novels []entity.Novel

    // เชื่อมต่อฐานข้อมูล
    db := config.DB()

    // ค้นหานิยายทั้งหมดที่เชื่อมโยงกับ UserID ที่ได้รับ
    results := db.Where("writer_id = ?", userID).
        Preload("Writer").            // preload ความสัมพันธ์กับ Writer (User ที่เขียนนิยาย)
        Preload("CommentUsers").      // preload ความสัมพันธ์กับผู้ใช้ที่คอมเมนต์นิยาย
        Preload("Bookshelves").       // preload ความสัมพันธ์กับ Bookshelf
        Find(&novels)

    // ตรวจสอบข้อผิดพลาด
    if results.Error != nil {
        // หากเกิดข้อผิดพลาดในการค้นหา ให้ตอบกลับ HTTP 500 (Internal Server Error)
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }

    // ส่งข้อมูลนิยายกลับไป
    c.JSON(http.StatusOK, novels)
}



// Update modifies an existing novel
func Update(c *gin.Context) {
    ID, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    var novel entity.Novel
    db := config.DB()

    result := db.Preload("Writer").Preload("Bookshelf").First(&novel, ID)
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

    c.JSON(http.StatusOK, gin.H{"message": "Novel updated successfully", "novel": novel})
}

// Create adds a new novel
func Create(c *gin.Context) {
    var novel entity.Novel

    if err := c.ShouldBindJSON(&novel); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
        return
    }

    db := config.DB()

    result := db.Preload("Writer").Preload("Bookshelf").Create(&novel)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create novel"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Novel created successfully", "novel": novel})
}

// Delete removes a novel by ID
func Delete(c *gin.Context) {
    ID, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    db := config.DB()

    result := db.Preload("Writer").Preload("Bookshelf").Delete(&entity.Novel{}, ID)
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
