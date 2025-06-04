const { Game, Developer } = require('../models');

const listGames = async (req, res) => {
    try{
        const games = await Game.findAll({
            include: Developer
        });
        return res.status(200).json({
            message: 'List of games',
            games: games
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
        const existingGame = await Developer.findByPk( developer_id );

        if (!title || !release_date || !genre || !description || !developer_id) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!existingGame) {
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

module.exports = {
    addGame,
    listGames
};