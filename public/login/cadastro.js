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
    e.preventDefault()

    const name = document.querySelector("#name").value
    const nameTrusted = document.querySelector("#nameTrusted").value
    const birthDate = document.querySelector("#birthdate").value
    const email = document.querySelector("#email").value
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
            let data = { name, nameTrusted, birthDate, email, emailTrusted, cell, cellTrusted, cpf, healthCare, cep, houseNumber, complement, password, url }

            const head = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }

            try {
                const requisition = await fetch('/register', head)
                const result = await requisition.json()
                const responseP = document.querySelector(".response-p")

                if (result.exists) {
                    document.querySelector("#email").style.backgroundColor = "#fdd3c4";
                    document.querySelector("#email").placeholder = "email já em uso"
                    responseP.textContent = result.message

                } else {
                    console.log(result.message)
                    if (result.created) {
                        console.log('login automático')
                        data = { email, password }

                        async function autoRegister() {
                            try {
                                const login = await fetch('/logIn', head)
                                const loginResponse = await login.json()

                                if (loginResponse.log) {
                                    const token = loginResponse.token
                                    const nome = loginResponse.name


                                    console.log(`login automático realizado com sucesso`)

                                    let userInfo = {
                                        token: token,
                                        nome: nome
                                    }
                                    userInfo = JSON.stringify(userInfo)
                                    let date = new Date()
                                    date.setDate(date.getDate() + 7)
                                    document.cookie = `userInfo=${userInfo}; expires=${date.toUTCString()}; SameSite=Strict; path=/`
                                    window.location.assign('https://spai.onrender.com/')
                                } else {
                                    console.log('login automático falhou')
                                }
                            } catch (err) {
                                console.error(err)
                            }
                        }
                        autoRegister()

                    } else {
                        responseP.textContent = result.message
                    }
                }
            } catch (err) {
                if (err) throw err
            }
        })

    } else {
        document.querySelector("#confirmPassword").style.backgroundColor = "#fdd3c4";
    }
})