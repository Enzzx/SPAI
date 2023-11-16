const express = require('express')
const app = express()
const port = 8080

app.use(express.json({ limit: '10mb' }))
app.use(express.static(__dirname))

app.post('/register', async (req, res) => {
    const data = req.body

    const name = data.name
    const nameTrusted = data.nameTrusted
    const birthDate = data.birthDate
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

    console.log(`${name} e ${nameTrusted} e ${birthDate} e ${emailTrusted} e ${cell} e ${cellTrusted} e ${cpf} e ${healthCare} e ${cep} e ${houseNumber} e ${complement} e ${password}`)
    
})

app.post('/login', async (req, res) => {
    
})

app.listen(port, (err) => {
    if (err) throw err
    console.log("servidor tá rodando")
})