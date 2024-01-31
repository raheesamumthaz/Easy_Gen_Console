# Console application for Easy Gen

## Description

A full-stack application with user sign-in and sign-up functionality using React for the frontend and NestJS for the backend.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)

## Features

- User sign-up with validation (email, name, password).
- User sign-in with authentication.
- Welcome page for authenticated users.
- Integration with MongoDB for data storage.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MongoDB installed and running.
- Your backend server (NestJS) configured and running.

## Getting Started

# Clone the repository:

   ```bash
   git clone https://github.com/raheesamumthaz/Easy_Gen_Console.git
   cd Easy_Gen_Console
```
# Install backend dependencies
cd backend
npm install


# Install frontend dependencies
cd ../frontend
npm install

# Configure the backend:
 Create a .env file in the backend directory and configure your MongoDB connection:
MONGO_URI=your_mongo_db_uri

# Run the application:
cd ../backend
npm run start

# Run the frontend app
cd ../frontend
npm start

Open your browser and visit http://localhost:3000 to access the application.

## Technologies Used
React
NestJS
MongoDB
Node.js
npm
TypeScript
