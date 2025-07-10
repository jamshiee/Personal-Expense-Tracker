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

