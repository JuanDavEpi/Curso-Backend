# Node.js and Express API for Product and Cart Management

This project is a RESTful API built with Node.js and Express for managing products and shopping carts. It provides endpoints for creating, retrieving, updating, and deleting products, as well as managing shopping carts.

## Project Structure

```
node-express-api
├── src
│   ├── server.js                # Entry point of the application
│   ├── routes                   # Contains route definitions
│   │   ├── products.routes.js   # Routes for managing products
│   │   └── carts.routes.js      # Routes for managing shopping carts
│   ├── controllers              # Contains request handling logic
│   │   ├── products.controller.js# Controller for product-related requests
│   │   └── carts.controller.js   # Controller for cart-related requests
│   ├── services                 # Contains business logic
│   │   ├── products.service.js   # Service for product operations
│   │   └── carts.service.js      # Service for cart operations
│   └── models                   # Defines data structures
│       ├── product.model.js      # Model for product objects
│       └── cart.model.js         # Model for cart objects
├── package.json                 # NPM configuration file
└── README.md                    # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd node-express-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run the following command:
```
npm start
```
The server will listen on port 8080.

## API Endpoints

### Products
- **GET /api/products**: List all products.
- **GET /api/products/:pid**: Retrieve a product by its ID.
- **POST /api/products**: Add a new product.
- **PUT /api/products/:pid**: Update a product by its ID.
- **DELETE /api/products/:pid**: Delete a product by its ID.

### Carts
- **POST /api/carts**: Create a new cart.
- **GET /api/carts/:cid**: List products in a specific cart.
- **POST /api/carts/:cid/product/:pid**: Add a product to a specific cart.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.