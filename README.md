# Backend with Prisma ORM and MongoDB

This project is a backend service using Prisma ORM to interact with a MongoDB database. Prisma provides an abstraction layer for interacting with your MongoDB database, making database operations easier and more efficient.

---

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 14 or later)
- **MongoDB** (locally installed or a cloud service like MongoDB Atlas)
- **Prisma CLI** (installed globally or via npm)

---

## Setting up MongoDB

### Option 1: Local MongoDB
- Install MongoDB on your local machine. Follow [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/).

### Option 2: MongoDB Atlas (Cloud)
1. Create an account at [MongoDB Atlas](https://www.mongodb.com/atlas/database).
2. Create a new cluster.
3. Obtain your connection string.

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/kushallunkad/Contact-Manager.git
cd backend
```
## Steps to Set Up the Project

### 2. Install Dependencies
Install the required npm packages:
```bash
npm install
```
# 3. Configure MongoDB Connection
Update the .env file with your MongoDB connection URL:
```bash
DATABASE_URL="mongodb+srv://<your-cluster-url>/your-database-name?retryWrites=true&w=majority"
```
Replace <your-cluster-url> with your MongoDB Atlas cluster URL or your local MongoDB URL.
Replace your-database-name with the name of your database.

# 4. Initialize Prisma
```bash
npx prisma init
```
This will create a prisma folder with a schema.prisma file inside. The DATABASE_URL from the .env file will be used to connect to your MongoDB database.

# 5. Define Your Database Models
# Edit the prisma/schema.prisma file to define your models:
```bash
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model Contact {
  id        String @id @default(auto()) @map("_id") @db.ObjectId
  firstName String
  lastName  String
  email     String @unique
  phone     String
  company   String
  jobTitle  String
}
```
# 6. Generate Prisma Client
```bash
npx prisma generate
```
# 7. Start the backend
```bash
node index.js
```
# Starting frontend 
```bash
npm run dev
```


