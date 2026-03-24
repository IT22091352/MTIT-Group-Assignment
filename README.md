# IT4020 Modern Topics in IT - LMS Microservices (Node.js, No Docker)

This project is a beginner-friendly **Microservices Architecture** for an **Online Learning Platform (LMS)** using **Node.js + Express.js**, **JSON files** as storage, **Swagger UI** for API docs, and an **API Gateway** using `http-proxy-middleware`.

## Project Goal
Build 6 independent microservices and one API Gateway.

- No Docker
- No external database
- Full CRUD in every service
- Each service runs on a different port
- Each service has Swagger docs at `/docs`
- All endpoints work both:
  - directly (service port)
  - through gateway (`http://localhost:3000/api/...`)

## What Is Microservice Architecture?
Microservice architecture is a way to build applications as a set of **small, independent services**.

Each service:
- focuses on one business domain (for example users or courses)
- runs separately
- can be developed and tested independently
- communicates through HTTP APIs

For this assignment, LMS is split into 6 services: User, Course, Enrollment, Content, Progress, Review.

## Why Use an API Gateway?
An API Gateway provides one entry point for clients.

Benefits:
- clients call one base URL (`localhost:3000`) instead of many ports
- routing to the correct microservice is centralized
- easier to add authentication, rate limiting, and monitoring later
- hides internal service URLs from frontend/mobile clients

## How Routing Works
- Direct routing:
  - client calls service directly, for example `http://localhost:3001/users`
- Gateway routing:
  - client calls gateway route, for example `http://localhost:3000/api/users`
  - gateway proxies request to `http://localhost:3001/users`

So both paths should return the same response.

## Required Microservices and Ports

1. **User Service** - port `3001`
   - Entity: `User`
   - Fields: `id`, `name`, `email`
   - Base route: `/users`

2. **Course Service** - port `3002`
   - Entity: `Course`
   - Fields: `id`, `title`, `description`
   - Base route: `/courses`

3. **Enrollment Service** - port `3003`
   - Entity: `Enrollment`
   - Fields: `id`, `userId`, `courseId`
   - Base route: `/enrollments`

4. **Content Service** - port `3004`
   - Entity: `Content`
   - Fields: `id`, `courseId`, `type`, `url`
   - Allowed `type`: `video` or `pdf`
   - Base route: `/contents`

5. **Progress Service** - port `3005`
   - Entity: `Progress`
   - Fields: `id`, `userId`, `courseId`, `completionPercentage`
   - Base route: `/progress`

6. **Review Service** - port `3006`
   - Entity: `Review`
   - Fields: `id`, `userId`, `courseId`, `rating`, `comment`
   - Base route: `/reviews`

## API Gateway
- Port: `3000`
- Technology: `Express + http-proxy-middleware`

Route mapping:
- `/api/users` -> `http://localhost:3001/users`
- `/api/courses` -> `http://localhost:3002/courses`
- `/api/enrollments` -> `http://localhost:3003/enrollments`
- `/api/contents` -> `http://localhost:3004/contents`
- `/api/progress` -> `http://localhost:3005/progress`
- `/api/reviews` -> `http://localhost:3006/reviews`

## Planned Folder Structure

```text
project-root/
|-- api-gateway/
|   |-- package.json
|   `-- server.js
|-- user-service/
|   |-- package.json
|   |-- server.js
|   |-- data/
|   |   `-- users.json
|   `-- swagger.js
|-- course-service/
|   |-- package.json
|   |-- server.js
|   |-- data/
|   |   `-- courses.json
|   `-- swagger.js
|-- enrollment-service/
|   |-- package.json
|   |-- server.js
|   |-- data/
|   |   `-- enrollments.json
|   `-- swagger.js
|-- content-service/
|   |-- package.json
|   |-- server.js
|   |-- data/
|   |   `-- contents.json
|   `-- swagger.js
|-- progress-service/
|   |-- package.json
|   |-- server.js
|   |-- data/
|   |   `-- progress.json
|   `-- swagger.js
|-- review-service/
|   |-- package.json
|   |-- server.js
|   |-- data/
|   |   `-- reviews.json
|   `-- swagger.js
`-- README.md
```

## CRUD Endpoints Per Service
Each service will include the same CRUD pattern.

- `POST /<entity>` - create
- `GET /<entity>` - list all
- `GET /<entity>/:id` - get one by id
- `PUT /<entity>/:id` - update by id
- `DELETE /<entity>/:id` - delete by id

Example for User Service:
- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`

## Data Storage Strategy (JSON Files)
Each service stores data in its own JSON file inside `data/`.

Common implementation idea:
- read JSON file with `fs.readFileSync`
- parse to array
- modify array for create/update/delete
- write back with `fs.writeFileSync`
- keep services independent

ID strategy:
- use UUID (`uuid` package) for simple and unique ids

## Logging and Error Handling
Each service should include:
- request logging middleware (`console.log` method, URL, time)
- 404 for unknown routes
- 404 for invalid/non-existing id
- basic validation errors (400) when required fields are missing

## Swagger Requirement
Each microservice will expose docs at:
- `http://localhost:<service-port>/docs`

Use:
- `swagger-ui-express`
- `swagger-jsdoc` (or static Swagger JSON)

Each Swagger spec should document all 5 CRUD endpoints and request/response schemas.

## Sample Seed Data (Planned)
These will be placed in each service JSON file.

- `users.json`
```json
[
  { "id": "u1", "name": "Alice", "email": "alice@example.com" },
  { "id": "u2", "name": "Bob", "email": "bob@example.com" }
]
```

- `courses.json`
```json
[
  { "id": "c1", "title": "Node.js Basics", "description": "Introduction to Node.js" },
  { "id": "c2", "title": "Express API", "description": "Build REST APIs with Express" }
]
```

- `enrollments.json`
```json
[
  { "id": "e1", "userId": "u1", "courseId": "c1" }
]
```

- `contents.json`
```json
[
  { "id": "ct1", "courseId": "c1", "type": "video", "url": "https://example.com/video1" },
  { "id": "ct2", "courseId": "c1", "type": "pdf", "url": "https://example.com/notes1" }
]
```

- `progress.json`
```json
[
  { "id": "p1", "userId": "u1", "courseId": "c1", "completionPercentage": 40 }
]
```

- `reviews.json`
```json
[
  { "id": "r1", "userId": "u1", "courseId": "c1", "rating": 5, "comment": "Great course" }
]
```

## Planned package.json Dependencies
Per microservice:
- `express`
- `swagger-ui-express`
- `swagger-jsdoc`
- `uuid`
- `nodemon` (dev)

For API Gateway:
- `express`
- `http-proxy-middleware`
- `nodemon` (dev)

## How To Run (After Code Is Generated)
1. Open 7 terminals (or use one by one).
2. In each folder, install dependencies:
   - `npm install`
3. Start services:
   - User Service: `npm run dev` (port 3001)
   - Course Service: `npm run dev` (port 3002)
   - Enrollment Service: `npm run dev` (port 3003)
   - Content Service: `npm run dev` (port 3004)
   - Progress Service: `npm run dev` (port 3005)
   - Review Service: `npm run dev` (port 3006)
   - API Gateway: `npm run dev` (port 3000)
4. Test direct endpoints and gateway endpoints.

## Direct vs Gateway Test Examples
Direct:
- `GET http://localhost:3001/users`

Gateway:
- `GET http://localhost:3000/api/users`

Expected behavior:
- both return data from user-service

## Next Step
You asked for README only for now. In the next step, I can generate the full runnable code for:
- all 6 services
- API Gateway
- package.json for each folder
- Swagger setup for each service
- seed JSON files
- beginner-friendly error handling and logging
