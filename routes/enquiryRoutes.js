const express = require('express');
const router = express.Router();

const {
    addEnquiry,
    getAllEnquiries
} = require('../controllers/enquiryController');

router.post('/bulk-enquiry', addEnquiry);
router.get('/bulk-enquiries', getAllEnquiries);

module.exports = router;