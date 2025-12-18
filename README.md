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

````
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
### Frontend Deployment

Frontend hosting is independent from the backend and can be deployed to any static host (Netlify, Vercel, Surge, GitHub Pages, or an S3/CloudFront setup). Netlify-specific configuration files have been removed from this repository (`frontend/netlify.toml` and `frontend/public/_redirects`).

General steps to deploy the frontend:

- Build the production bundle:

  ```bash
  cd frontend
  npm run build
````

- Configure your host to publish the `dist` folder (set build command `npm run build` and publish directory `frontend/dist`).
- Set the production API base URL using the `VITE_API_URL` environment variable in your host's environment settings (e.g. `https://your-backend-url.onrender.com`).

If you previously had a Netlify site and want to remove it entirely, follow the Netlify deletion steps below.

- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products

- `GET /api/products` - Get all products (with pagination, search, category filter)
- `GET /api/products/:id` - Get single product

# Kharidari - Shopping Cart System

A full-stack e-commerce shopping cart application built with React, Tailwind CSS, Node.js, Express, MongoDB, and JWT authentication.

## Features

- User authentication (Register/Login) with JWT
- Product browsing with search and category filters
- Shopping cart functionality (add, update quantity, remove items)
- Secure checkout process
- Order management and tracking
- Product recommendations based on purchase history
- Responsive design with Tailwind CSS

## Tech Stack

- Frontend: React 18, Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB (Mongoose)

## Project Structure

```
shopping-Cart-System/
├── backend/
├── frontend/
└── README.md
```

## Frontend Deployment (Vercel)

This repository no longer contains Netlify-specific configuration. To deploy the frontend on Vercel:

1. Push your repo to GitHub, GitLab, or Bitbucket (if not already pushed).
2. Go to https://vercel.com and import your project.

Recommended Vercel settings for this project (frontend subfolder):

- Root directory: `frontend` (set this in the import settings)
- Framework Preset: `Vite` or `Other`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables: add `VITE_API_URL` with your backend URL (e.g. `https://your-backend.onrender.com`)

Alternative (Vercel CLI):

```bash
# from repo root
npm i -g vercel
cd frontend
vercel login
vercel --prod
```

Notes:

- Ensure `VITE_API_URL` is set in Vercel's Project → Settings → Environment Variables.
- If your backend is on Render, use its URL as `VITE_API_URL` (for example: `https://kharidari-backend.onrender.com`).

## Backend (Render)

Keep your backend deployed on Render (or any other provider). Make sure the backend URL is set as `VITE_API_URL` in Vercel so the frontend calls the correct API.

Update CORS in `backend/server.js` to accept the deployed frontend origin. Example:

```js
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [process.env.FRONTEND_URL] // set FRONTEND_URL to your Vercel URL in Render/Env
      : ["http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));
```

Set `FRONTEND_URL` in your backend host's environment variables to your Vercel deployment URL.

## Build & Run Locally

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
npm install
# set .env then
npm run dev
```

## Environment Variables

- Backend (`backend/.env`): `PORT`, `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`
- Frontend (`frontend/.env.production` or Vercel env): `VITE_API_URL`

## Support

If you want, I can:

- Remove any leftover Netlify files from the repo entirely (already removed from `frontend/`).
- Add a short `vercel.json` or a project README snippet for Vercel-specific settings.
- Provide the exact `vercel` CLI commands and help run the deploy interactively.

Open an issue if you need help with deployment details or CORS configuration.
