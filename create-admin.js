const db = require('./config/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const createAdmin = async () => {
    db.initDB();
    const data = db.readDB();
    
    if (data.users.find(u => u.email === 'admin@admin.com')) {
        console.log('Admin already exists');
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);

    data.users.push({
        _id: uuidv4(),
        fullName: 'Administrator',
        registerNumber: 'ADMIN001',
        email: 'admin@admin.com',
        phone: '1234567890',
        department: 'Admin',
        yearOfStudy: 'Staff',
        passwordHash,
        role: 'admin',
        createdAt: new Date().toISOString()
    });

    db.writeDB(data);
    console.log('Admin created: email: admin@admin.com, password: admin123');
};

createAdmin();
