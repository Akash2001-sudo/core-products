# core-products — Node.js CRUD API

A small REST API for managing products, built with Node.js, Express, and MongoDB.

## Features

- CRUD for products
- Pagination on list endpoints
- Validation to prevent duplicate product names (case-insensitive)
- Consistent JSON responses that include a numeric `status` field

## Prerequisites

- Node.js (v14+ recommended)
- npm
- MongoDB instance (local or remote)

## Setup

1. Install dependencies

```powershell
npm install
```

2. Create a `.env` file in the project root with these variables (example):

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/node-crud-api
```

3. Ensure MongoDB is running or point `MONGO_URI` to a reachable MongoDB server.

## Running

Development (with nodemon if configured):

```powershell
npm run dev
```

Production:

```powershell
npm start
```

The server defaults to port `5000` (or the value of `PORT` in `.env`).

## API

Base path: `/api/products`

- GET `/api/products` — List products
  - Supports pagination with `page` and `limit` query params. Defaults: `page=1`, `limit=10`.
  - Example: `/api/products?page=2&limit=5`
  - Response shape (200):

```json
{
  "products": [ /* array of product objects */ ],
  "page": 2,
  "pages": 4,
  "total": 20
}
```

- GET `/api/products/:id` — Get a single product

- POST `/api/products` — Create a new product
  - Required JSON body:

```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99
}
```
  - Duplicate names are not allowed (case-insensitive). If a product with the same name already exists, the API returns `400` with a JSON body containing `status` and `message`.
  - Successful create response (201):

```json
{
  "status": 201,
  "product": { /* created product object */ }
}
```

- PUT `/api/products/:id` — Update a product
- DELETE `/api/products/:id` — Delete a product

## Validation & Responses

- Validation errors and duplicate errors return a JSON body with a numeric `status` field and a `message`.

Example duplicate response (400):

```json
{
  "status": 400,
  "message": "Product with this name already exists"
}
```

Example validation error (400):

```json
{
  "status": 400,
  "message": "Name, description and price are required"
}
```

Note: The error middleware also includes a `stack` field in non-production environments.

## Database Index / Migration

The `name` field has a unique index in the schema. If you have existing data that may contain duplicates, ensure you clean duplicates before relying on the unique index, or create the index with `background: true` and handle errors. Example to create index manually in a Mongo shell or migration:

```js
db.products.createIndex({ name: 1 }, { unique: true, background: true })
```

## Testing the API (quick)

From another terminal after starting the server:

```powershell
# create
Invoke-RestMethod -Method Post -Uri http://localhost:5000/api/products -ContentType 'application/json' -Body '{"name":"Test","description":"x","price":1}'

# list
Invoke-RestMethod -Method Get -Uri 'http://localhost:5000/api/products?page=1&limit=5'
```

## Contributing

- Open an issue or PR. Keep changes focused and include tests where appropriate.

## License

- (Add your license information here)
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






