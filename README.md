# 📚 FinEdge API - Backend Documentation for Beginners

Welcome to the FinEdge Personal Finance Tracker API! This documentation explains every component of the backend system in simple terms.

---

## 🎯 What is FinEdge?

FinEdge is a **REST API** that helps you manage personal finances. It lets you:
- Create user accounts
- Track income and expenses
- View financial summaries
- Categorize transactions

Think of it like a digital notebook that calculates money in/out automatically!

---

## 📁 Project Structure Explained

```
backend/
├── src/                          # All application code
│   ├── app.js                    # Main server file (starts everything)
│   ├── middleware/               # Functions that process requests
│   │   ├── errorHandler.js      # Catches and formats errors
│   │   ├── logger.js            # Logs all API activity
│   │   └── validator.js         # Checks if data is valid
│   ├── controllers/              # Handles HTTP requests/responses
│   │   ├── userController.js    # User login/register logic
│   │   ├── transactionController.js # Transaction CRUD logic
│   │   └── healthController.js  # Server status check
│   ├── routes/                   # URL paths for API
│   │   ├── userRoutes.js        # User-related endpoints
│   │   └── transactionRoutes.js # Transaction-related endpoints
│   ├── services/                 # Business logic layer
│   │   ├── userService.js       # User operations (register, login)
│   │   └── transactionService.js # Transaction operations
│   ├── models/                   # Data access layer
│   │   ├── userModel.js         # Read/write user data from JSON
│   │   └── transactionModel.js  # Read/write transaction data from JSON
│   └── utils/                    # Helper functions
├── data/                         # Data storage (JSON files)
│   ├── users.json               # Stores user records
│   └── transactions.json        # Stores transaction records
└── package.json                 # Dependencies and scripts
```

---

## 🧠 Architecture Layers (MVC Pattern)

We use **MVC (Model-View-Controller)** architecture. Here's what each layer does:

### 1. **Controller** (Request Handler)
- **What**: Receives HTTP requests from the client
- **Does**: Calls services to process data and sends responses
- **Example**: When POST `/transactions` arrives, controller calls transaction service

### 2. **Service** (Business Logic)
- **What**: Contains the application logic
- **Does**: Decides what data to create, validate, or calculate
- **Example**: Service checks if user has enough balance before creating expense

### 3. **Model** (Data Access)
- **What**: Talks directly to the database/files
- **Does**: Reads, writes, updates, deletes data
- **Example**: Model saves new transaction to `transactions.json`

### Flow Example:
```
Request → Controller → Service → Model → JSON File
                                 ↑
Response ← Controller ← Service ← Data
```

---

## 🚀 How to Run the Project

### Step 1: Install Dependencies
```bash
cd backend
npm install
```
This downloads all required packages listed in `package.json`.

### Step 2: Set Environment Variables
```bash
cp .env.example .env
```
Edit `.env` and change the JWT_SECRET for security.

### Step 3: Start the Server
```bash
npm run dev
```
The API will run at `http://localhost:5000`

You should see:
```
✅ FinEdge API running on http://localhost:5000
```

---

## 📡 API Endpoints Guide

### **User Management**

#### 1. Register New User
```
POST /users/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}
Response: { "success": true, "data": { "id": "123", "name": "John Doe", ... } }
```
**What it does**: Creates a new user account with encrypted password.

#### 2. Login User
```
POST /users/login
Body: {
  "email": "john@example.com",
  "password": "secure123"
}
Response: { "success": true, "data": { "token": "jwt_token_here", "user": {...} } }
```
**What it does**: Verifies credentials and returns a JWT token for authentication.

#### 3. Get User Profile
```
GET /users/profile
Response: { "success": true, "data": { "id": "123", "name": "John Doe", ... } }
```
**What it does**: Returns the logged-in user's information.

---

### **Transaction Management**

#### 1. Create Transaction
```
POST /transactions
Body: {
  "type": "expense",
  "category": "Food",
  "amount": 50,
  "description": "Lunch at cafe",
  "date": "2024-01-15"
}
Response: { "success": true, "data": { "id": "456", "type": "expense", ... } }
```
**What it does**: Records a new income or expense transaction.

#### 2. Get All Transactions
```
GET /transactions
Response: { "success": true, "data": [{ id: "1", ... }, { id: "2", ... }] }
```
**What it does**: Returns all transactions for the current user.

#### 3. Get Single Transaction
```
GET /transactions/456
Response: { "success": true, "data": { "id": "456", "type": "expense", ... } }
```
**What it does**: Returns details of one specific transaction.

#### 4. Update Transaction
```
PATCH /transactions/456
Body: {
  "amount": 60,
  "description": "Updated lunch amount"
}
Response: { "success": true, "data": { updated transaction } }
```
**What it does**: Modifies an existing transaction.

#### 5. Delete Transaction
```
DELETE /transactions/456
Response: { "success": true, "message": "Transaction deleted successfully" }
```
**What it does**: Removes a transaction permanently.

#### 6. Get Summary
```
GET /transactions/summary/overview
Response: {
  "success": true,
  "data": {
    "totalIncome": 5000,
    "totalExpense": 2000,
    "balance": 3000,
    "categoryBreakdown": { "Food": 500, "Transport": 200, ... }
  }
}
```
**What it does**: Calculates total income, expenses, and category breakdown.

---

## 🔑 Key Concepts Explained

### **What is Async/Await?**
Async/Await allows code to wait for operations without freezing the app.

```javascript
// Reading a file takes time - we "await" it
export const getUserById = async (id) => {
  const user = await userModel.getUserById(id);  // Wait for file read
  return user;
};
```

### **What is Middleware?**
Middleware is code that runs on every request before reaching the controller.

```javascript
// Logger middleware runs for every request
const logger = (req, res, next) => {
  console.log(`[${timestamp}] ${method} ${url}`);
  next();  // Pass control to next middleware/controller
};
```

### **What is Error Handling?**
Catches problems and sends friendly error messages instead of crashing.

```javascript
// Custom error class
export class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

// Usage
if (!user) {
  throw new AppError('User not found', 404);
}
```

### **What is Validation?**
Checks if incoming data is correct before processing.

```javascript
if (!type || !category || !amount) {
  throw new AppError('Missing required fields', 400);
}

if (amount <= 0) {
  throw new AppError('Amount must be positive', 400);
}
```

---

## 🔐 Security Features

### 1. **Password Hashing**
Passwords are encrypted using bcryptjs:
```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```
Even we can't see the actual password!

### 2. **JWT Tokens**
After login, users get a token for authentication:
```javascript
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
```

### 3. **Data Validation**
All inputs are checked before processing to prevent invalid data.

---

## 📊 Data Storage (JSON Files)

### users.json
```json
[
  {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "$2a$10$...",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### transactions.json
```json
[
  {
    "id": "9876543210",
    "userId": "1234567890",
    "type": "expense",
    "category": "Food",
    "amount": 50,
    "description": "Lunch",
    "date": "2024-01-15",
    "createdAt": "2024-01-15T12:00:00Z"
  }
]
```

---

## 🧪 Testing with Postman

### Step 1: Create User
- Method: POST
- URL: `http://localhost:5000/users/register`
- Body (JSON):
```json
{
  "name": "Alice",
  "email": "alice@test.com",
  "password": "pass123"
}
```

### Step 2: Login
- Method: POST
- URL: `http://localhost:5000/users/login`
- Body (JSON):
```json
{
  "email": "alice@test.com",
  "password": "pass123"
}
```

### Step 3: Create Transaction
- Method: POST
- URL: `http://localhost:5000/transactions`
- Body (JSON):
```json
{
  "type": "income",
  "category": "Salary",
  "amount": 5000,
  "description": "Monthly salary"
}
```

### Step 4: Get Summary
- Method: GET
- URL: `http://localhost:5000/transactions/summary/overview`

---

## 🐛 Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| 400 Bad Request | Missing required fields | Check all required fields are provided |
| 401 Unauthorized | Wrong password or email | Verify credentials match |
| 404 Not Found | Resource doesn't exist | Check ID is correct |
| 500 Server Error | Something broke on server | Check console logs for details |

---

## 📚 Learning Path

1. **Start Here**: Understand the MVC architecture
2. **Next**: Test all API endpoints using Postman
3. **Then**: Modify controller to add new features
4. **Challenge**: Add a budget feature with alert system

---

## 🎓 Key Takeaways

✅ Express is a framework for building APIs in Node.js
✅ Middleware processes every request
✅ Services contain business logic
✅ Models handle data persistence
✅ Controllers connect requests to services
✅ Async/Await handles time-consuming operations
✅ Error handling prevents crashes
✅ Validation ensures data quality

---

