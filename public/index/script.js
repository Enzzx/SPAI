window.onload = async () => {
    console.log('iniciar verificação de dados')
    let userInfo = getCookie("userInfo")

    if (userInfo !== undefined) {
        console.log('tem cookies')
        const dados = sessionStorage.getItem('dadosUser')
        if (dados !== null) {
            userInfo = JSON.stringify(userInfo)
            let date = new Date()
            date.setDate(date.getDate() + 7)
            document.cookie = `userInfo=${userInfo}; expires=${date.toUTCString()}; SameSite=Strict; path=/`
            console.log('já tem dados na session, sem necessidade de verificação do token')

            const button = document.querySelector(".right")
            button.innerHTML = '<i class="fa-solid fa-user" style="color: #AB6517;"></i>Conta'
            button.href = 'public/conta/conta.html'

        } else {
            userInfo = JSON.parse(decodeURIComponent(userInfo))
            console.log(userInfo)

            const head = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userInfo.token}` }
            }

            try {
                const getAcc = await fetch('/getAccount', head)
                const resAcc = await getAcc.json()

                if (resAcc.has) {
                    let dadosUser = resAcc.dados
                    dadosUser = JSON.stringify(dadosUser)
                    console.log(resAcc.message)


                    sessionStorage.setItem('dadosUser', dadosUser)
                    userInfo = JSON.stringify(userInfo)
                    let date = new Date()
                    date.setDate(date.getDate() + 7)
                    document.cookie = `userInfo=${userInfo}; expires=${date.toUTCString()}; SameSite=Strict; path=/`

                    const button = document.querySelector(".right")
                    button.innerHTML = '<i class="fa-solid fa-user" style="color: #AB6517;"></i>Conta'
                    button.href = 'public/conta/conta.html'
                } else {
                    console.log('erro na verificação do token, fazer login')
                }
            } catch (err) {
                console.error(err)
            }
        }
    } else {
        return console.log('não tem cookies', userInfo)
    }
}

function getCookie(cookieName) {
    const cookies = document.cookie.split('; ')
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=')
        if (cookie[0] === cookieName) {
            return cookie[1]
        }
    }
}