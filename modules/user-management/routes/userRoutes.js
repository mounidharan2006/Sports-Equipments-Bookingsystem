const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../../../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/profile')
    .get(getProfile)
    .patch(updateProfile);

module.exports = router;
