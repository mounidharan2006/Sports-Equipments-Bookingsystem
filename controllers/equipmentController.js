const db = require('../config/db');

exports.getEquipment = (req, res, next) => {
    try {
        const data = db.readDB();
        let equipment = data.equipment;

        // Search
        if (req.query.search) {
            const regex = new RegExp(req.query.search, 'i');
            equipment = equipment.filter(e => regex.test(e.name));
        }

        // Category filter
        if (req.query.category) {
            equipment = equipment.filter(e => e.category === req.query.category);
        }

        // Sort
        if (req.query.sort) {
            if (req.query.sort === 'name') {
                equipment.sort((a, b) => a.name.localeCompare(b.name));
            } else if (req.query.sort === '-name') {
                equipment.sort((a, b) => b.name.localeCompare(a.name));
            }
        }

        res.status(200).json({
            success: true,
            count: equipment.length,
            data: equipment
        });
    } catch (error) {
        next(error);
    }
};

exports.getSingleEquipment = (req, res, next) => {
    try {
        const data = db.readDB();
        const equipment = data.equipment.find(e => e._id === req.params.id);

        if (!equipment) {
            return res.status(404).json({ success: false, error: 'Equipment not found' });
        }

        res.status(200).json({ success: true, data: equipment });
    } catch (error) {
        next(error);
    }
};
