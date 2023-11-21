const express = require('express')
const app = express()
const port = 8080
const jwt = require('jsonwebtoken')
const { Pool } = require('pg')

const pool = new Pool({
    user: 'zenzx',
    host: 'dpg-claoom3mot1c73849ajg-a',
    database: 'db_kanjicionario',
    password: 'NgRyRiN9GiIwnCacpDI7k00yHaHNfYut',
    port: 5432
})
pool.connect()
    .then(() => {
        console.log("DB tá na linha")
    })
    .catch(err => {
        console.log(err)
    })

app.use(express.json({ limit: '10mb' }))
app.use(express.static(__dirname))

app.post('/register', async (req, res) => {
    const data = req.body
    const registerExists = "SELECT * FROM cadastro WHERE email = $1;"
    const doRegister = "INSERT INTO cadastro (nome, nometrust, email, emailtrust, cell, celltrust, cpf, conven, cep, numero, complemento, senha, nasc) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);"

    const name = data.name
    const nameTrusted = data.nameTrusted
    const birthDate = data.birthDate
    const email = data.email
    const emailTrusted = data.emailTrusted
    const cell = data.cell
    const cellTrusted = data.cellTrusted
    const cpf = data.cpf
    const healthCare = data.healthCare
    const cep = data.cep
    const houseNumber = data.houseNumber
    const complement = data.complement
    const password = data.password

    try {
        const verify = await pool.query(registerExists, [email])

        if (verify.rows.length !== 0) {
            console.log("usuário já existe")

            const response = {
                message: 'tente outro email',
                exists: true
            }
            return res.status(401).json(response)
        }
        const register = await pool.query(doRegister, [name, nameTrusted, email, emailTrusted, cell, cellTrusted, cpf, healthCare, cep, houseNumber, complement, password, birthDate])

        const response = {
            message: 'conta criada',
            created: true
        }

        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro interno do servidor' })
    }

})

app.post('/logIn', async (req, res) => {
    const data = req.body
    const searchId = "SELECT id, nome FROM cadastro WHERE email = $1 AND senha = $2;"

    const email = data.email
    const password = data.password

    try {
        const hasId = await pool.query(searchId, [email, password])

        if (hasId.rows.length === 0) {
            console.log('este usuário não existe')

            const response = {
                message: 'senha ou email incorretos',
                log: false
            }
            return res.status(401).json(response)
        }
        const id = hasId.rows[0].id
        const nome = hasId.rows[0].nome
        const token = jwt.sign({ id: id }, 'SPFC', { expiresIn: '7d' })

        const response = {
            token: token,
            name: nome,
            message: 'usuário encontrado',
            log: true
        }
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
    }
})

app.post('/getAccount', async (req, res) => {
    const tokenHeader = req.headers['authorization'];

    if (!tokenHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = tokenHeader.split(' ')[1];
    const payload = jwt.verify(token, 'SPFC')
    const id = payload.id
    const pegar = "SELECT * from cadastro WHERE id = $1;"
    try {
        const dados = await pool.query(pegar, [id])
        const data = {
            dados: dados.rows[0],
            message: 'id recebido',
            has: true
        }
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }


})

app.delete('/deleteAcc', async (req, res) => {
    const id = req.query.id
    const deleteQuery = "DELETE FROM cadastro WHERE id = $1;"

    try {
        const deleted = await pool.query(deleteQuery, [id])

        const response = {
            message: 'conta deletada com sucesso'
        }
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
    }
})

app.post('/chamada', async (req, res) => {
    const data = req.body
    
    const usuario_id = data.id
    const nome = data.nome
    const localizacao = data.localizacao
    const orgao = data.orgao
    const motivo = data.motivo
    const query = "INSERT INTO chamadas (usuario_id, nome, localizacao, orgao, motivo) VALUES ($1, $2, $3, $4, $5);"

    try {
        const store = await pool.query(query, [usuario_id, nome, localizacao, orgao, motivo])

        res.status(200)
    } catch (err) {
        console.log(err)
    }

})

app.listen(port, (err) => {
    if (err) throw err
    console.log("servidor tá rodando")
})
