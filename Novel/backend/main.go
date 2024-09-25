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
	"example.com/novel/controller/bookshelfandnovel"
	"example.com/novel/controller/comments"
	"example.com/novel/controller/bookshelf_lists"
	"example.com/novel/controller/like"
	"example.com/novel/controller/users"
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

	r.GET("/packages", packages.GetAll)

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
		router.GET("/novels", novels.GetAll)                    // Get all novels
		router.GET("/novel/:id", novels.Get)                   // Get novel by ID
		router.PUT("/novel_update/:id", novels.Update)                // Update novel by ID
		router.POST("/novel", novels.Create)      
		router.GET("/novels/writer/:id", novels.GetNovelsByUser)              // Create a new novel
		router.DELETE("/novel/:id", novels.Delete)             // Delete novel by ID

		// BookshelfList Routes
		router.GET("/bookshelf_list", bookshelfList.GetAllBookshelves) // List all bookshelf list entries
		router.GET("/bookshelf_list/:id", bookshelfList.GetLBookshelf)  // Get a specific bookshelf list by ID
		router.POST("/bookshelf_list", bookshelfList.CreateLBookshelf)  // Create a new bookshelf list
		router.PUT("/bookshelf_list/:id", bookshelfList.UpdateLBookshelf) // Update a bookshelf list by ID
		router.DELETE("/bookshelf_list/:id", bookshelfList.DeleteLBookshelf) // Delete a bookshelf list by ID

	// BookandNovel Routes
		router.GET("/booknovel/:id", bookandnovel.GetNovelIDsFromBookshelf)
		router.GET("/bookshelves/:bookshelf_id/novelcount",bookandnovel.CountNovelsByBookshelfID)

		// Comment Routes
		router.GET("/comments", comments.GetAll)             // List all comments
    	router.GET("/comments/:id", comments.Get) // Get a specific comment by ID
    	router.POST("/comments", comments.Create)            // Create a new comment
    	router.PUT("/comments/:id", comments.Update)         // Update a comment by ID
    	router.DELETE("/comments/:id", comments.Delete)      // Delete a comment by ID
		router.GET("commentn/:id", comments.GetCommentByNovel)
		router.GET("/commentns/:id", comments.GetCommentIDFromNovel)
		router.GET("/comments/count/:novelID", comments.CountCommentsByNovelID)

			// Like Routes
		router.GET("/likes", like.GetAllLikes)               // List all likes
		router.GET("/likes/:id", like.GetLike)               // Get a specific like by ID
		router.POST("/likes", like.CreateLike)               // Create a new like
		router.GET("/likeser/:id", like.FindLikeByUserIDANovelID) //Get /likeser/123?user_id=456
		router.PUT("/likes", like.UpdateLike)            // Update /likes?user_id=1&novel_id=123
		router.DELETE("/likes", like.DeleteLike)         // DELETE /likes?user_id=1&novel_id=123
		router.GET("/find-like", like.FindLike) // /find-like?user_id=1&novel_id=123
		router.GET("/likes/count/:novelID", like.CountLikeByNovelID)      // Delete a like by ID
	
	
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
