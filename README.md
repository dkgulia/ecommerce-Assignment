Introduction

This project is an eCommerce platform built using modern web technologies like Next.js for the frontend, Fastify for the backend, and PostgreSQL for the database. The application allows users to browse products, add them to the cart, and place orders. The platform also includes user authentication, product management, and order place features.

Features

User authentication (Sign up, Login)
Product listing and searching
Add to Cart functionality
Order placement and order history
Responsive design using Material-UI
Secure RESTful APIs using Fastify

Technologies Used

Frontend: Next.js, React, TypeScript, Material-UI
Backend: Fastify, Node.js, TypeScript
Database: PostgreSQL
Styling:  Material-UI
API Testing: Postman

Backend Setup

Navigate to the backend directory:

cd ecommerce-platform
cd backend

Install the required dependencies:

npm install 

Create a .env file and configure your environment variables:

DATABASE_URL=postgresql://username:password@localhost:5432/ecommerceDb
PORT=3001
JWT_SECRET=your_jwt_secret


Start the Fastify server:

npm run dev


Frontend Setup

Navigate to the frontend directory:

cd ecommerce-platform

Install the required dependencies:

npm install

Start the Next.js development server:

npm run dev


API Endpoints

User Routes

POST /signup: Register a new user.
POST /login: Authenticate a user and return a JWT.
GET /user: Get the authenticated user's details.
Product Routes

GET /products: Fetch a list of all products.
POST /products: Create a new product (admin only).
PUT /products/:id: Update product details (admin only).
DELETE /products/:id: Delete a product (admin only).
Order Routes

POST /orders: Place an order.
GET /orders: Get a list of orders for the authenticated user.


Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

License

This project is licensed under the MIT License - see the LICENSE file for details.

Contact

For any inquiries or issues, please contact:

Name: Deepak Gulia
Email: deepakgulia0809@gmail.com
GitHub: dkgulia
