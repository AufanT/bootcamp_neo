const { Developer } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const developer = await Developer.findOne({ where: { email } });

        if (!developer) {
            return res.status(404).json({ message: 'Developer not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, developer.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ 
            id: developer.id,
            name: developer.name,
            email: developer.email,
            role: developer.role
        }, 
        process.env.JWT_SECRET, { 
            expiresIn: '1d' 
        });

        return res.status(200).json({
            message: 'Login successful',
            token,
            developer: {
                id: developer.id,
                name: developer.name,
                email: developer.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
}

module.exports = {
    login
};