# Booking Management Module (N)

This module handles equipment reservations, history, and booking lifecycle.

## Jira Tasks
- **TSEBS-7 Book Equipment**: Implemented via `POST /api/bookings`
- **TSEBS-8 View Booking History**: Implemented via `GET /api/bookings/my`
- **TSEBS-9 Cancel Booking**: Implemented via `PATCH /api/bookings/:id/cancel`
- **TSEBS-10 Process Payment**: *Pending implementation*
- **TSEBS-11 Rate Equipment**: *Pending implementation*

## Associated Files
### Backend
- `controllers/bookingController.js` (Create, get my bookings, cancel, get single)
- `routes/bookingRoutes.js`

### Frontend
- `public/booking.html` & `public/js/booking.js` (Booking creation form)
- `public/my-bookings.html` & `public/js/my-bookings.js` (Booking history and cancellation)
- `public/dashboard.html` & `public/js/dashboard.js` (Recent bookings overview)

## Notes
- Requires authentication (uses `protect` middleware).
- Must check `availableQuantity` of equipment before allowing a booking to be created.
- Pending Tasks (Payment, Ratings) will likely require new models and routes.
