const { Developer, Game } = require('../models');
const bcrypt = require('bcrypt');

const createDeveloper = async (req, res) => {
    try {
        const { name, country, founded_year, website, email } = req.body;

        if (!name || !country || !founded_year || !website || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newDeveloper = await Developer.create({
            name,
            country,
            founded_year,
            website,
            email
        });

        return res.status(201).json({
            message: 'Developer created successfully',
            developer: newDeveloper
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}

const listDevelopers = async (req, res) => {
    try {
        const developers = await Developer.findAll({
            include: Game
        })

            return res.status(200).json({
                message: 'List of developers',
                developers: developers
 
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const getDeveloperById = async (req, res) => {
    const { id } = req.params;

    if (req.developer.id != id && req.developer.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const developer = await Developer.findByPk(id, { include: Game });
    if (!developer) return res.status(404).json({ message: 'Not found' });

    res.json({ data: developer });
};

const updateDeveloper = async (req, res) => {
    const { id } = req.params;

    if (req.developer.id != id && req.developer.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const { name, country, founded_year, website, email, password } = req.body;

    try {
        const developer = await Developer.findByPk(id);
        if (!developer) return res.status(404).json({ message: 'Developer not found' });

        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const updatedDeveloper = await developer.update({
            name,
            country,
            founded_year,
            website,
            email,
            password: hashedPassword || developer.password 
        });

        return res.status(200).json({
            message: 'Developer updated successfully',
            developer: updatedDeveloper
        });
    } catch (error) {
        console.error('Update developer error:', error);
        return res.status(500).json({
            message: error.message
        });
    }
};

const deleteDeveloper = async (req, res) => {
    const { id } = req.params;

    if (req.developer.id != id && req.developer.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const developer = await Developer.findByPk(id);
        if (!developer) return res.status(404).json({ message: 'Developer not found' });

        await developer.destroy();
        return res.status(200).json({
            message: 'Developer deleted successfully'
        });
    } catch (error) {
        console.error('Delete developer error:', error);
        return res.status(500).json({
            message: error.message
        });
    }
}

const deleteAllDevelopers = async (req, res) => {
    try {
        await Developer.destroy({ where: {}});
        return res.status(200).json({
            message: 'All developers deleted successfully'
        });
    } catch (error) {
        console.error('Delete all developers error:', error);
        return res.status(500).json({
            message: error.message
        });
    }
}


module.exports = {
    createDeveloper,
    listDevelopers,
    getDeveloperById,
    updateDeveloper,
    deleteDeveloper,
    deleteAllDevelopers  
}