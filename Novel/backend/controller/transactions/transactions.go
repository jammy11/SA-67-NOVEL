package transactions

import (
	"fmt"
	"net/http"

	"example.com/novel/config"
	"example.com/novel/entity"
	"github.com/gin-gonic/gin"
)

// Create สร้าง Transaction ใหม่
func Create(c *gin.Context) {
	var transaction entity.Transaction

	// ผูก JSON payload กับ struct Transaction
	if err := c.ShouldBindJSON(&transaction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	db := config.DB()

	// ตรวจสอบความถูกต้องของ Foreign Keys (ถ้ามี)
	if transaction.PackageID != nil {
		var pack entity.Package
		if err := db.First(&pack, transaction.PackageID).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid PackageID"})
			return
		}
	}

	if transaction.UserID != 0 {
		var user entity.User
		if err := db.First(&user, transaction.UserID).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UserID"})
			return
		}
	}

	if transaction.OrderID != nil {
		var order entity.Order
		if err := db.First(&order, transaction.OrderID).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid OrderID"})
			return
		}
	}

	// สร้าง Transaction ในฐานข้อมูล
	if err := db.Create(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create transaction"})
		return
	}

	c.JSON(http.StatusCreated, transaction)
}

// GetAll ดึง Transaction ทั้งหมด
func GetAll(c *gin.Context) {
	var transactions []entity.Transaction
	db := config.DB()
	results := db.Preload("Package").Preload("User").Preload("Order").Find(&transactions)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, transactions)
}

// Get ดึง Transaction ตาม ID
func Get(c *gin.Context) {
	ID := c.Param("id")
	var transaction entity.Transaction
	db := config.DB()
	results := db.Preload("Package").Preload("User").Preload("Order").First(&transaction, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, transaction)
}
// GetTransactionsByUserID retrieves all Transactions for a specific UserID
func GetTransactionsByUserID(c *gin.Context) {
    userID := c.Param("user_id")
    var transactions []entity.Transaction
    db := config.DB()

    // Enable debugging
    db = db.Debug()

    // Log the userID for debugging
    fmt.Printf("Fetching transactions for UserID: %s\n", userID)

    // Query transactions by UserID and preload related records
    results := db.Preload("Package").Preload("User").Preload("Order").Where("user_id = ?", userID).Find(&transactions)

    // Log the raw SQL query for debugging
    fmt.Printf("SQL Query: %s\n", results.Statement.SQL.String())

    if results.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
        return
    }

    // Check if any transactions were found
    if len(transactions) == 0 {
        c.JSON(http.StatusNotFound, gin.H{"message": "No transactions found for the specified user"})
        return
    }

    c.JSON(http.StatusOK, transactions)
}

// Update อัพเดท Transaction ตาม ID
func Update(c *gin.Context) {
	var transaction entity.Transaction
	TransactionID := c.Param("id")
	db := config.DB()
	result := db.First(&transaction, TransactionID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&transaction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
	result = db.Save(&transaction)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// Delete ลบ Transaction ตาม ID
func Delete(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM transactions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}
