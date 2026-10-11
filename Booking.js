const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingReference: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    equipmentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Equipment',
        required: true
    },
    quantity: {
        type: Number,
        required: [true, 'Please add booking quantity'],
        min: [1, 'Quantity must be at least 1']
    },
    startDate: {
        type: Date,
        required: [true, 'Please add a start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Please add an end date']
    },
    purpose: {
        type: String,
        required: [true, 'Please state the purpose of booking']
    },
    notes: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Active', 'Completed', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

// Prevent start date from being in the past when creating
bookingSchema.pre('validate', function(next) {
    if (this.isNew) {
        if (this.startDate < new Date(new Date().setHours(0,0,0,0))) {
            this.invalidate('startDate', 'Start date cannot be in the past');
        }
        if (this.endDate < this.startDate) {
            this.invalidate('endDate', 'End date must be on or after start date');
        }
    }
    next();
});

module.exports = mongoose.model('Booking', bookingSchema);
