# User Management Module (MR)

This module handles user authentication, roles, and administrative equipment features.

## Jira Tasks
- **TSEBS-1 User Registration**: Implemented via `POST /api/auth/register`
- **TSEBS-2 User Login**: Implemented via `POST /api/auth/login`
- **TSEBS-13 Add New Equipment**: *Pending implementation* (Will be an admin route in `equipmentRoutes.js`)
- **TSEBS-14 Manage Equipment Condition**: *Pending implementation*
- **TSEBS-15 Booking Notifications**: *Pending implementation*

## Associated Files
### Backend
- `controllers/authController.js` (Registration, Login, GetMe)
- `controllers/userController.js` (Profile management)
- `routes/authRoutes.js`
- `routes/userRoutes.js`

### Frontend
- `public/register.html` & `public/js/auth.js`
- `public/login.html` & `public/js/auth.js`
- `public/profile.html` & `public/js/profile.js`
- `public/admin-dashboard.html` & `public/js/admin-dashboard.js`

## Notes
- Works closely with `middleware/authMiddleware.js`.
- Make sure not to expose passwords in API responses.
