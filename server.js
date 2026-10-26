import express from 'express'
import pool from './db.js'
import cors from 'cors'
import bcrypt, { hash } from 'bcryptjs'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3000


// ROTA LOGIN - CRIA USUARIO

app.post('/registro', async (req, res) => {
    const {nome, login, senha} = req.body
    try{
        if(!nome || !login || !senha){
            return res.status(400). json({
                erro: "Nome, login e senha são obrigatórios!"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const senhaHashed = await bcrypt.hash(senha, salt)
        const resultado = await pool.query('INSERT INTO usuario (nome, login, senha) VALUES ($1, $2, $3) RETURNING id, nome, login', [nome, login, senhaHashed])

        res.json(resultado.rows[0])
    }catch(erro){
        res.json({message: "erro"})
    }
})


app.post('/login', async (req, res) => {
    const {login, senha} = req.body
    const resultado = await pool.query('SELECT * FROM usuario WHERE login = $1', [login])

    if(resultado.rows.length === 0){
        return res.status(401).json({
            erro: "Login e senha inválidos."
        })
    }

    const usuario = resultado.rows[0]

    const senhaCerta = await bcrypt.compare(senha, usuario.senha)

    if(!senhaCerta){
        return res.status(401).json({
            erro: "Login e senha inválidos."
        })
    }

    return res.status(200).json({
        messagem: "Login realizado com sucesso.",
        user: {
            "nome": usuario.nome
        }
    })
})

// ROTAS CLIENTES

app.get('/cliente', async (req, res) => {
    const clientes = await pool.query('SELECT id, nome, cpf, telefone FROM cliente')
    res.json(clientes.rows)
})

app.post('/cliente', async (req, res) => {
    const {nome, cpf, telefone} = req.body

    const novoCliente = await pool.query('INSERT INTO cliente (nome, cpf, telefone) VALUES ($1, $2, $3) RETURNING *', [nome, cpf, telefone])

    res.json(novoCliente.rows[0])
})

app.put('/cliente/:id', async (req, res) => {
    const {id} = req.params

    const {nome, cpf, telefone} = req.body

    const attCliente = await pool.query('UPDATE cliente SET nome = $1, cpf = $2, telefone = $3 WHERE id = $4 RETURNING *', [nome, cpf, telefone, id])

    res.json(attCliente.rows[0])
})

app.delete('/cliente/:id', async (req, res) => {
    const {id} = req.params

    const deletarCliente = await pool.query('DELETE FROM cliente WHERE id = $1 RETURNING *', [id])

    res.json(deletarCliente.rows[0])
})

// ROTAS VEICULOS

app.get('/veiculo', async (req, res) => {
    const resultado = await pool.query(`
        SELECT
            veiculo.id,
            veiculo.placa,
            veiculo.modelo,
            veiculo.ano,
            veiculo.id_cliente,
            cliente.nome AS cliente
        FROM veiculo
        JOIN cliente ON cliente.id = veiculo.id_cliente
        ORDER BY veiculo.id
    `)

    res.json(resultado.rows)
})

app.post('/veiculo', async (req, res) => {
    const {placa, modelo, ano, id_cliente} = req.body

    const novoRegistro = await pool.query('INSERT INTO veiculo (placa, modelo, ano, id_cliente) VALUES ($1, $2, $3, $4) RETURNING *', [placa, modelo, ano, id_cliente])

    res.json(novoRegistro.rows[0])
})

app.put('/veiculo/:id', async (req, res) => {
    const {id} = req.params

    const {placa, modelo, ano, id_cliente} = req.body

    const attRegistro = await pool.query('UPDATE veiculo SET placa = $1, modelo = $2, ano = $3, id_cliente = $4 WHERE id = $5 RETURNING *', [placa, modelo, ano, id_cliente, id])

    res.json(attRegistro.rows[0])
})

app.delete('/veiculo/:id', async (req, res) => {
    const {id} = req.params

    const deletarRegistro = await pool.query('DELETE FROM veiculo WHERE id = $1 RETURNING *', [id])

    res.json(deletarRegistro.rows[0])
})

// ROTAS AGENDAMENTO

app.get('/agendamento', async (req, res) => {
    const resultado = await pool.query(`
        SELECT
            agendamento.id,
            TO_CHAR(agendamento.data_agendamento, 'YYYY-MM-DD') AS data_agendamento,
            agendamento.servico,
            agendamento.id_veiculo,
            agendamento.id_cliente,
            cliente.nome AS cliente,
            veiculo.placa,
            veiculo.modelo
        FROM agendamento
        JOIN veiculo ON veiculo.id = agendamento.id_veiculo
        JOIN cliente ON cliente.id = agendamento.id_cliente
        ORDER BY agendamento.data_agendamento
    `)

    res.json(resultado.rows)
})

app.post('/agendamento', async (req, res) => {
    const {data_agendamento, servico, id_veiculo, id_cliente} = req.body

    const novoAgendamento = await pool.query('INSERT INTO agendamento (data_agendamento, servico, id_veiculo, id_cliente) VALUES ($1, $2, $3, $4) RETURNING *', [data_agendamento, servico, id_veiculo, id_cliente])

    res.json(novoAgendamento.rows[0])
})

app.put('/agendamento/:id', async (req, res) => {
    const {id} = req.params

    const {data_agendamento, servico, id_veiculo, id_cliente} = req.body

    const attAgendamento = await pool.query('UPDATE agendamento SET data_agendamento = $1, servico = $2, id_veiculo = $3, id_cliente = $4 WHERE id = $5 RETURNING *', [data_agendamento, servico, id_veiculo, id_cliente, id])

    res.json(attAgendamento.rows[0])
})

app.delete('/agendamento/:id', async (req, res) => {
    const {id} = req.params

    const deletarAgendamento = await pool.query('DELETE FROM agendamento WHERE id = $1 RETURNING *', [id])

    res.json(deletarAgendamento.rows[0])
})


app.listen(PORT, () =>{
    console.log("Rodando na porta: ", PORT)
})