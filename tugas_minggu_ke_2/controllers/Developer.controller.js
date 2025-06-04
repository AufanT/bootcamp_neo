const { Developer, Game } = require('../models');


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

module.exports = {
    createDeveloper,
    listDevelopers
}