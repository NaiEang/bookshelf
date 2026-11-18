# Bookshelf API

A RESTful backend API built with NestJS, TypeORM, PostgreSQL, JWT authentication, and Docker for tracking personal reading lists.

## Data Model (`Book`)
- `id` (UUID, Primary Key)
- `title` (string, required)
- `author` (string, required)
- `isRead` (boolean, default: `false`)

## API Routes

| Action | Method | URL | Auth |
| :--- | :--- | :--- | :--- |
| Authenticate and get JWT | POST | `/auth/login` | Public |
| List all books | GET | `/books` | Public |
| Get one book by ID | GET | `/books/:id` | Public |
| Create a new book | POST | `/books` | JWT Required |
| Update a book | PATCH | `/books/:id` | JWT Required |
| Delete a book | DELETE | `/books/:id` | JWT Required |

## Running Tests & Docker
- Unit tests: `npm run test`
- E2E tests: `npm run test:e2e`
- Build container: `docker build -t bookshelf-api .`

## Reflection
The hardest part of this project was wiring up dependency injection across both the application modules and the Vitest unit/e2e test suites—particularly mocking TypeORM repositories and ensuring `autoLoadEntities` was configured so TypeORM could resolve entity metadata at runtime. Debugging the Docker build also highlighted how base image versions and `.dockerignore` directly affect build speed and compatibility. If I had more time, I would add a full `Users` table with bcrypt password hashing and a Redis caching layer on the public `GET /books` endpoint.