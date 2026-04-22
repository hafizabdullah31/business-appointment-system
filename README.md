# Business Appointment Management System Backend

## Tech Stack
- Node.js + TypeScript
- Express.js
- PostgreSQL
- Drizzle ORM + Drizzle Kit
- Sequelize ORM + sequelize-cli

## Setup
1. Clone repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy env file:
   ```bash
   cp .env.example .env
   ```
4. Update database values in `.env`
5. Run development server:
   ```bash
   npm run dev
   ```

## Environment Variables
- `PORT`: API port
- `DATABASE_URL`: PostgreSQL connection URL
- `JWT_SECRET`: secret for access token
- `JWT_EXPIRES_IN`: access token expiry (default 15m)
- `REFRESH_TOKEN_SECRET`: refresh token secret
- `REFRESH_TOKEN_EXPIRES_IN`: refresh token expiry (default 7d)
- `SESSION_SECRET`: session secret placeholder
- `SESSION_EXPIRES_IN`: session expiry in seconds
- `DEFAULT_ORM`: `drizzle` or `sequelize`
- `NODE_ENV`: environment name

## Run Migrations
### Drizzle
```bash
npm run drizzle:generate
npm run drizzle:migrate
npm run drizzle:seed
```

### Sequelize
```bash
npm run sequelize:migrate
npm run sequelize:seed
```

## ORM Switching
All endpoints support query parameter:
- `?orm=drizzle`
- `?orm=sequelize`

If query param is missing, fallback is `DEFAULT_ORM` from `.env`.

## API Endpoints
### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

### Business
- `POST /business`
- `GET /business`
- `GET /business/:id`
- `PUT /business/:id`
- `DELETE /business/:id`

### Users
- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`

### Employee Details
- `POST /employee-details`
- `GET /employee-details`
- `GET /employee-details/:id`
- `PUT /employee-details/:id`
- `DELETE /employee-details/:id`

### Client Details
- `POST /client-details`
- `GET /client-details`
- `GET /client-details/:id`
- `PUT /client-details/:id`
- `DELETE /client-details/:id`

### Appointments
- `POST /appointments`
- `GET /appointments`
- `GET /appointments/:id`
- `PATCH /appointments/:id/approve`
- `PATCH /appointments/:id/reject`
- `PATCH /appointments/:id/complete`
- `DELETE /appointments/:id`

## Postman Sample Request Bodies
### POST /auth/register
```json
{
  "name": "Client Test",
  "email": "clienttest@example.com",
  "password": "password123",
  "role": "client",
  "businessId": 1
}
```

### POST /auth/login
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### POST /auth/refresh
```json
{
  "refreshToken": "<refresh-token>"
}
```

### POST /auth/logout
```json
{
  "refreshToken": "<refresh-token>",
  "sessionToken": "<session-token>"
}
```

### POST /business
```json
{
  "name": "New Branch",
  "description": "Second branch",
  "ownerId": 1
}
```

### POST /users
```json
{
  "name": "Employee Three",
  "email": "employee3@example.com",
  "password": "password123",
  "role": "employee",
  "businessId": 1
}
```

### POST /employee-details
```json
{
  "userId": 2,
  "businessId": 1,
  "position": "Stylist"
}
```

### POST /client-details
```json
{
  "userId": 4,
  "phone": "0300-0000000",
  "address": "Street 123"
}
```

### POST /appointments
```json
{
  "clientId": 4,
  "employeeId": 2,
  "businessId": 1,
  "title": "Haircut",
  "description": "Basic service",
  "scheduledAt": "2026-05-01T10:00:00.000Z",
  "createdBy": "client"
}
```

### PATCH /appointments/:id/approve
```json
{
  "notes": "Approved by employee"
}
```

### PATCH /appointments/:id/reject
```json
{
  "notes": "Schedule conflict"
}
```

### PATCH /appointments/:id/complete
```json
{
  "notes": "Service completed"
}
```
