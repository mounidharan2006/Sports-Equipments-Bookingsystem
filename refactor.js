const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const modulesDir = path.join(baseDir, 'modules');

const modules = {
    'user-management': {
        models: ['User.js'],
        controllers: ['authController.js', 'userController.js'],
        routes: ['authRoutes.js', 'userRoutes.js'],
        public: ['register.html', 'login.html', 'profile.html'],
        'public/js': ['auth.js', 'profile.js']
    },
    'equipment-management': {
        models: ['Equipment.js'],
        controllers: ['equipmentController.js'],
        routes: ['equipmentRoutes.js'],
        public: ['equipment.html'],
        'public/js': ['equipment.js']
    },
    'booking-management': {
        models: ['Booking.js'],
        controllers: ['bookingController.js'],
        routes: ['bookingRoutes.js'],
        public: ['booking.html', 'my-bookings.html'],
        'public/js': ['booking.js', 'my-bookings.js']
    }
};

// Create dirs and move files
for (const [mod, structure] of Object.entries(modules)) {
    const modDir = path.join(modulesDir, mod);
    if (!fs.existsSync(modDir)) fs.mkdirSync(modDir, { recursive: true });

    for (const [folder, files] of Object.entries(structure)) {
        const destFolder = path.join(modDir, folder);
        if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder, { recursive: true });

        files.forEach(file => {
            const srcPath = path.join(baseDir, folder, file);
            const destPath = path.join(destFolder, file);
            
            if (fs.existsSync(srcPath)) {
                fs.renameSync(srcPath, destPath);
                console.log(`Moved ${file} to ${mod}/${folder}`);
            }
        });
    }
}

// Update server.js
let serverJs = fs.readFileSync(path.join(baseDir, 'server.js'), 'utf8');
serverJs = serverJs.replace("const authRoutes = require('./routes/authRoutes');", "const authRoutes = require('./modules/user-management/routes/authRoutes');");
serverJs = serverJs.replace("const userRoutes = require('./routes/userRoutes');", "const userRoutes = require('./modules/user-management/routes/userRoutes');");
serverJs = serverJs.replace("const equipmentRoutes = require('./routes/equipmentRoutes');", "const equipmentRoutes = require('./modules/equipment-management/routes/equipmentRoutes');");
serverJs = serverJs.replace("const bookingRoutes = require('./routes/bookingRoutes');", "const bookingRoutes = require('./modules/booking-management/routes/bookingRoutes');");

// Add static middleware for modules
if (!serverJs.includes("express.static(path.join(__dirname, 'modules', 'user-management', 'public'))")) {
    serverJs = serverJs.replace("app.use(express.static(path.join(__dirname, 'public')));", 
        "app.use(express.static(path.join(__dirname, 'public')));\n" +
        "app.use(express.static(path.join(__dirname, 'modules', 'user-management', 'public')));\n" +
        "app.use(express.static(path.join(__dirname, 'modules', 'equipment-management', 'public')));\n" +
        "app.use(express.static(path.join(__dirname, 'modules', 'booking-management', 'public')));\n"
    );
}
fs.writeFileSync(path.join(baseDir, 'server.js'), serverJs);

// Fix paths in routes and controllers
const fixPaths = (dir, depth) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixPaths(fullPath, depth);
        } else if (fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;

            // In modules, config/db is 3 levels up: ../../../config/db
            if (content.includes("require('../config/db')")) {
                content = content.replace(/require\('\.\.\/config\/db'\)/g, "require('../../../config/db')");
                changed = true;
            }
            if (content.includes("require('../middleware/authMiddleware')")) {
                content = content.replace(/require\('\.\.\/middleware\/authMiddleware'\)/g, "require('../../../middleware/authMiddleware')");
                changed = true;
            }
            
            if (changed) fs.writeFileSync(fullPath, content);
        }
    }
};

for (const mod of Object.keys(modules)) {
    fixPaths(path.join(modulesDir, mod), 3);
}

console.log("Refactoring complete.");
