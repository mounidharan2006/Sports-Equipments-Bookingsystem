const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add an equipment name'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Cricket', 'Football', 'Basketball', 'Badminton', 'Tennis', 'Volleyball', 'Table Tennis', 'Other']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    totalQuantity: {
        type: Number,
        required: [true, 'Please add total quantity'],
        min: 0
    },
    availableQuantity: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

// Set availableQuantity to totalQuantity upon creation if not provided
equipmentSchema.pre('validate', function(next) {
    if (this.isNew && this.availableQuantity === undefined) {
        this.availableQuantity = this.totalQuantity;
    }
    next();
});

module.exports = mongoose.model('Equipment', equipmentSchema);
