# HHS Nurse Management Backend

This is the Express + PostgreSQL backend for the HHS Nurse Management take-home assignment.

=====================\
Tech Stack\
=====================\

- Node.js\
- Express\
- PostgreSQL (Supabase)\
- TypeScript

=====================\
Getting Started\
=====================

1\. Clone the Repository:\
   git clone https://github.com/korzenstein/hhs-backend.git\
   cd hhs-backend

2\. Install Dependencies:\
   npm install

3\. Environment Variables:\
   Create a file called .env.local in the root of the project with the following:

DATABASE_URL=postgresql://your-connection-string

4\. Run the Server:\
   npm run dev

Server will start at http://localhost:3001

=====================\
API Endpoints\
=====================

- GET /wards\
    Returns all wards in the database.

- GET /nurses\
    Returns all nurses.\
    Supports pagination and search (by name or ward).

- POST /nurses\
    Creates a new nurse.

- PATCH /nurses/:id\
    Updates an existing nurse.

- DELETE /nurses/:id\
    Deletes a nurse.

=====================\
Notes\
=====================\
This backend is designed to work with the frontend at:\
https://github.com/korzenstein/hhs-frontend
