Here's how you can add the base URL `https://academify-backend-5cz9.onrender.com` to your initial README file, along with the previously documented API endpoints.

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
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```

**Response:**

- **Success (201 Created):**
  ```json
  {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
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


### Summary:
- **Base URL**: Added at the top of the README for easy reference.
- **API Endpoints**: Detailed documentation for the registration and login endpoints with request/response examples.
- **Running the Project**: Instructions on how to clone, install dependencies, and run the project.