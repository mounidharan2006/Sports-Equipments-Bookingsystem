const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please provide your full name'],
        trim: true
    },
    registerNumber: {
        type: String,
        required: [true, 'Please provide your register number'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
        match: [/^\d{10}$/, 'Please add a valid 10-digit phone number']
    },
    department: {
        type: String,
        required: [true, 'Please provide your department']
    },
    yearOfStudy: {
        type: String,
        required: [true, 'Please provide your year of study']
    },
    passwordHash: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false // Do not return password by default
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('passwordHash')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
