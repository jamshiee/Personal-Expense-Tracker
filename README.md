# 💰 ExpenseTracker

A full-stack expense tracking application built with Next.js, Express.js, TypeScript, and PostgreSQL. Track your expenses, categorize them, and get insights into your spending patterns.


## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based authentication
- 💳 **Expense Management** - Add, edit, delete expenses
- 📊 **Category Tracking** - Organize expenses by categories (Food, Transport, Bills, Shopping, Others)
- 🔒 **Protected Routes** - Secure pages with authentication middleware
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Notifications**: Sonner

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: Passport.js + JWT
- **Validation**: class-validator
- **Password Hashing**: bcrypt

### Database 
- **Database**: PostgreSQL
- **Process Management**: Nodemon (development)



## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ExpenseTracker.git
cd ExpenseTracker
```

### 2. Set Up the Database

Start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

This will:
- Start a PostgreSQL container on port 5432
- Create the `expense_tracker` database
- Run initialization scripts

### 3. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=expense_tracker

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Server
PORT=5050
```

Start the backend development server:

```bash
npm run dev
```

The backend will be running on `http://localhost:5050`

### 4. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5050/api
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

## 📁 Project Structure

```
ExpenseTracker/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── config/         # Database and Passport configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── entities/       # TypeORM entities
│   │   ├── middlewares/    # Authentication middleware
│   │   ├── routes/         # API routes
│   │   └── types/          # TypeScript type definitions
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── actions/        # Server/Client actions
│   │   ├── app/            # App router pages
│   │   ├── components/     # Reusable UI components
│   │   ├── config/         # Axios configuration
│   │   ├── lib/            # Utility functions
│   │   └── hooks/          # Custom React hooks
│   ├── package.json
│   └── tailwind.config.ts
├── init-scripts/           # Database initialization
├── docker-compose.yml      # Docker services
└── README.md
```

## 🔐 Authentication Flow

1. **Registration**: Users create accounts with email and password
2. **Login**: JWT tokens are issued upon successful authentication
3. **Protected Routes**: Middleware validates tokens for protected endpoints
4. **Token Storage**: Frontend stores JWT in localStorage
5. **Auto-redirect**: Unauthenticated users are redirected to sign-in

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/getuser` - Get current user info

### Expenses
- `GET /api/expenses` - Get user's expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/summary` - Get expense summary by category

## 🔧 Development

### Backend Development

```bash
cd backend
npm run dev        # Start with nodemon (auto-reload)
npm run build      # Build TypeScript
npm start          # Start production server
```

### Frontend Development

```bash
cd frontend
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

### Database Management

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View database logs
docker-compose logs postgres

# Connect to database
docker exec -it expense_tracker_postgres psql -U postgres -d expense_tracker
```



## 🚀 Deployment


### Manual Deployment

1. **Backend**:
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm run build
   npm start
   ```

3. **Database**: Set up PostgreSQL on your production server

## 📝 Environment Variables

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=expense_tracker
JWT_SECRET=your_jwt_secret
PORT=5050
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5050/api
```

