# VoteBackend - Campus Voting and Election System REST API

A secure, scalable Node.js and Express REST API backend powering the Campus Online Voting System.

---

## 🚀 Overview

VoteBackend handles role-based authentication, election management, candidate registration, student authorization, and secure vote balloting and tallying.

- **Authentication & Authorization**: JWT-based authentication with bcrypt password hashing and role-based access control (`admin`, `supervisor`, `candidate`, `student`).
- **Election Management**: Create and configure election phases, candidates, and eligibility rules.
- **Vote Integrity**: Secure balloting preventing duplicate voting with real-time tally tracking.
- **Cloud-Ready**: Prepared for cloud deployment on platforms like Render with dynamic port binding, health checks, and configurable CORS.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **Authentication**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) & [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Configuration**: [dotenv](https://github.com/motdotla/dotenv) & [cors](https://github.com/expressjs/cors)

---

## 📁 Project Structure

```text
Backend/
├── Config/
│   └── db.js                 # MongoDB connection & DNS resolution
├── Controllers/
│   ├── authController.js      # Register, Login, Current User
│   ├── candidateController.js # Candidate CRUD & profile management
│   ├── electionController.js  # Election lifecycle & status
│   ├── studentController.js   # Student roster & verification
│   └── voteController.js      # Balloting & tally results
├── middleware/
│   ├── authMiddleware.js      # JWT token verification
│   └── roleMiddleware.js      # Role-based route guard
├── models/
│   ├── Candidate.js           # Candidate Mongoose schema
│   ├── Election.js            # Election Mongoose schema
│   ├── User.js                # User & student schema with password hashing
│   └── vote.js                # Cast vote schema
├── routes/
│   ├── authRoutes.js          # /api/auth routes
│   ├── CandidateRoutes.js     # /api/candidates routes
│   ├── electionRoutes.js      # /api/elections routes
│   ├── studentRoutes.js       # /api/students routes
│   └── voteRoutes.js          # /api/votes routes
├── utils/
│   └── generateToken.js       # JWT signing utility
├── .env.example               # Template environment variables
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies and scripts
└── server.js                  # Application entry point & Express server
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory following `.env.example`:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Server listening port | `5000` |
| `MONGO_URI` | MongoDB connection connection string | `mongodb+srv://<user>:<password>@cluster0.mongodb.net/?appName=Cluster0` |
| `JWT_SECRET` | Secret key for signing JSON Web Tokens | `your-secure-jwt-secret` |
| `CLIENT_URL` | Allowed frontend URL for CORS | `https://your-frontend.vercel.app,http://localhost:5173` |
| `MONGO_DNS_SERVERS` | (Optional) Fallback DNS servers | `1.1.1.1,8.8.8.8` |

> [!WARNING]
> Never commit actual `.env` files or credentials into source control.

---

## 📡 API Endpoints Summary

### Health & Diagnostic
- `GET /` — API welcome message
- `GET /api/health` — Service health check status

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a student account
- `POST /api/auth/login` — User authentication & JWT generation
- `GET /api/auth/me` — Retrieve current authenticated user profile

### Elections (`/api/elections`)
- `GET /api/elections` — List elections
- `POST /api/elections` — Create election (Admin)
- `GET /api/elections/:id` — Get election details

### Candidates (`/api/candidates`)
- `GET /api/candidates` — List candidates
- `POST /api/candidates` — Nominate candidate
- `GET /api/candidates/:id` — Candidate details

### Voting (`/api/votes`)
- `POST /api/votes` — Cast vote
- `GET /api/votes/history` — Voter history
- `GET /api/votes/results` — Election results tally

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Syntax & Integrity Check
```bash
npm test
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Start Production Server
```bash
npm start
```

---

## ☁️ Deployment on Render

### Render Web Service Settings:
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: Leave blank if repository root contains the backend files.
- **Environment Variables**: Add `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `PORT`.
