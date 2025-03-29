# Bewakoof Clone

## 📌 Overview
Bewakoof Clone is a full-stack e-commerce web application that allows users to browse, purchase, and review products. Admins can manage products, users, and orders efficiently.

## 🚀 Tech Stack
- **Frontend:** React, React Router, Redux Toolkit
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token) & Refresh Token Mechanism
- **Image Uploads:** Multer, Cloudinary
- **Authorization & Access Control:** Role-based access (Admin, User)

---

## 📌 Backend API Routes

### 🧑‍💻 User Routes
| Method | Endpoint               | Description |
|--------|------------------------|-------------|
| POST   | `/register`            | User Registration |
| POST   | `/login`               | User Login |
| POST   | `/refresh-token`       | Refresh Access Token using Refresh Token |
| POST   | `/logout`              | Logout User (Requires Authentication) |
| GET    | `/profile`             | Get User Profile (Requires Authentication) |
| PATCH  | `/update-profile`      | Update User Profile (Requires Authentication) |
| DELETE | `/delete/:id`          | Delete User (Admin Only) |

### 🔄 Refresh Token Implementation
The refresh token mechanism helps maintain user authentication without requiring frequent logins. 
- When a user logs in, both an access token and a refresh token are generated.
- The access token is used for authentication but expires after a short period.
- The refresh token allows the user to obtain a new access token without re-entering credentials.
- The refresh token is stored securely and sent only when requesting a new access token.
- On logout, the refresh token is invalidated to prevent unauthorized access.

### 🛒 Product Routes
| Method | Endpoint               | Description |
|--------|------------------------|-------------|
| POST   | `/add-product`         | Add New Product (Admin Only) |
| GET    | `/`                    | Get All Products |
| GET    | `/:id`                 | Get Product by ID (Requires Authentication) |
| PUT    | `/update/:id`          | Update Product (Admin Only) |
| DELETE | `/delete/:id`          | Delete Product (Admin Only) |

### 🛍️ Cart Routes
| Method | Endpoint               | Description |
|--------|------------------------|-------------|
| POST   | `/add`                 | Add Product to Cart (User & Admin) |
| GET    | `/`                    | View Cart (User & Admin) |
| POST   | `/remove`              | Remove Item from Cart (User & Admin) |
| DELETE | `/clear`               | Clear Entire Cart (User & Admin) |

### ⭐ Review Routes
| Method | Endpoint               | Description |
|--------|------------------------|-------------|
| POST   | `/add`                 | Add Review (Requires Authentication) |
| GET    | `/:productId`          | Get Reviews for a Product |
| DELETE | `/:reviewId`           | Delete Review (Requires Authentication) |

---

## 🎨 Frontend Routes
| Path | Component |
|------|-----------|
| `/` | Homepage |
| `/login` | LoginPage |
| `/profile` | ProfilePage |
| `/add-product` | AddProduct |
| `/add-to-cart` | AddToCart |
| `/product-detail/:id` | ProductDetail |
| `/products/:string` | ProductPage |

---

## ⚡ Features
✅ User authentication & authorization  
✅ Secure Refresh Token Implementation  
✅ Product CRUD (Admin only)  
✅ Shopping cart functionality  
✅ Product reviews & ratings  
✅ Secure API with JWT authentication  
✅ Image upload support  
✅ Responsive frontend  

---

## 📂 Installation & Setup
```sh
# Clone the repository
git clone https://github.com/Shkmr07/Bewakoof.git

# For Frontend
cd Frontend/bewakoof

# For Backend
cd Backend

# Install dependencies
npm install  # For backend
yarn install # For frontend

# Start backend
npm run server

# Start frontend
yarn start
```

---

## 💡 Contributing
Feel free to contribute to this project by submitting a pull request. Let's build something amazing together! 🚀

---

## 📜 License
This project is licensed under the MIT License.

