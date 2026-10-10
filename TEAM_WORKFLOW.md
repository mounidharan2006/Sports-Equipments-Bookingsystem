# Team Workflow

## Team Members & Jira Assignments
**MR (User & Core Management)**
- TSEBS-1 User Registration
- TSEBS-2 User Login
- TSEBS-13 Add New Equipment
- TSEBS-14 Manage Equipment Condition
- TSEBS-15 Booking Notifications

**K (Equipment Catalog)**
- TSEBS-3 Browse Equipment Catalog
- TSEBS-4 Search Equipment
- TSEBS-5 Filter Equipment
- TSEBS-6 View Equipment Details
- TSEBS-12 Equipment Availability Management

**N (Booking & Transactions)**
- TSEBS-7 Book Equipment
- TSEBS-8 View Booking History
- TSEBS-9 Cancel Booking
- TSEBS-10 Process Payment
- TSEBS-11 Rate Equipment

## Git Branching Strategy
We use a feature-branching strategy to avoid conflicts:
- **MR** will work on branch: `feature/user-management`
- **K** will work on branch: `feature/equipment-management`
- **N** will work on branch: `feature/booking-management`

### Workflow Steps for Each Member:
1. **Create and checkout branch:**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/<your-module-name>
   ```
2. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "TSEBS-X: Brief description of the change"
   ```
3. **Push to GitHub:**
   ```bash
   git push origin feature/<your-module-name>
   ```
4. **Open a Pull Request (PR):**
   - Go to GitHub and open a PR from your feature branch into `main`.
   - Have at least one other team member review the code before merging.

## Shared Files (DO NOT MOVE)
The following files are central to the application and shared across modules. Coordinate with the team before making structural changes to them:
- `server.js` (App entry point)
- `config/db.js` (Database configuration)
- `middleware/authMiddleware.js` (Authentication checks)
- `middleware/errorMiddleware.js` (Global error handling)
- `package.json` (Dependencies)
- `public/css/style.css` (Global styles)
- `public/js/main.js` (Global frontend utilities)
