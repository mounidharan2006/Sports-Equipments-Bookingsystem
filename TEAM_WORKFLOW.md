# Team Workflow

## Team Members & Modules

### 1. User Management Module (MR)
**Owner:** Mounidharan MN (MR)  
**Branch:** `feature/user-management`  
**Location:** `modules/user-management/`

**Jira Assignments:**
- TSEBS-1 User Registration
- TSEBS-2 User Login
- TSEBS-13 Add New Equipment (Coordinate with K for equipment APIs)
- TSEBS-14 Manage Equipment Condition (Coordinate with K for equipment APIs)
- TSEBS-15 Booking Notifications (Coordinate with N for booking APIs)

**Files Owned:**
- `modules/user-management/models/User.js`
- `modules/user-management/controllers/authController.js`
- `modules/user-management/controllers/userController.js`
- `modules/user-management/routes/authRoutes.js`
- `modules/user-management/routes/userRoutes.js`
- `modules/user-management/public/login.html`
- `modules/user-management/public/register.html`
- `modules/user-management/public/profile.html`
- `modules/user-management/public/js/auth.js`
- `modules/user-management/public/js/profile.js`

### 2. Equipment Management Module (K)
**Owner:** K  
**Branch:** `feature/equipment-management`  
**Location:** `modules/equipment-management/`

**Jira Assignments:**
- TSEBS-3 Browse Equipment Catalog
- TSEBS-4 Search Equipment
- TSEBS-5 Filter Equipment
- TSEBS-6 View Equipment Details
- TSEBS-12 Equipment Availability Management

**Files Owned:**
- `modules/equipment-management/models/Equipment.js`
- `modules/equipment-management/controllers/equipmentController.js`
- `modules/equipment-management/routes/equipmentRoutes.js`
- `modules/equipment-management/public/equipment.html`
- `modules/equipment-management/public/js/equipment.js`

### 3. Booking Management Module (N)
**Owner:** N  
**Branch:** `feature/booking-management`  
**Location:** `modules/booking-management/`

**Jira Assignments:**
- TSEBS-7 Book Equipment
- TSEBS-8 View Booking History
- TSEBS-9 Cancel Booking
- TSEBS-10 Process Payment (Pending Implementation)
- TSEBS-11 Rate Equipment (Pending Implementation)

**Files Owned:**
- `modules/booking-management/models/Booking.js`
- `modules/booking-management/controllers/bookingController.js`
- `modules/booking-management/routes/bookingRoutes.js`
- `modules/booking-management/public/booking.html`
- `modules/booking-management/public/my-bookings.html`
- `modules/booking-management/public/js/booking.js`
- `modules/booking-management/public/js/my-bookings.js`

## Shared Files (DO NOT MOVE)
The following files are central to the application and shared across modules. Coordinate with the team before making structural changes to them:
- `server.js` (App entry point)
- `config/db.js` (Database configuration / Local JSON store handler)
- `middleware/authMiddleware.js` (Authentication checks)
- `middleware/errorMiddleware.js` (Global error handling)
- `package.json` (Dependencies)
- `public/index.html` (Landing page)
- `public/dashboard.html` & `public/admin-dashboard.html` (Core navigational dashboards)
- `public/css/style.css` (Global styles)
- `public/js/main.js` & `public/js/dashboard.js` & `public/js/admin-dashboard.js`

## Workflow Steps for Each Member
1. **Create and checkout branch:**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/<your-module-name>
   ```
2. **Develop in your module folder:**
   Make changes only inside your `modules/<module-name>/` directory unless coordinating shared file changes with the team.
3. **Commit and Push:**
   ```bash
   git add .
   git commit -m "TSEBS-X: Brief description of the change"
   git push origin feature/<your-module-name>
   ```
4. **Open a Pull Request (PR):**
   - Go to GitHub and open a PR from your feature branch into `main`.
   - Have at least one other team member review the code before merging.
