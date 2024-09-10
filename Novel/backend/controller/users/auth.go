package users

import (
	"errors"
	"net/http"
	"time"

	"example.com/novel/config"
	"example.com/novel/entity"
	"example.com/novel/services"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type (
	Authen struct {
		Username string `json:"user_name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	signUp struct {
		Username    string    `json:"user_name"`
		Password    string    `json:"password"`
		Email       string    `json:"email"`
		FirstName   string    `json:"first_name"`
		LastName    string    `json:"last_name"`
		BirthDate   time.Time `json:"birth_date"`
		Gender      string    `json:"gender"`

	}
)

func SignUp(c *gin.Context) {
	var payload signUp

	// Bind JSON payload to the struct
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()
	var userCheck entity.User

	// Check if the user with the provided email or username already exists
	result := db.Where("email = ? OR username = ?", payload.Email, payload.Username).First(&userCheck)
	if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if userCheck.ID != 0 {
		if userCheck.Email == payload.Email {
			// If the user with the provided email already exists
			c.JSON(http.StatusConflict, gin.H{"error": "Email is already registered"})
		} else if userCheck.Username == payload.Username {
			// If the user with the provided username already exists
			c.JSON(http.StatusConflict, gin.H{"error": "Username is already taken"})
		}
		return
	}

	// Hash the user's password
	hashedPassword, err := config.HashPassword(payload.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// Create a new Coin entry
	coin := entity.Coin{
		Balance: 0, // Default balance
	}
	if err := db.Create(&coin).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create coin"})
		return
	}

	// Create a new Bookshelf entry for the user
	bookshelf := entity.Bookshelf{}
	if err := db.Create(&bookshelf).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create bookshelf"})
		return
	}

	// Create a new user
	user := entity.User{
		Username:    payload.Username,
		FirstName:   payload.FirstName,
		LastName:    payload.LastName,
		Email:       payload.Email,
		BirthDate:   payload.BirthDate,
		Gender:      payload.Gender,
		Password:    hashedPassword,
		CoinID:      coin.ID,         // Link the Coin with the User
		BookshelfID: bookshelf.ID,    // Link the Bookshelf with the User
	}

	// Save the user to the database
	if err := db.Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Sign-up successful"})
}

func SignIn(c *gin.Context) {
	var payload Authen
	var user entity.User

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find user by Email or Username
	if err := config.DB().Where("email = ? OR username = ?", payload.Email, payload.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// Check password
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incorrect"})
		return
	}

	// Generate JWT token
	jwtWrapper := services.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(user.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token_type": "Bearer", "token": signedToken, "id": user.ID})
}

