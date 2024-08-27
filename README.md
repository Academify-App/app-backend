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

**Endpoint:** `POST /api/login`

This endpoint allows a registered user to log in.

#### Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

- **email**: The email address of the user (required).
- **password**: The user's password (required).

#### Response

- **200 OK:** Login successful, returns a JWT token.
- **401 Unauthorized:** Invalid credentials.
- **500 Internal Server Error:** Server error.

#### Example Request

```bash
curl -X POST https://academify-backend-5cz9.onrender.com/api/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
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
curl -X POST https://academify-backend-5cz9.onrender.com/api/auth/send-otp \
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
curl -X POST https://academify-backend-5cz9.onrender.com/api/auth/verify-email \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "otp": "123456"
}'
```