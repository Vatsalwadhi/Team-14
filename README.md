# Team-14 Student Team Management Application

## Project Description
The Student Team Management Application is a MERN-stack web application designed to help teams organize and manage their members. It features an intuitive, modern user interface where users can view all members, add new members with profile pictures, view detailed member profiles, and remove members. The backend manages the members database using MongoDB and handles image uploads using Multer.

## Features
- View a list of all team members.
- Add a new team member with their details and upload a profile picture.
- View individual team member details.
- Delete a team member.
- Responsive and dynamic UI using React.

## Prerequisites
- Node.js installed
- MongoDB installed locally or access to a MongoDB Atlas cluster

## Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vatsalwadhi/Team-14.git
   cd Team-14
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

## Environment Variables

**Backend (`backend/.env`):**
Create a `.env` file in the `backend` directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/teamhub
```
*(Ensure your MongoDB server is running)*

## How to Run the App

1. **Start the Backend Server:**
   ```bash
   cd backend
   npm start
   ```
   The backend will start on `http://localhost:5000`.

2. **Start the Frontend Development Server:**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will start on `http://localhost:3000`.

## API Endpoints

The backend provides the following RESTful API endpoints at `http://localhost:5000`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/members` | Get a list of all team members |
| `POST` | `/api/members` | Create a new team member (supports `multipart/form-data` for image upload) |
| `GET` | `/api/members/:id` | Get details of a single team member by their ID |
| `DELETE`| `/api/members/:id` | Delete a specific team member by their ID |

## Tech Stack
- **Frontend:** React, React Router, Axios, CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer
