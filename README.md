# Kharidari - Shopping Cart System

A full-stack e-commerce shopping cart application built with React.js, Tailwind CSS, Node.js, Express.js, MongoDB, and JWT authentication.

## Features

- ✅ User authentication (Register/Login) with JWT
- ✅ Product browsing with search and category filters
- ✅ Shopping cart functionality (add, update quantity, remove items)
- ✅ Secure checkout process
- ✅ Order management and tracking
- ✅ Product recommendations based on purchase history
- ✅ Responsive design with Tailwind CSS
- ✅ Real-time cart updates

## Tech Stack

### Frontend

- React.js 18
- React Router DOM
- Tailwind CSS
- Axios
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- bcryptjs for password hashing
- Express Validator

## Project Structure

```
shopping-Cart-System/
├── backend/
│   ├── models/          # MongoDB models (User, Product, Cart, Order)
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── scripts/         # Seed script for sample data
│   ├── server.js        # Express server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context (Auth, Cart)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Local Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shopping-Cart-System
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file
cp .env.example .env
```

Edit the `.env` file with your MongoDB connection string:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopping-cart?retryWrites=true&w=majority
```

### 3. Seed the Database

```bash
# Run the seed script to populate sample products
node scripts/seed.js
```

### 4. Start the Backend Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### 5. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 6. Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products

- `GET /api/products` - Get all products (with pagination, search, category filter)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories/list` - Get all categories

### Cart (Protected)

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders (Protected)

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/pay` - Mark order as paid

### Recommendations (Protected)

- `GET /api/recommendations` - Get personalized recommendations
- `GET /api/recommendations/popular` - Get popular products

## Deployment to Netlify

### Backend Deployment

The backend needs to be deployed separately. Netlify is primarily for frontend hosting. For backend, consider:

1. **Heroku** (Recommended for backend)
2. **Railway**
3. **Render**
4. **DigitalOcean App Platform**

#### Deploying Backend to Heroku:

```bash
# Install Heroku CLI and login
heroku login

# Create a new Heroku app
cd backend
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_connection_string
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Frontend Deployment to Netlify

#### Option 1: Using Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Navigate to frontend directory
cd frontend

# Build the project
npm run build

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

#### Option 2: Using Netlify Dashboard

1. **Build the Frontend:**

   ```bash
   cd frontend
   npm run build
   ```

2. **Create `netlify.toml` file** in the frontend directory:

   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Update API Base URL:**

   Create a `.env.production` file in the frontend directory:

   ```env
   VITE_API_URL=https://your-backend-url.herokuapp.com
   ```

   Update `vite.config.js` to use the environment variable:

   ```js
   export default defineConfig({
     plugins: [react()],
     server: {
       port: 3000,
       proxy: {
         "/api": {
           target: import.meta.env.VITE_API_URL || "http://localhost:5000",
           changeOrigin: true,
         },
       },
     },
   });
   ```

4. **Deploy to Netlify:**

   - Go to [Netlify](https://www.netlify.com/)
   - Sign up/Login
   - Click "Add new site" → "Deploy manually"
   - Drag and drop the `dist` folder from your frontend directory
   - Or connect your Git repository for automatic deployments

5. **Set Environment Variables in Netlify:**
   - Go to Site settings → Environment variables
   - Add `VITE_API_URL` with your backend URL

#### Option 3: Using Git Integration (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect to Netlify:**

   - Login to Netlify
   - Click "New site from Git"
   - Connect your repository
   - Set build settings:
     - **Base directory:** `frontend`
     - **Build command:** `npm run build`
     - **Publish directory:** `frontend/dist`

3. **Add Environment Variables:**

   - Site settings → Environment variables
   - Add `VITE_API_URL` = `https://your-backend-url.herokuapp.com`

4. **Add `_redirects` file** in `frontend/public/`:

   ```
   /*    /index.html   200
   ```

5. **Deploy!** Netlify will automatically build and deploy your site.

### Post-Deployment Steps

1. **Update CORS settings** in backend `server.js`:

   ```js
   const corsOptions = {
     origin:
       process.env.NODE_ENV === "production"
         ? ["https://your-netlify-app.netlify.app"]
         : ["http://localhost:3000"],
     credentials: true,
   };
   app.use(cors(corsOptions));
   ```

2. **Configure Frontend API URL:**

   In production, the frontend needs to call your backend API. You have two options:

   **Option A: Environment Variable (Recommended)**

   - Set `VITE_API_URL` in Netlify environment variables
   - Update axios calls to use: `axios.get(\`${import.meta.env.VITE_API_URL}/api/endpoint\`)`

   **Option B: Netlify Redirects**

   - Add to `netlify.toml`:

   ```toml
   [[redirects]]
     from = "/api/*"
     to = "https://your-backend.herokuapp.com/api/:splat"
     status = 200
     force = true
   ```

   - This allows keeping `/api` calls in the frontend code

3. **Test the deployed application**

## Environment Variables

### Backend (.env)

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

### Frontend (.env.production)

- `VITE_API_URL` - Backend API URL for production

## Default Test Credentials

After seeding, you can create a new account through the registration page.

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running locally, or
- Check your MongoDB Atlas connection string
- Verify network access in MongoDB Atlas if using cloud

### CORS Errors

- Update CORS settings in `backend/server.js` to include your frontend URL

### Build Errors

- Ensure all dependencies are installed (`npm install`)
- Check Node.js version compatibility
- Clear `node_modules` and reinstall if needed

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue in the repository.
