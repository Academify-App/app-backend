
# API Documentation

## 1. User Registration

**Endpoint:** `POST /api/register`

**Description:**  
This endpoint allows users to register a new account by providing their personal details. Upon successful registration, the user will receive a confirmation message.

### Request

**URL:** `/api/register`

**Method:** `POST`

**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string"
}
```

**Request Body Parameters:**

- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user account. Should be at least 6 characters long.
- `firstName` (string, required): The first name of the user.
- `lastName` (string, required): The last name of the user.

### Response

**Status Code:** `201 Created`

**Response Body:**
```json
{
  "message": "User successfully registered",
  "user": {
    "email": "string",
    "firstName": "string",
    "lastName": "string"
  }
}
```

**Response Body Parameters:**

- `message` (string): A message indicating that the registration was successful.
- `user` (object): The registered user's details.
  - `email` (string): The email address of the user.
  - `firstName` (string): The first name of the user.
  - `lastName` (string): The last name of the user.

### Error Responses

**Status Code:** `400 Bad Request`

**Response Body:**
```json
{
  "statusCode": 400,
  "message": "Bad Request",
  "errors": [
    "email must be a valid email",
    "password must be at least 6 characters long"
  ]
}
```

- `statusCode` (number): The HTTP status code.
- `message` (string): Error message indicating the problem with the request.
- `errors` (array of strings): A list of validation errors.

**Status Code:** `409 Conflict`

**Response Body:**
```json
{
  "statusCode": 409,
  "message": "Email already exists"
}
```

- `statusCode` (number): The HTTP status code.
- `message` (string): Error message indicating that the email is already in use.

---

## 2. User Authentication

**Endpoint:** `POST /api/login`

**Description:**  
This endpoint allows users to authenticate by providing their email and password. Upon successful authentication, the user will receive a JWT token that can be used for subsequent authenticated requests.

### Request

**URL:** `/api/login`

**Method:** `POST`

**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Request Body Parameters:**

- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the user account.

### Response

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "accessToken": "string"
}
```

**Response Body Parameters:**

- `accessToken` (string): A JWT token that the user can use for authenticated requests.

### Error Responses

**Status Code:** `401 Unauthorized`

**Response Body:**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

- `statusCode` (number): The HTTP status code.
- `message` (string): Error message indicating that the provided credentials are invalid.

**Status Code:** `400 Bad Request`

**Response Body:**
```json
{
  "statusCode": 400,
  "message": "Bad Request",
  "errors": [
    "email must be a valid email",
    "password should not be empty"
  ]
}
```

- `statusCode` (number): The HTTP status code.
- `message` (string): Error message indicating the problem with the request.
- `errors` (array of strings): A list of validation errors.

---

### Additional Notes

- **Security:** Passwords should be securely hashed before storage, and JWT tokens should be kept confidential.
- **Testing:** Use tools like Postman or cURL to test the endpoints. Ensure that all required fields are provided and are in the correct format.