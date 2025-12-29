---
description: Deploy the backend API to Render
---

# Deploy Backend to Render

Follow these steps to deploy your backend to Render.com.

## Prerequisite: Push to GitHub
Ensure your latest code is committed and pushed to your GitHub repository.

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

## Option 1: Using Blueprint (Recommended)
This uses the configured `render.yaml` file in your repository.

1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Blueprint**.
3. Connect your GitHub repository `Vouchify-main`.
4. Render will automatically detect the `render.yaml` file.
5. You will be prompted to enter values for the "sync: false" environment variables:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A strong secret key for authentication.
   - `ENCRYPTION_KEY`: A 32-byte hex string for encryption.
   - `SMTP_USER`: Your email for sending notifications.
   - `SMTP_PASS`: Your email app password.
6. Click **Apply Blueprint**.

## Option 2: Manual Setup
If Blueprint doesn't work, set it up manually:

1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Configure the service:
   - **Name:** `vouchify-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Scroll down to **Environment Variables** and add:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: (Your MongoDB URI)
   - `JWT_SECRET`: (Your Secret)
   - `FRONTEND_URL`: (Your Frontend URL, e.g., on Vercel)
6. Click **Create Web Service**.

## verification
Once deployed, Render will provide a URL (e.g., `https://vouchify-backend.onrender.com`).
Test it by visiting: `https://vouchify-backend.onrender.com/health`
