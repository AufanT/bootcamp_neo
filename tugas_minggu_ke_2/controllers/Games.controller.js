const { Game, Developer } = require('../models');
const developer = require('../models/developer');

const listGames = async (req, res) => {

    
    try{
        const games = await Game.findAll({
            include: Developer
        });
        return res.status(200).json({
            message: 'List of games',
            games: games,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const addGame = async (req, res) => {
    try {
        const { title, release_date, genre, description, developer_id } = req.body;
        const existingDeveloper = await Developer.findByPk(developer_id);
        const existingGame = await Game.findOne({ where: { title } });

        if (existingGame) {
            return res.status(400).json({ message: 'Game already exists' });
        }

        if (!title || !release_date || !genre || !description || !developer_id) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!existingDeveloper) {
            return res.status(404).json({ 
                message: 'Developer not found' 
            });
        }

        const newGame = await Game.create({
            title,
            release_date,
            genre,
            description,
            developer_id
        });

        return res.status(201).json({
            message: 'Game added successfully',
            game: newGame
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const getGameById = async (req, res) => {
    const { id } = req.params;

    try {
        const game = await Game.findByPk(id);
        if (!game) return res.status(404).json({ message: 'Game not found' });

        return res.status(200).json({
            message: 'Game found',
            game: game
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const updateGame = async (req, res) => {
    const { id } = req.params; 
    const { title, release_date, genre, description } = req.body;
    
    try {
        const game = await Game.findByPk(id);
        if (!game) return res.status(404).json({ message: 'Game not found' });

        if (req.developer.id !== game.developer_id && req.developer.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. You can only update your own games' });
        }

        const updatedGame = await game.update({
            title,
            release_date,
            genre,
            description
        });

        return res.status(200).json({
            message: 'Game updated successfully',
            game: updatedGame
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const deleteGame = async (req, res) => {
    const { id } = req.params;
    
    try {
        const game = await Game.findByPk(id);
        if (!game) return res.status(404).json({ message: 'Game not found' });

        if (req.developer.id !== game.developer_id && req.developer.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. You can only delete your own games' });
        }

        await game.destroy();
        return res.status(200).json({ message: 'Game deleted successfully' });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const deleteAllGames = async (req, res) => {

    try {
        await Game.destroy({ where: {} });
        return res.status(200).json({ message: 'All games deleted successfully' });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    addGame,
    listGames,
    getGameById,
    updateGame,
    deleteGame,
    deleteAllGames
};