const db = require('../../../config/db');
const { v4: uuidv4 } = require('uuid');

const generateRef = () => 'BKG-' + Math.random().toString(36).substr(2, 8).toUpperCase();

exports.createBooking = (req, res, next) => {
    try {
        const { equipmentId, quantity, startDate, endDate, purpose, notes } = req.body;
        
        if (!equipmentId || !quantity || !startDate || !endDate || !purpose) {
            return res.status(400).json({ success: false, error: 'Please provide all required fields' });
        }

        const parsedQuantity = parseInt(quantity, 10);
        if (parsedQuantity <= 0) {
            return res.status(400).json({ success: false, error: 'Quantity must be at least 1' });
        }

        const data = db.readDB();
        const equipment = data.equipment.find(e => e._id === equipmentId);

        if (!equipment) {
            return res.status(404).json({ success: false, error: 'Equipment not found' });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Check overlapping bookings
        const overlappingBookings = data.bookings.filter(b => 
            b.equipmentId === equipmentId && 
            ['Pending', 'Approved', 'Active'].includes(b.status) &&
            new Date(b.startDate) <= end && new Date(b.endDate) >= start
        );

        const bookedQuantity = overlappingBookings.reduce((sum, bkg) => sum + bkg.quantity, 0);

        if (equipment.totalQuantity - bookedQuantity < parsedQuantity) {
            return res.status(400).json({ 
                success: false, 
                error: `Not enough equipment available for these dates. Only ${equipment.totalQuantity - bookedQuantity} left.` 
            });
        }

        const newBooking = {
            _id: uuidv4(),
            bookingReference: generateRef(),
            userId: req.userId,
            equipmentId,
            quantity: parsedQuantity,
            startDate: start.toISOString(),
            endDate: end.toISOString(),
            purpose,
            notes,
            status: 'Pending',
            createdAt: new Date().toISOString()
        };

        data.bookings.push(newBooking);
        db.writeDB(data);

        res.status(201).json({ success: true, data: newBooking });
    } catch (error) {
        next(error);
    }
};

exports.getMyBookings = (req, res, next) => {
    try {
        const data = db.readDB();
        
        // Find bookings and populate equipment details
        const bookings = data.bookings
            .filter(b => b.userId === req.userId)
            .map(b => {
                const equipment = data.equipment.find(e => e._id === b.equipmentId);
                return { ...b, equipmentId: equipment || null };
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        next(error);
    }
};

exports.getBooking = (req, res, next) => {
    try {
        const data = db.readDB();
        const booking = data.bookings.find(b => b._id === req.params.id);

        if (!booking) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }

        if (booking.userId !== req.userId && req.userRole !== 'admin') {
            return res.status(403).json({ success: false, error: 'Not authorized' });
        }

        booking.equipmentId = data.equipment.find(e => e._id === booking.equipmentId) || null;
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        next(error);
    }
};

exports.cancelBooking = (req, res, next) => {
    try {
        const data = db.readDB();
        const bookingIndex = data.bookings.findIndex(b => b._id === req.params.id);

        if (bookingIndex === -1) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }

        const booking = data.bookings[bookingIndex];

        if (booking.userId !== req.userId && req.userRole !== 'admin') {
            return res.status(403).json({ success: false, error: 'Not authorized' });
        }

        if (booking.status === 'Completed' || booking.status === 'Cancelled') {
            return res.status(400).json({ success: false, error: 'Cannot modify this booking' });
        }

        data.bookings[bookingIndex].status = 'Cancelled';
        db.writeDB(data);

        res.status(200).json({ success: true, data: data.bookings[bookingIndex] });
    } catch (error) {
        next(error);
    }
};

exports.getAllBookings = (req, res, next) => {
    try {
        if (req.userRole !== 'admin') return res.status(403).json({ success: false, error: 'Not authorized as admin' });
        
        const data = db.readDB();
        const bookings = data.bookings
            .map(b => {
                const equipment = data.equipment.find(e => e._id === b.equipmentId);
                const user = data.users.find(u => u._id === b.userId);
                return { ...b, equipmentId: equipment || null, user: user || null };
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        next(error);
    }
};

exports.updateBookingStatus = (req, res, next) => {
    try {
        if (req.userRole !== 'admin') return res.status(403).json({ success: false, error: 'Not authorized as admin' });

        const { status } = req.body;
        if (!['Pending', 'Approved', 'Rejected', 'Active', 'Completed', 'Cancelled'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
        }

        const data = db.readDB();
        const bookingIndex = data.bookings.findIndex(b => b._id === req.params.id);

        if (bookingIndex === -1) return res.status(404).json({ success: false, error: 'Booking not found' });

        data.bookings[bookingIndex].status = status;
        db.writeDB(data);

        res.status(200).json({ success: true, data: data.bookings[bookingIndex] });
    } catch (error) {
        next(error);
    }
};
