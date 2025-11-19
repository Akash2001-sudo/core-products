# Node.js CRUD API

A simple CRUD API built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a .env file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/node-crud-api
   ```

3. Make sure MongoDB is running on your local machine or update the MONGO_URI in .env to point to your MongoDB instance.

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Products

- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get a single product
- POST `/api/products` - Create a new product
- PUT `/api/products/:id` - Update a product
- DELETE `/api/products/:id` - Delete a product

### Request Body Format (POST/PUT)

```json
{
    "name": "Product Name",
    "description": "Product Description",
    "price": 99.99
}
```






