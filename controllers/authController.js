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

const jwt = require('jsonwebtoken');

// Login User
const loginUser = (req, res) => {
    const { email, password } = req.body;

    const sql =
        'SELECT * FROM users WHERE email = ?';

    db.query(sql, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Database error'
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const user = result[0];

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid password'
            });
        }

        // Create token
        const token = jwt.sign(
            {
                id: user.user_id,
                email: user.email
            },
            'secretkey',
            {
                expiresIn: '1d'
            }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.user_id,
                name: user.name,
                email: user.email
            }
        });
    });
};

module.exports = {
    registerUser,
    loginUser
};