# Giri Logistics — MERN Stack Website

A full-stack logistics website built with **MongoDB, Express, React, Node.js**.

---

## 📁 Project Structure

```
giri-logistics/
├── server/                  ← Express + MongoDB backend
│   ├── index.js             ← Entry point
│   ├── models/Enquiry.js    ← Mongoose schema
│   └── routes/enquiry.js   ← POST/GET /api/enquiry
└── client/                  ← React frontend
    └── src/components/
        ├── Navbar
        ├── Hero
        ├── Ticker
        ├── Services
        ├── About
        ├── Contact          ← Saves to DB + opens WhatsApp
        └── Footer
```

---

## ⚙️ Local Setup

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/giri-logistics.git
cd giri-logistics

# Install server dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your MongoDB URI
```

Your `.env` should look like:
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/girilogistics
NODE_ENV=development
```

### 3. Update your WhatsApp number

In `client/src/components/Contact.js`, update:
```js
const WHATSAPP_NUMBER = '919876543210'; // ← replace with real number (country code + number)
```

### 4. Run in development

```bash
npm run dev
```

This starts both the Express server (port 5000) and React app (port 3000) concurrently.

---

## 🚀 Deploying to Render (Recommended — Free Tier)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Add environment variables:
   - `MONGO_URI` → your MongoDB Atlas connection string
   - `NODE_ENV` → `production`
6. Deploy!

Render auto-deploys every time you push to `main` ✅

---

## 🚀 Deploying to Railway (Alternative)

1. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Add environment variables in the dashboard
3. Railway auto-deploys on every push ✅

---

## 🔄 Auto-Deploy Workflow

Once deployed on Render or Railway:
- Push changes to `main` branch → site auto-updates within ~2 minutes
- No manual deployment needed

---

## 🗃️ MongoDB Atlas Setup

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Free tier
2. Create a cluster → Get connection string
3. Paste into your `MONGO_URI` env variable
4. All form submissions from the website are saved to the `enquiries` collection

---

## ✏️ Common Customisations

| What to change | Where |
|---|---|
| WhatsApp number | `client/src/components/Contact.js` |
| Phone / email / address | `client/src/components/Contact.js` |
| Stats (350+ routes, 12+ years) | `client/src/components/Hero.js` |
| Services list | `client/src/components/Services.js` |
| About text | `client/src/components/About.js` |
| Brand name | `client/src/components/Navbar.js` + `Footer.js` |
