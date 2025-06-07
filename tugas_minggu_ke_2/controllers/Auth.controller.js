const { Developer } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const { name, country, founded_year, website, email, password, access } = req.body;

    if (!name || !country || !founded_year || !website || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingDeveloper = await Developer.findOne({ where: { email } });
        const existingName = await Developer.findOne({ where: { name } });

        if (existingName) {
            return res.status(400).json({ message: 'Developer with that name already exists' });
        }
        if (existingDeveloper) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const secretCode = 'getAdmin4';
        const role = access === secretCode ? 'admin' : 'user';

        const newDeveloper = await Developer.create({
            name,
            country,
            founded_year,
            website,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: 'Developer registered successfully',
            developer: {
                id: newDeveloper.id,
                name: newDeveloper.name,
                email: newDeveloper.email,
                role: newDeveloper.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
}


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
                email: developer.email,
                role: developer.role
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
    login,
    register
};