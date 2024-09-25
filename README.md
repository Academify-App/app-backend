### README.md

```markdown
# Academify Backend API Documentation

## Base URL

The base URL for the API is:
```
https://academify-backend-5cz9.onrender.com
```

## Endpoints

### 1. User Registration

**Endpoint:** `POST /api/register`

This endpoint allows a new user to register into the system.

#### Request Body

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "identity": "string"
}
```

- **name**: The name of the user (required).
- **email**: The email address of the user (required, must be a valid email).
- **password**: The user's password (required, must be at least 6 characters long).
- **identity**: A unique identifier for the user (required).

#### Response

- **201 Created:** User registered successfully.
- **400 Bad Request:** Validation failed (e.g., email already exists, invalid data).
- **500 Internal Server Error:** Server error.

#### Example Request

```bash
curl -X POST https://academify-backend-5cz9.onrender.com/api/register \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "identity": "user123"
}'
```

### 2. User Login

**Endpoint**: `POST /api/login`

**Description**: This endpoint allows users to authenticate by providing their email and password. Upon successful authentication, it returns a JWT access token along with the user's details.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- **email**: The email address of the user (required).
- **password**: The user's password (required).

#### Response

- **200 OK:** Login successful, returns a JWT token.
- **401 Unauthorized:** Invalid credentials.
- **500 Internal Server Error:** Server error.

**Response**:
```json
{
  "access_token": "your.jwt.token.here",
  "user": {
    "name": "User's Name",
    "email": "user@example.com",
    "identity": "User's Identity"
  }
}
```

### 3. Send OTP for Email Verification

**Endpoint:** `POST /api/send-otp`

This endpoint allows users to request an OTP (One-Time Password) to verify their email address.

#### Request Body

```json
{
  "email": "string"
}
```

- **email**: The email address to which the OTP will be sent (required).

#### Response

- **200 OK:** OTP sent successfully.
- **400 Bad Request:** Email is not registered or invalid.
- **500 Internal Server Error:** Server error.

#### Example Request

```bash
curl -X POST https://academify-backend-5cz9.onrender.com/api/send-otp \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com"
}'
```

### 4. Email Verification (OTP)

**Endpoint:** `POST /api/verify-otp`

This endpoint allows users to verify their email by entering the OTP they received.

#### Request Body

```json
{
  "email": "string",
  "otp": "string"
}
```

- **email**: The email address of the user (required).
- **otp**: The OTP sent to the user's email (required).

#### Response

- **200 OK:** Email verified successfully.
- **400 Bad Request:** Invalid OTP or email.
- **500 Internal Server Error:** Server error.

#### Example Request

```bash
curl -X POST https://academify-backend-5cz9.onrender.com/api/verify-email \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "otp": "123456"
}'
```

### 5. Create a New Material

- **Endpoint:** `/materials`
- **Method:** `POST`
- **Description:** Adds a new material to the database.

#### Request

- **Headers:**
  - `Content-Type: application/json`
- **Body:**

```json
{
  "category": "string",            // Category of the material (e.g., Tutorials, Handouts, Ebooks, Projects)
  "numberOfPages": 0,              // Number of pages in the material (integer)
  "department": "string",          // Department associated with the material
  "level": "string",               // Level of the material (e.g., Beginner, Intermediate, Advanced)
  "title": "string",               // Title of the material
  "description": "string",         // Description of the material
  "price": 0.0,                    // Price of the material (decimal, e.g., 29.99)
  "url": "string",                 // URL to the material or related resource
  "cover_url": "string"            // cover Url of the material or related resource
}
```

#### Response

- **Status Code:** `201 Created`
- **Body:**

```json
{
  "category": "Tutorials",
  "numberOfPages": 150,
  "department": "Computer Science",
  "level": "Beginner",
  "title": "Learn NestJS",
  "description": "A beginner-friendly guide to learning NestJS.",
  "price": 29.99,
  "url": "https://example.com/learn-nestjs",
  "cover_url": "https://example.com/cover"
}
```

### 6. Retrieve All Materials

- **Endpoint:** `/materials`
- **Method:** `GET`
- **Description:** Retrieves a list of all materials.

#### Response

- **Status Code:** `200 OK`
- **Body:**

```json
[
  {
    "id": 1,
    "category": "Tutorials",
    "numberOfPages": 150,
    "department": "Computer Science",
    "level": "Beginner",
    "title": "Learn NestJS",
    "description": "A beginner-friendly guide to learning NestJS.",
    "price": 29.99,
    "url": "https://example.com/learn-nestjs",
    "cover_url": "https://example.com/cover"
  }
]
```

### 7. Retrieve Materials by Category

- **Endpoint:** `/materials/category/:category`
- **Method:** `GET`
- **Description:** Retrieves materials filtered by the specified category.

#### Parameters

- **Path Parameter:**
  - `category` (string): The category to filter by. Must be one of the predefined categories (e.g., "Tutorials", "Handouts", "Ebooks", "Projects").

#### Response

- **Status Code:** `200 OK`
- **Body:**

```json
[
  {
    "id": 1,
    "category": "Tutorials",
    "numberOfPages": 150,
    "department": "Computer Science",
    "level": "Beginner",
    "title": "Learn NestJS",
    "description": "A beginner-friendly guide to learning NestJS.",
    "price": 29.99,
    "url": "https://example.com/learn-nestjs",
    "cover_url": "https://example.com/cover"
  }
]
```

If no materials are found for the specified category, the response will be an empty array:

```json
[]
```

### Error Handling

- **400 Bad Request:** Returned when the request body is invalid or missing required fields.
- **404 Not Found:** Returned when an invalid category is specified for filtering.
- **500 Internal Server Error:** Returned for unexpected errors during request processing.

## Example cURL Requests

### Create a New Material

```bash
curl -X POST https://academify-backend-5cz9.onrender.com/materials \
-H "Content-Type: application/json" \
-d '{
  "category": "Tutorials",
  "numberOfPages": 150,
  "department": "Computer Science",
  "level": "Beginner",
  "title": "Learn NestJS",
  "description": "A beginner-friendly guide to learning NestJS.",
  "price": 29.99,
  "url": "https://example.com/learn-nestjs",
  "cover_url": "https://example.com/cover"
}'
```

### Retrieve All Materials

```bash
curl -X GET https://academify-backend-5cz9.onrender.com/materials
```

### Retrieve Materials by Category

```bash
curl -X GET https://academify-backend-5cz9.onrender.com/materials/category/Tutorials
```

### 8. Add a Review to a Material

- **Endpoint:** `/materials/:id/reviews`
- **Method:** `PATCH`
- **Description:** Adds a new review to a specific material. Each review contains a review text (`value`) and a corresponding rating (`rating`).

#### Request

- **URL Parameters:**
  - `id` (integer): The unique identifier of the material to which the review will be added.

- **Headers:**
  - `Content-Type: application/json`

- **Body:**

```json
{
  "value": "string",  // The review text or comment about the material
  "rating": 0         // The rating for the material (integer, e.g., 1-5)
}
```

#### Example cURL Request

```bash
curl -X PATCH https://academify-backend-5cz9.onrender.com/materials/1/reviews \
-H "Content-Type: application/json" \
-d '{
  "value": "Great material!",
  "rating": 5
}'
```

#### Response

- **Status Code:** `200 OK` (on success)
- **Body:**

```json
{
  "id": 1,                         // Auto-generated ID of the material
  "category": "Tutorials",
  "numberOfPages": 150,
  "department": "Computer Science",
  "level": "Beginner",
  "title": "Learn NestJS",
  "description": "A beginner-friendly guide to learning NestJS.",
  "price": 29.99,
  "url": "https://example.com/learn-nestjs",
  "cover_url": "https://example.com/cover",
  "reviews": [
    {
      "value": "Great material!",
      "rating": 5
    }
  ]
}
```

#### Error Handling

- **404 Not Found:** Returned if the material with the specified `id` does not exist.
  - **Example:**

    ```json
    {
      "statusCode": 404,
      "message": "Material not found"
    }
    ```

- **400 Bad Request:** Returned if the request body is invalid or missing required fields (`value` and `rating`).
  - **Example:**

    ```json
    {
      "statusCode": 400,
      "message": "Invalid request body"
    }
    ```
