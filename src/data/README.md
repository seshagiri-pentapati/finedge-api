# Data Folder

This folder stores the application's persistent data as JSON files (acts as a simple file-based database).

## Files

- **users.json** — Stores all registered user accounts (id, name, email, hashed password, createdAt)
- **transactions.json** — Stores all financial transactions (id, userId, type, category, amount, date, note)

## How It Works

1. When the server starts and a model function runs, it checks if the JSON file exists.
2. If missing, it creates an empty array `[]` automatically (see `initializeFile()` in models).
3. All read/write operations go through `userModel.js` and `transactionModel.js`.

## Important Notes

- Both files start as empty arrays `[]` — data is added as users register and create transactions.
- Do **not** edit these files manually while the server is running.
- For production, replace this with a real database (MongoDB, PostgreSQL, etc.).
- These files are git-ignored in real projects to avoid committing user data.

## Example Structure

**users.json**
\`\`\`json
[
  {
    "id": "1717000000000",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "$2a$10$hashedPasswordHere",
    "createdAt": "2026-05-03T10:00:00.000Z"
  }
]
\`\`\`

**transactions.json**
\`\`\`json
[
  {
    "id": "1717000000001",
    "userId": "1717000000000",
    "type": "expense",
    "category": "Food",
    "amount": 25.50,
    "date": "2026-05-03",
    "note": "Lunch",
    "createdAt": "2026-05-03T12:00:00.000Z"
  }
]
\`\`\`
