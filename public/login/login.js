document.forms[0].addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    const data = { email, password }
    const head = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    try {
        const login = await fetch('/logIn', head)
        const result = await login.json()

        if (result.log) {
            const token = result.token
            const nome = result.name

            console.log(`login realizado, ${nome} + ${token}`)

            let resCookie = {
                token: token,
                nome: nome
            }
            resCookie = JSON.stringify(resCookie)
            let date = new Date()
            date.setDate(date.getDate() + 7)
            document.cookie = `userInfo=${resCookie}; expires=${date.toUTCString()}; SameSite=None; path=/`

            window.location.assign("https://spai.onrender.com")
        } else {
            console.log(result.message)
        }
    } catch (err) {
        console.error(err)
    }
})