# Vibelearn Production Deployment Guide

This document outlines the complete deployment process for the Vibelearn learning platform.

---

## Architecture Overview

- **Frontend:** React (Vite) Single-Page Application deployed on **Vercel**.
- **Backend:** Node.js / Express REST API deployed on **Render**.
- **Database:** PostgreSQL hosted on **Supabase**, connected via Drizzle ORM.
- **Authentication:** **Clerk** (Publishable Key on client, Secret Key on backend).

---

## 1. Supabase (Database) Setup

1. Log in to [Supabase](https://supabase.com) and create a new project (e.g., `vibelearn`).
2. Navigate to **Project Settings -> Database** and copy the **Connection string (URI)** (Transaction or Session pooler).
3. From your local terminal in `backend/`:
   ```bash
   # Push Drizzle schema tables to Supabase
   DATABASE_URL="your-supabase-connection-string" npm run db:push

   # Seed courses, modules, and lessons into Supabase
   DATABASE_URL="your-supabase-connection-string" npm run db:seed
   ```

---

## 2. Render (Backend) Deployment

1. Log in to [Render](https://render.com) and click **New + -> Web Service**.
2. Connect your GitHub repository: `thichsambath-lab/VIBELEARN`.
3. Configure the service settings:
   - **Name:** `vibelearn-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
4. Add the following **Environment Variables** in the Render Dashboard:
   | Variable | Value / Description |
   | :--- | :--- |
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `DATABASE_URL` | Your live Supabase PostgreSQL connection URI |
   | `CLERK_SECRET_KEY` | Live Clerk Secret Key (`sk_live_...` or `sk_test_...`) |
   | `CLERK_PUBLISHABLE_KEY` | Live Clerk Publishable Key (`pk_live_...` or `pk_test_...`) |
   | `FRONTEND_URL` | Your production Vercel frontend URL (e.g. `https://vibelearn.vercel.app`) |
5. Click **Create Web Service**. Once deployed, copy your backend URL: `https://vibelearn-backend.onrender.com`.

---

## 3. Vercel (Frontend) Deployment

1. Log in to [Vercel](https://vercel.com) and click **Add New... -> Project**.
2. Import the GitHub repository: `thichsambath-lab/VIBELEARN`.
3. In the project setup screen:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add the following **Environment Variables** in the Vercel Dashboard:
   | Variable | Value / Description |
   | :--- | :--- |
   | `VITE_CLERK_PUBLISHABLE_KEY` | Your Clerk Publishable Key (`pk_live_...` or `pk_test_...`) |
   | `VITE_API_URL` | Your live Render backend API URL (e.g. `https://vibelearn-backend.onrender.com/api`) |
5. Click **Deploy**. Vercel will build the project and deploy it with SPA routing configured via `frontend/vercel.json`.

---

## 4. Post-Deployment Verification

1. **Backend Health Check:**
   ```bash
   curl -s https://vibelearn-backend.onrender.com/api/health
   # Expected response: {"status":"ok","timestamp":"...","environment":"production"}
   ```
2. **Catalog API:**
   ```bash
   curl -s https://vibelearn-backend.onrender.com/api/courses
   # Expected response: {"data":[... 10 courses ...]}
   ```
3. **Frontend Access:**
   - Open your production Vercel URL in a browser.
   - Verify course catalog loads from the backend.
   - Verify course detail and lesson pages render videos and notes.
   - Sign in with Clerk and test marking a lesson complete.
