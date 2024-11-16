# Contact-Manager - Full Stack Application

This is a full-stack application that demonstrates how to build a backend service using Prisma ORM to interact with a MongoDB database, and a simple frontend in React to manage and display user data.

## Project Overview

- **Frontend**: Built with React, it allows users to interact with the backend by adding new users and viewing a list of existing users.
- **Backend**: Built with Express.js and Prisma ORM, it provides RESTful APIs to handle user data operations like fetching and creating users.
- **Database**: MongoDB is used to store user data, with Prisma ORM as the database abstraction layer to simplify database queries and interactions.

## Major Technical Decisions

1. **Backend Framework (Express.js)**: 
   - Express.js was chosen for its simplicity and flexibility in setting up a RESTful API. It's lightweight and well-suited for building small-to-medium-sized applications with minimal setup.
   
2. **Database Abstraction (Prisma ORM)**: 
   - Prisma ORM is used for database interaction. It provides a high-level abstraction for working with MongoDB, offering an easy-to-use query builder and automatic generation of a client based on the defined schema.
   - The use of Prisma ensures type safety and better tooling, making it easier to interact with MongoDB and manage database migrations and schema changes.

3. **Frontend Framework (React)**:
   - React was selected to build the frontend due to its flexibility, component-based architecture, and large ecosystem. It allows for quick iteration and a smooth user experience for interacting with the backend.

4. **State Management**:
   - React's built-in state management (`useState` and `useEffect`) is sufficient for this project, keeping the state of the user data and handling API calls without needing external libraries like Redux.

5. **CORS Configuration**:
   - To allow communication between the frontend and backend running on different ports during development, CORS (Cross-Origin Resource Sharing) is enabled on the backend.

## How the Application Works

### Backend (`Express.js` + `Prisma ORM` + `MongoDB`)

1. **API Endpoints**:
   - The backend exposes two main endpoints:
     - `GET /users`: Fetches all users stored in the MongoDB database.
     - `POST /users`: Adds a new user to the database with a `name` and `email`.

2. **Prisma ORM**:
   - Prisma is used to define the `User` model and interact with the MongoDB database.
   - The schema for the `User` model is defined in `prisma/schema.prisma`, and Prisma automatically generates the client to interact with the database based on this schema.
   - MongoDB is used as the database, with `id` set as a `String` type using `@db.ObjectId` to store the user’s unique identifier.

3. **Server Configuration**:
   - The backend runs on port `3001` to avoid conflicts with the React app, which typically runs on port `3000`.
   - CORS is configured to allow requests from the frontend (on a different port during development) to the backend.
   
4. **Database Connection**:
   - The MongoDB connection string is stored in the `.env` file for security purposes.
   - The Prisma Client is used to handle queries such as fetching all users (`prisma.user.findMany()`) and creating a new user (`prisma.user.create()`).

### Frontend (`React`)

1. **Displaying Users**:
   - The React app uses `axios` to make HTTP requests to the backend.
   - On page load, the `useEffect` hook fetches the list of users from the backend (`GET /users`) and displays them in a list.

2. **Adding Users**:
   - The form allows users to input their `name` and `email`. When the form is submitted, an `axios` `POST` request is made to the backend (`POST /users`), creating a new user in the database.
   - After a successful submission, the new user is added to the list of users displayed in the UI.

3. **State Management**:
   - `useState` is used to manage the state for the list of users and form input values.
   - `useEffect` is used to fetch the initial list of users when the component is first rendered.

### CORS Configuration

- **CORS (Cross-Origin Resource Sharing)** is configured on the backend to allow requests from the frontend (which runs on a different port) to interact with the API.
- The `cors` middleware is added to the Express app, enabling cross-origin requests.

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


