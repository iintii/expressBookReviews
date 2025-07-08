# Book Review Application - API Endpoints Testing Guide

## Server URL: http://localhost:5000

## General User Endpoints (No Authentication Required)

### Task 1: Get all books

```
GET http://localhost:5000/
```

### Task 2: Get book by ISBN

```
GET http://localhost:5000/isbn/1
```

### Task 3: Get books by Author

```
GET http://localhost:5000/author/Chinua Achebe
```

### Task 4: Get books by Title

```
GET http://localhost:5000/title/Things Fall Apart
```

### Task 5: Get book reviews

```
GET http://localhost:5000/review/1
```

### Task 6: Register a new user

```
POST http://localhost:5000/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "testpass"
}
```

### Task 7: Login as registered user

```
POST http://localhost:5000/customer/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "testpass"
}
```

## Authenticated User Endpoints (Login Required)

### Task 8: Add/Modify a book review

```
PUT http://localhost:5000/customer/auth/review/1
Content-Type: application/json

{
  "review": "This is a great book!"
}
```

### Task 9: Delete a book review

```
DELETE http://localhost:5000/customer/auth/review/1
```

## Async/Await Endpoints (Tasks 10-13)

### Task 10: Get all books using async callback

```
GET http://localhost:5000/async/books
```

### Task 11: Search by ISBN using Promises

```
GET http://localhost:5000/async/isbn/1
```

### Task 12: Search by Author using Promises

```
GET http://localhost:5000/async/author/Chinua Achebe
```

### Task 13: Search by Title using Promises

```
GET http://localhost:5000/async/title/Things Fall Apart
```

## Testing Steps:

1. **Test General Endpoints**: Use the first 5 endpoints to verify basic functionality
2. **Register User**: Create a new user account
3. **Login**: Get authentication token
4. **Test Authenticated Endpoints**: Add/modify/delete reviews
5. **Test Async Endpoints**: Verify promise-based implementations

## Features Implemented:

✅ Task 1: Get the book list available in the shop
✅ Task 2: Get books based on ISBN
✅ Task 3: Get all books by Author
✅ Task 4: Get all books based on Title
✅ Task 5: Get book reviews
✅ Task 6: Register new user
✅ Task 7: Login as registered user
✅ Task 8: Add/Modify book review (authenticated)
✅ Task 9: Delete book review (authenticated)
✅ Task 10: Get all books using async callback
✅ Task 11: Search by ISBN using Promises
✅ Task 12: Search by Author using Promises
✅ Task 13: Search by Title using Promises

## Authentication Features:

- Session-based authentication
- JWT token generation
- Middleware protection for authenticated routes
- User registration and login
- Review ownership validation

## Async Features:

- Promise-based implementations
- Async/await functions
- Error handling for async operations
- Simulated async delays for demonstration
