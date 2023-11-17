const express = require('express')
const app = express()
const port = 8080
const { Pool } = require('pg')

const pool = new Pool ({
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
    const doRegister = "INSERT INTO cadastro (nome, nometrust, nasc, email, emailtrust, cell, celltrust, cpf, conven, cep, numero, complemento, senha, imgbase) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);"

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
    const url = data.url

    try {
        const verify = await pool.query(registerExists, [email])

        if (verify.rows.length !== 0) {
            console.log("usuário já existe")
            
            const response = {
                message: 'tente outro email'
            }
            return res.status(401).json(response)
        }
        const register = await pool.query(doRegister, [name, nameTrusted, birthDate, email, emailTrusted, cell, cellTrusted, cpf, healthCare, cep, houseNumber, complement, password, url])

        console.log(register)
        const response = {
            message: 'conta criada',
            created: true
        }

        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Erro interno do servidor'})
    }
    
})

app.post('/login', async (req, res) => {
    const data = req.body
    const searchId = "SELECT id, nome FROM cadastro WHERE email = $1 AND senha = $2;"

    const email = data.email
    const password = data.email

    try {
        const hasId = await pool.query(searchId, [email, password])

        if (hasId.rows.length === 0) {
            console.log('este usuário não existe')

            const response = {
                message: 'usário inexistente',
                log: false
            }
            return res.status(401).json(response)
        }
        const id = hasId.rows[0].id
        const nome = hasId.rows[0].nome

        const response = {
            id: id,
            name: nome,
            message: 'usuário encontrado',
            log: true
        }
        res.status(200).json(response)
    } catch (err) {
        console.error(err)
    }
})

app.listen(port, (err) => {
    if (err) throw err
    console.log("servidor tá rodando")
})