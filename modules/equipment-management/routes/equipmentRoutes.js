const express = require('express');
const { getEquipment, getSingleEquipment } = require('../controllers/equipmentController');

const router = express.Router();

router.get('/', getEquipment);
router.get('/:id', getSingleEquipment);

module.exports = router;
