window.onload = async () => {
    const dados = sessionStorage.getItem('dadosUser')
    
    if (dados == null) {
        window.location.assign('https://spai.onrender.com/public/login/login.html')
    }
}
const dados = sessionStorage.getItem('dadosUser')
console.log(dados)

const classes = ['nome', 'nometrust', 'email', 'emailtrust', 'cell', 'celltrust', 'cpf', 'conven', 'cep', 'numero', 'complemento', 'nasc', 'senha']
classes.forEach(classe => {
    nomear(classe)
})
function nomear(classe) {
    document.querySelectorAll(`.${classe}`).forEach(elemento => {
        if (elemento.tagName.toLowerCase() === 'p') {
            elemento.textContent = dados[classe]
        } else {
            elemento.value = dados[classe]
        }
    })
}
/*document.querySelector(".nome").textContent = dados.nome
document.querySelector(".nometrust").textContent = dados.nomeTrust
document.querySelector(".email").textContent = dados.email
document.querySelector(".emailTrust").textContent = dados.emailtrust
document.querySelector(".cell").textContent = dados.cell
document.querySelector(".cellTrust").textContent = dados.celltrust
document.querySelector(".cpf").textContent = dados.cpf
document.querySelector(".convenio").textContent = dados.conven
document.querySelector(".cep").textContent = dados.cep
document.querySelector(".numero").textContent = dados.numero
document.querySelector(".complemento").textContent = dados.complemento
document.querySelector(".nasc").textContent = dados.nome.split('T')[0]
document.querySelector(".senha").textContent = dados.senha*/



const editar = document.querySelector("#editar")
const sair = document.querySelector("#sair")
const excluir = document.querySelector("#excluir")
const atualizar = document.querySelector("form")
const cancelar = document.querySelector("#cancelar")

editar.addEventListener('click', () => {
    console.log('apertei')
    document.querySelector('main').style.display = 'none'
    document.querySelector('form').style.display = 'flex'
})

sair.addEventListener('click', () => {
    sessionStorage.clear()
    document.cookie = 'userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    window.location.assign('https://spai.onrender.com')
})

excluir.addEventListener('click', async () => {
    const id = dados.id
    const head = {
        method: 'DELETE'
    }

    try {
        const deleting = await fetch(`/deleteAcc?id=${id}`, head)
        const deleted = await deleting.json()

        document.querySelector("#container").innerHTML = deleted.message
    } catch (err) {
        console.log(err)
    }
})

cancelar.addEventListener('click', () => {
    document.querySelector('main').style.display = 'flex'
    document.querySelector('form').style.display = 'none'
})

atualizar.addEventListener('submit', async (e) => {
    e.preventDefault()


})