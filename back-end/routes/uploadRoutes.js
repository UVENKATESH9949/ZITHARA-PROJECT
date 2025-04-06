const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

// Routes
router.get('/', uploadController.getAllJewellery);
router.post('/', uploadController.addJewellery);
router.put('/:id', uploadController.updateJewellery);
router.delete('/:id', uploadController.deleteJewellery);

module.exports = router;
