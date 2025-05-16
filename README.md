# Task Manager Backend API

A RESTful API service for managing tasks and user authentication built with Node.js, Express, and MySQL.

## Table of Contents

-   [Setup](#setup)
-   [Environment Variables](#environment-variables)
-   [Database Models](#database-models)
-   [API Endpoints](#api-endpoints)

## Setup

```bash
# Clone the repository
git clone https://github.com/nkraj7266/task-manager-server

# Install dependencies
npm install

# Start the development server
npm start
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
DATABASE_URL=mysql://username:password@localhost:3306/database_name
TOKEN_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:3000
```

## Database Models

### User Model

-   `id`: Integer (Primary Key, Auto Increment)
-   `name`: String (Required)
-   `email`: String (Required)
-   `password`: String (Required)
-   `role`: String (Default: "user")

### Task Model

-   `id`: Integer (Primary Key, Auto Increment)
-   `title`: String (Required)
-   `description`: String (Optional)
-   `priority`: String (Enum: "low", "medium", "high", Default: "low")
-   `status`: String (Enum: "pending", "ongoing", "completed", "overdue", Default: "pending")
-   `dueDate`: Date (Required)
-   `userId`: Integer (Required, Foreign Key)

## API Endpoints

### Authentication Routes

#### Register User

```http
POST /api/auth/register
```

**Request Body:**

```json
{
	"name": "John Doe",
	"email": "john@example.com",
	"password": "password123"
}
```

**Response:** Returns JWT token and user object

#### Login User

```http
POST /api/auth/login
```

**Request Body:**

```json
{
	"email": "john@example.com",
	"password": "password123"
}
```

**Response:** Returns JWT token and user object

#### Verify Token

```http
GET /api/auth/verify-token
```

**Headers:**

-   Authorization: Bearer {token}

**Response:** Returns user object if token is valid

#### Logout User

```http
POST /api/auth/logout
```

**Response:** Success message

### Task Routes

#### Create Task

```http
POST /api/v1/tasks/create
```

**Request Body:**

```json
{
	"title": "Complete Project",
	"description": "Finish the documentation",
	"priority": "high",
	"status": "pending",
	"dueDate": "2024-04-30T00:00:00.000Z",
	"userId": 1
}
```

#### Get All Tasks

```http
GET /api/v1/tasks/all/:userId
```

**Response:** Returns array of tasks

#### Update Task

```http
PUT /api/v1/tasks/edit/:id
```

**Request Body:**

```json
{
	"title": "Updated Title",
	"description": "Updated description",
	"priority": "medium",
	"status": "ongoing",
	"dueDate": "2024-05-01T00:00:00.000Z",
	"userId": 1
}
```

#### Delete Task

```http
DELETE /api/v1/tasks/delete/:id
```

**Response:** Success message

## Error Handling

The API returns appropriate HTTP status codes:

-   `200`: Success
-   `201`: Created
-   `400`: Bad Request
-   `401`: Unauthorized
-   `403`: Forbidden
-   `404`: Not Found
-   `500`: Internal Server Error

## Technologies Used

-   Node.js
-   Express.js
-   MySQL
-   Sequelize ORM
-   JSON Web Tokens (JWT)
-   bcrypt
-   express-validator
