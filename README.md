# 💸 Expense Tracker App

A full-stack **Expense Tracker** built with **Next.js**, **NestJS**, **PostgreSQL**, and **Prisma**. This app helps users manage budgets and track expenses across different categories with real-time summary and control over spending limits.

---

## <> Tech Stack </>

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js , REST API
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT

---

## 📂 Features

- User Signup/Login
- Create Budget Categories with Limits
- Add Expenses to Categories
- Edit Category Limits
- View Expense Summary
- Dynamic Dashboard with Total Spent, Limits, Budgets

---

## 🔑 API Endpoints (with examples)

### 🔐 Auth

#### `POST /api/auth/signup`
Registers a new user.

**Request:**
```json
{
  "email": "akbar@gmail.com",
  "password": "Grate@pswd"
}
```

---

#### `POST /api/auth/login`
Logs in an existing user.

**Request:**
```json
{
  "email": "billgates@gmail.com",
  "password": "billgates@069"
}
```

---

### 📊 Categories (Budgets)

#### `POST /api/categories`
Create a new category.

**Request:**
```json
{
  "name": "Memories",
  "limit": 2000,
  "userId": 1
}
```

---

#### `GET /api/categories?userId=4`
Fetch categories by user ID.

---

#### `PATCH /api/categories/:id/limit`
Update category limit.

**Endpoint:**
```
/api/categories/8/limit
```

**Request:**
```json
{
  "limit": 1000
}
```

---

### 💰 Expenses

#### `POST /api/expenses`
Add a new expense.

**Request:**
```json
{
  "title": "Home Lunch",
  "amount": 6000,
  "note": "Lunchhhhh",
  "categoryId": 1,
  "userId": 1
}
```

---

#### `POST /api/expense/`
Add another expense (alternate endpoint).

**Request:**
```json
{
  "amount": 950,
  "note": "House Bill",
  "categoryId": 7,
  "userId": 4
}
```

---

### 📈 Summary Dashboard

#### `GET /api/expense/summary?userId=4`
Get expense summary for user.

**Response:**
```json
{
  "userId": 4,
  "totalSpent": 1200,
  "totalLimit": 5000,
  "numberOfBudgets": 4,
  "categories": [
    {
      "id": 6,
      "name": "Transport",
      "limit": 1000,
      "totalSpent": 250
    },
    {
      "id": 7,
      "name": "Rent",
      "limit": 1000,
      "totalSpent": 950
    },
    {
      "id": 8,
      "name": "Food",
      "limit": 1000,
      "totalSpent": 0
    },
    {
      "id": 9,
      "name": "Activity",
      "limit": 2000,
      "totalSpent": 0
    }
  ]
}
```

---

## 🛠️ Running the App



### Fulstack (Next.js)
```bash
npm install
npm run dev
```

---

## 📌 Notes

- Make sure PostgreSQL is running
- Update your `.env` file with the correct database URL
- Add token-based authorization to secure routes

---

## ✍️ Author

Made with ❤️ by Dastagir Ahmed

---

## 📝 License

MIT
