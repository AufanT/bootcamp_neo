const express = require('express');
const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
        res.send('Welcome to My Game Library')
    })

let Game = [
    { id: 1, title: 'Elden Ring', Developer: 'FromSoftware Inc.', rating:'9' },
    { id: 2, title: 'GTA VI', Developer: 'Rockstar', rating:'' },
    { id: 3, title: 'Clair Obscur: Expedition 33', Developer: 'Sandfall Interactive', rating:'10' }
]

app.get('/game', (req, res) => {
        res.status(200).json({
            message: 'Berhasil mendapatkan data game',
            data: Game
        })
    })

app.get('/game/:id', (req, res) => {
    const id = parseInt(req.params.id) 
    const cariGame = Game.find(g => g.id === id)

    if (!cariGame) {
        return res.status(404).json ({
            message: 'Game tidak ada di library!'
        })
    }
    
    res.status(200).json ({
        message: 'Berhasil mendapatkan data Game',
        data: cariGame
    })
})

app.put('/edit-rating/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const { rating } = req.body
    const cariGame = Game.find(g => g.id === id)
    
    if (!cariGame) {
        return res.status(404).json ({
            message: 'Game tersebut tidak ada di library'
        })
    }
    if (!rating) {
        return res.status(400).json ({
            message: 'Anda belum memberi rating game ini'
        })
    }

    cariGame.rating = rating
    res.status(200).json ({
        message: 'Rating game berhasil diedit',
        data:cariGame
    })

})

app.delete('/hapus-game/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const cariGame = Game.find(g => g.id === id)

    if (!cariGame) {
        return res.status(404).json ({
            message: 'Game tersebut tidak ada di library'
        })
    }

    Game.splice(cariGame, 1)
    res.status(200).json ({
        message: `Berhasil menghapus game ${cariGame.title} dari library`
    })
})

app.post('/tambah-game', (req, res) => {
    const id = Game.length + 1
    const { title, author, rating } = req.body

    if (!title || !author) {
        return res.status(400).json({
            message: 'judul dan penulis harus diisi'
        })
    }

    const newGame = { id, title, author, rating}
    Game.push(newGame)
    res.status(201).json({
        message: 'Berhasil menambahkan Game ke library anda',
        data: newGame
    })
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})