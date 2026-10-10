# Sports Equipment Booking System

A complete full-stack web application designed for students and sports users to register, browse, and book sports equipment. 

## Features
- User Authentication (Register, Login, Session-based)
- Dashboard showing active/pending bookings
- Equipment Catalog with Search, Category Filter, and Sorting
- Secure booking functionality with real-time stock availability check
- Profile management

## Tech Stack
- Frontend: HTML5, CSS3, JavaScript, Bootstrap 5, FontAwesome
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: Express Sessions + HTTP Only Cookies + bcrypt

## Prerequisites
- Node.js installed (v14 or higher)
- MongoDB installed and running locally OR a MongoDB Atlas URI

## Installation & Setup

1. **Clone or Extract the Project**
   Navigate to the project folder in your terminal.

2. **Install Dependencies**
   Run the following command to install all required backend packages:
   ```bash
   npm install
   ```

3. **Environment Configuration**
   The project includes a `.env` file with the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sports-booking
   SESSION_SECRET=my_super_secret_session_key_12345
   ```
   If you are using a cloud MongoDB instance, update the `MONGODB_URI` accordingly.

4. **Seed the Database with Sample Data**
   Run this command to insert demo sports equipment into the database:
   ```bash
   npm run seed
   ```
   *(Note: This will delete existing equipment in the database and insert new ones).*

5. **Start the Application**
   For development mode (auto-restarts on save):
   ```bash
   npm run dev
   ```
   For production mode:
   ```bash
   npm start
   ```

6. **Access the Website**
   Open your browser and navigate to:
   [http://localhost:5000](http://localhost:5000)

## Testing the Workflow
1. Go to **Register** and create a new student account.
2. The system will log you out, go to **Login** with the created credentials.
3. You will be redirected to the **Dashboard**.
4. Click on **Equipment** to browse available items. Try searching or filtering.
5. Click **Book Now** on any item, select dates and quantity.
6. Check your **My Bookings** page to see the newly created reservation (defaults to Pending).
7. Test the stock restriction by attempting to book more equipment than what is available.

## Folder Structure
- `/models`: Mongoose database schemas.
- `/controllers`: Logic for authentication, equipment, and bookings.
- `/routes`: API endpoints definition.
- `/middleware`: Authentication check and error handler.
- `/public`: Frontend static files (HTML, CSS, JS).
