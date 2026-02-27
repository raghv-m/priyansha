# Canadian Mortgage Broker Website

A professional mortgage broker website with React/Vite frontend and Express backend, featuring a premium financial design with deep navy (#0F2044) and warm gold (#C9973A) color scheme.

## Features

- Responsive design with premium financial aesthetic
- Mortgage calculator with detailed breakdown
- Lead management system with Google Sheets integration
- Email notifications via SendGrid
- Scroll animations using Intersection Observer API
- Secure form handling with input sanitization
- FSRA compliant mortgage broker platform

## Environment Variables

### Frontend (.env)
```bash
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

### Backend (.env)
```bash
# Server Configuration
PORT=5000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Google Sheets API Configuration
GOOGLE_SHEET_ID=your_google_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email@your_project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# Admin Secret for accessing leads
ADMIN_SECRET=your_admin_secret_here

# Email Configuration (Choose one method)
# Option 1: SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Option 2: SMTP (if not using SendGrid)
# SMTP_HOST=smtp.your-email-provider.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your_smtp_username
# SMTP_PASS=your_smtp_password

# Email Settings
BUSINESS_EMAIL=info@yourcompany.com
EMAIL_FROM="Your Company Name" <noreply@yourcompany.com>
```

## Local Development

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Deployment

### Backend (to Render)

1. Create a new Web Service on Render
2. Connect to your GitHub repository
3. Set the root directory to `/backend`
4. Add the environment variables in the Render dashboard
5. Set Build Command: `npm install`
6. Set Start Command: `npm start`

### Frontend (to Vercel)

1. Create a new project on Vercel
2. Connect to your GitHub repository
3. Set the root directory to `/frontend`
4. Add the environment variables in the Vercel dashboard
5. Set Build Command: `npm run build`
6. Set Output Directory: `dist`

## API Endpoints

- `POST /api/leads` - Submit a new lead
- `GET /health` - Health check endpoint

## Security Features

- Input sanitization on the frontend
- Rate limiting on the backend
- CORS protection
- Admin secret protection for sensitive endpoints
- UUID generation for lead IDs
- Environment validation on startup

## Project Structure

```
mortgage-broker-website/
├── frontend/           # React/Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   └── UI/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── config.js
│   ├── package.json
│   └── vite.config.js
├── backend/            # Express backend
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
└── README.md
```

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Styling**: Tailwind CSS with custom color palette
- **Animations**: Intersection Observer API
- **Email**: SendGrid or SMTP
- **Data Storage**: Google Sheets API
- **Deployment**: Render (backend), Vercel (frontend)