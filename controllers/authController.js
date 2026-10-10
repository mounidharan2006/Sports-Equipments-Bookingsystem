const db = require('../config/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

exports.register = async (req, res, next) => {
    try {
        const { fullName, registerNumber, email, phone, department, yearOfStudy, password } = req.body;
        
        if (!fullName || !registerNumber || !email || !phone || !department || !yearOfStudy || !password) {
            return res.status(400).json({ success: false, error: 'Please provide all required fields' });
        }

        const data = db.readDB();
        
        const userExists = data.users.find(u => u.email === email || u.registerNumber === registerNumber);
        if (userExists) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = {
            _id: uuidv4(),
            fullName,
            registerNumber,
            email,
            phone,
            department,
            yearOfStudy,
            passwordHash,
            role: 'user',
            createdAt: new Date().toISOString()
        };

        data.users.push(newUser);
        db.writeDB(data);

        res.status(201).json({ success: true, message: 'User registered successfully. Please log in.' });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide an email and password' });
        }

        const data = db.readDB();
        const user = data.users.find(u => u.email === email);
        
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        req.session.userId = user._id;
        
        res.status(200).json({ 
            success: true, 
            user: { id: user._id, fullName: user.fullName, role: user.role } 
        });
    } catch (error) {
        next(error);
    }
};

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ success: false, error: 'Could not log out' });
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
};

exports.getMe = (req, res, next) => {
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
