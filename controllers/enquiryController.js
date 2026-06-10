const db = require('../db');

const addEnquiry = (req, res) => {
    const {
        name,
        phone,
        email,
        bottle_size,
        quantity,
        delivery_location
    } = req.body;

    const sql = `
        INSERT INTO bulk_enquiries
        (
            name,
            phone,
            email,
            bottle_size,
            quantity,
            delivery_location
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            phone,
            email,
            bottle_size,
            quantity,
            delivery_location
        ],
        (err, result) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: 'Failed to submit enquiry'
                });
            }

            res.status(201).json({
                message: 'Enquiry submitted successfully'
            });
        }
    );
};
// -----------------------
const getAllEnquiries = (req, res) => {

    const sql = 'SELECT * FROM bulk_enquiries';

    db.query(sql, (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: 'Failed to fetch enquiries'
            });
        }

        res.status(200).json(result);
    });
};

module.exports = {
    addEnquiry,
    getAllEnquiries
};