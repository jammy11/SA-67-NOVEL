package orders

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "example.com/novel/config"
    "example.com/novel/entity"
)

// Create สร้าง Order ใหม่
func Create(c *gin.Context) {
    var order entity.Order

    // ผูก JSON payload กับ struct Order
    if err := c.ShouldBindJSON(&order); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
        return
    }

    db := config.DB()

    // ตรวจสอบความถูกต้องของ Foreign Keys (ถ้ามี)
    if order.UserID != 0 {
        var user entity.User
        if err := db.First(&user, order.UserID).Error; err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UserID"})
            return
        }
    }

    // สร้าง Order ในฐานข้อมูล
    if err := db.Create(&order).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
        return
    }

    c.JSON(http.StatusCreated, order)
}

// GetAll ดึง Order ทั้งหมด
func GetAll(c *gin.Context) {
    var orders []entity.Order
    db := config.DB()
    results := db.Preload("User").Preload("Transactions").Find(&orders)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, orders)
}

// Get ดึง Order ตาม ID
func Get(c *gin.Context) {
    ID := c.Param("id")
    var order entity.Order
    db := config.DB()
    results := db.Preload("User").Preload("Transactions").First(&order, ID)
    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }
    c.JSON(http.StatusOK, order)
}

// Update อัพเดท Order ตาม ID
func Update(c *gin.Context) {
    var order entity.Order
    OrderID := c.Param("id")
    db := config.DB()
    result := db.First(&order, OrderID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
        return
    }
    if err := c.ShouldBindJSON(&order); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
        return
    }
    result = db.Save(&order)
    if result.Error != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// Delete ลบ Order ตาม ID
func Delete(c *gin.Context) {
    id := c.Param("id")
    db := config.DB()
    if tx := db.Exec("DELETE FROM orders WHERE id = ?", id); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}
