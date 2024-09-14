package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"example.com/novel/config"
	"example.com/novel/controller/coin"
	"example.com/novel/controller/novels"
	"example.com/novel/controller/orders"
	"example.com/novel/controller/packages"
	"example.com/novel/controller/transactions"
	"example.com/novel/controller/bookshelfs"
	"example.com/novel/controller/users"
	"example.com/novel/controller/writers"
	"example.com/novel/middlewares"
)

const PORT = "8000"

func main() {
	// Open connection to the database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())
	
	r.GET("/public-novels", func(c *gin.Context) {
		novels, err := novels.GetPublicNovels()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(200, gin.H{
			"novels": novels,
		})
	})

	// Auth Routes
	r.POST("/signup", users.SignUp)
	r.POST("/signin", users.SignIn)

	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())

		// User Routes
		router.PUT("/user/:id", users.Update)
		router.GET("/users", users.GetAll)
		router.GET("/user/:id", users.Get)
		router.DELETE("/user/:id", users.Delete)

		// Transaction Routes
		router.POST("/transaction", transactions.Create)
		router.GET("/transactions", transactions.GetAll)
		router.GET("/transactionbyuser/:user_id", transactions.GetTransactionsByUserID)
		router.GET("/transaction/:id", transactions.Get)
		router.PUT("/transaction/:id", transactions.Update)
		router.DELETE("/transaction/:id", transactions.Delete)

		// Order Routes
		router.POST("/order", orders.Create)
		router.GET("/orders", orders.GetAll)
		router.GET("/order/:id", orders.Get)
		router.PUT("/order/:id", orders.Update)
		router.DELETE("/order/:id", orders.Delete)

		// Package Routes
		router.GET("/packages", packages.GetAll)
		router.GET("/package/:id", packages.Get)
		router.PUT("/package/:id", packages.Update)
		router.POST("/package", packages.Create)
		router.DELETE("/package/:id", packages.Delete)

		// Package Coin
		router.GET("/coins", coins.GetAll)
		router.GET("/coin/:id", coins.Get)
		router.PUT("/coins/:id", coins.Update)
		router.DELETE("/coins/:id", coins.Delete)
		
		// Novel Routes
		router.GET("/novels", novels.GetAll)                    // ดึงนิยายทั้งหมด
		router.GET("/novels/:id", novels.Get)                   // ดึงนิยายตาม ID
		// router.GET("/novels/writer/:id", novels.GetNovelsByUser) // ดึงนิยายทั้งหมดตาม Writer ID
		router.PUT("/novels/:id", novels.Update)                // แก้ไขนิยายตาม ID
		router.POST("/novels", novels.Create)                   // เพิ่มนิยายใหม่
		router.DELETE("/novels/:id", novels.Delete)             // ลบนิยายตาม ID


		//Bookshelf Roues
		router.GET("/bookshelf", bookshelf.GetAllBookshelves)
		router.GET("/bookshelf/:id", bookshelf.GetBookshelf)
		router.PUT("/bookshelf/:id", bookshelf.UpdateBookshelf)
		router.POST("/bookshelf", bookshelf.CreateBookshelf)
		router.DELETE("/bookshelf/:id", bookshelf.DeleteBookshelf)

		

		//Writer Roues
		router.GET("/writer", writers.GetAllWriters)

	}

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s นะจ๊ะ", PORT)
	})

	// Run the server
	r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Change "*" to a specific domain if you want to allow credentials
		origin := c.Request.Header.Get("Origin")
		c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
