const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.protect = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }

    const data = db.readDB();
    const user = data.users.find(u => u._id === req.session.userId);
    
    if (!user) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }

    req.userId = user._id;
    req.userRole = user.role || 'user';
    next();
};
