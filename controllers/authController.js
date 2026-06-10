const db = require('../db');
const bcrypt = require('bcryptjs');

// Register User
const registerUser = async (req, res) => {
    const { name, phone, email, address, password } = req.body;

    try {
        // Check if email already exists
        const checkEmail =
            'SELECT * FROM users WHERE email = ?';

        db.query(checkEmail, [email], async (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Database error'
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    message: 'Email already exists'
                });
            }

            // Hash password
            const hashedPassword =
                await bcrypt.hash(password, 10);

            // Insert user
            const sql = `
                INSERT INTO users
                (name, phone, email, address, password)
                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(
                sql,
                [
                    name,
                    phone,
                    email,
                    address,
                    hashedPassword
                ],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            message: 'Registration failed'
                        });
                    }

                    res.status(201).json({
                        message:
                            'User registered successfully'
                    });
                }
            );
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

module.exports = { registerUser };