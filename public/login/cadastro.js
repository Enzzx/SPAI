const cadastrar = document.forms[0]
const cep = document.querySelector("#zipCode")

cep.addEventListener('input', async (e) => {
    const cepValue = e.target.value

    if (cepValue.length === 8) {
        try {
            const request = await fetch(`https://viacep.com.br/ws/${cepValue}/json`)
            const local = await request.json()
            console.log(local)

            let address = document.querySelector("#address")
            let houseNumber = document.querySelector("#houseNumber")
            address.value = `${local.bairro} - ${local.logradouro}`
            houseNumber.placeholder = local.complemento
        } catch (error) {
            console.log(error)
        }
    } else {
        return
    }
})

cadastrar.addEventListener('submit', (e) => {
    console.log('clickei')
    e.preventDefault()

    const name = document.querySelector("#name").value
    const nameTrusted = document.querySelector("#nameTrusted").value
    const birthDate = document.querySelector("#birthdate").value
    const emailTrusted = document.querySelector("#emailTrusted").value
    const cell = document.querySelector("#number").value
    const cellTrusted = document.querySelector("#trustedCell").value
    const cpf = document.querySelector("#cpf").value
    const healthCare = document.querySelector("#healthcare").value
    const cep = document.querySelector("#zipCode").value
    const houseNumber = document.querySelector("#houseNumber").value
    const complement = document.querySelector("#complement").value
    const password = document.querySelector("#password").value
    const confirmPass = document.querySelector("#confirmPassword").value
    const image = document.querySelector("#image").files[0]

    if (password == confirmPass) {
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.addEventListener('load', async () => {
            const url = reader.result
            const data = { name, nameTrusted, birthDate, emailTrusted, cell, cellTrusted, cpf, healthCare, cep, houseNumber, complement, password, url }

            const head = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }

            try {
                const requisition = await fetch('/register', head)
                const result = await requisition.json()
            } catch (err) {
                if (err) throw err
            }
        })

    } else {
        document.querySelector("#confirmPassword").style.backgroundColor = "#fdd3c4";
    }
})