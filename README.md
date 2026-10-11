# Equipment Management Module (K)

This module handles the display, searching, and filtering of the sports equipment catalog.

## Jira Tasks
- **TSEBS-3 Browse Equipment Catalog**: Implemented via `GET /api/equipment`
- **TSEBS-4 Search Equipment**: Implemented via `GET /api/equipment?search=...`
- **TSEBS-5 Filter Equipment**: Implemented via `GET /api/equipment?category=...`
- **TSEBS-6 View Equipment Details**: Implemented via `GET /api/equipment/:id`
- **TSEBS-12 Equipment Availability Management**: Partially implemented (Availability checked during booking).

## Associated Files
### Backend
- `controllers/equipmentController.js` (Get all, get single, search/filter logic)
- `routes/equipmentRoutes.js`

### Frontend
- `public/equipment.html` & `public/js/equipment.js` (Catalog view and search)
- `public/index.html` (Landing page highlights)

## Notes
- Search and filtering are currently handled using query parameters.
- Availability depends heavily on data from the `bookings` collection to calculate remaining stock accurately.
