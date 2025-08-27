const express = require('express'); // Importa o Express
const app = express(); // Cria uma aplicação Express
const pool = require('./bd')
require('dotenv').config();
const path = require('path');
const cors = require('cors');


// Servir arquivos estáticos da pasta "public"
// app.use(express.static('public'));

// Servir arquivos estáticos da pasta "frontend"
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.use(cors());

//Converte os dados que chegam em Json
app.use(express.json())


//Cadastrar Categorias
app.post('/api/', async (req, res) => {

    try {
        const { nome, descricao } = req.body

        if (!nome) {
            return res.status(400).json({ error: 'Categoria é obrigatória' });
        }

        const result = await pool.query('INSERT INTO categorias (nome_categoria, descricao_categoria) values ($1, $2) RETURNING *', [nome, descricao])

        res.json(result.rows[0])
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao inserir categoria' });
    }
});


//Listar Categorias
app.get('/api/listar', async (req, res) => {

    try {
        const listaCategoria = await pool.query('SELECT * from categorias')

        res.json(listaCategoria.rows)

    } catch (error) {
        console.log(error)
    }
});


//Editar Categorias
app.put('/api/editar/:id', async (req, res) => {

    try {
        const { descricao } = req.body
        const { id } = req.params;

        const result = await pool.query('UPDATE categorias SET descricao_categoria = $1 WHERE id_categoria = $2 RETURNING *', [descricao, id])

        res.json(result.rows[0]);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao editar a categoria' });
    }

});


//Deletar Categorias
app.delete('/api/deletar/:id', async (req, res) => {

    try {
        const { id } = req.params;

        await pool.query('DELETE FROM categorias WHERE id_categoria = $1', [id])

        res.sendStatus(204);

    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar a categoria' });
    }
});

//E la vamos nos!
// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});