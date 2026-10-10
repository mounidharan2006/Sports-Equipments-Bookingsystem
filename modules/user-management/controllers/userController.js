const db = require('../../../config/db');

exports.getProfile = (req, res, next) => {
    try {
        const data = db.readDB();
        const user = data.users.find(u => u._id === req.userId);
        
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.passwordHash;

        res.status(200).json({ success: true, data: userWithoutPassword });
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = (req, res, next) => {
    try {
        const data = db.readDB();
        const userIndex = data.users.findIndex(u => u._id === req.userId);
        
        if (userIndex === -1) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        if (req.body.fullName) data.users[userIndex].fullName = req.body.fullName;
        if (req.body.phone) data.users[userIndex].phone = req.body.phone;
        if (req.body.department) data.users[userIndex].department = req.body.department;
        if (req.body.yearOfStudy) data.users[userIndex].yearOfStudy = req.body.yearOfStudy;

        db.writeDB(data);

        const updatedUser = { ...data.users[userIndex] };
        delete updatedUser.passwordHash;

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        next(error);
    }
};
