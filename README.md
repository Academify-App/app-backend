Thank you for the clarification. I'll update the README file accordingly to reflect the correct request body formats for the `register` and `login` endpoints.

### README.md

```markdown
# Academify Backend

This repository contains the backend code for the Academify application, built using NestJS with JWT authentication and PostgreSQL for database management.

## Base URL

All API requests should be made to the following base URL:

```
https://academify-backend-5cz9.onrender.com
```

## API Endpoints

### 1. User Registration

**Endpoint:** `POST /api/register`

**Description:** This endpoint allows a new user to register into the Academify application.

**Request:**

- **URL:** `/api/register`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:** 
  ```json
  {
    "name": "John Doe",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

**Response:**

- **Success (201 Created):**
  ```json
  {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com",
    "createdAt": "2024-08-21T12:00:00Z"
  }
  ```
- **Error (400 Bad Request):**
  ```json
  {
    "statusCode": 400,
    "message": [
      "email must be a valid email",
      "password must be at least 6 characters long"
    ],
    "error": "Bad Request"
  }
  ```

### 2. User Authentication (Login)

**Endpoint:** `POST /api/login`

**Description:** This endpoint allows a registered user to log in to the Academify application.

**Request:**

- **URL:** `/api/login`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:** 
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

**Response:**

- **Success (200 OK):**
  ```json
  {
    "accessToken": "jwt_token"
  }
  ```
- **Error (401 Unauthorized):**
  ```json
  {
    "statusCode": 401,
    "message": "Invalid credentials",
    "error": "Unauthorized"
  }
  ```

## How to Run

To run the project locally:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure your environment variables in a `.env` file.
4. Start the application using `npm run start:dev`.