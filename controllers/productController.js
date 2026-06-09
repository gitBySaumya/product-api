const db = require('../db');

// Product List API
const getAllProducts = (req, res) => {
    const sql = 'SELECT * FROM products';

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Error fetching products'
            });
        }

        res.status(200).json(result);
    });
};

// Product By ID API
const getProductById = (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT * FROM products WHERE product_id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Error fetching product'
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json(result[0]);
    });
};

module.exports = {
    getAllProducts,
    getProductById
};