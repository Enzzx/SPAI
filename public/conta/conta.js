window.onload = async () => {
    const dados = sessionStorage.getItem('dadosUser')

    if (dados == null) {
        window.location.assign('https://spai.onrender.com/public/login/login.html')
    }
}
let dados = sessionStorage.getItem('dadosUser')
dados = JSON.parse(dados)

console.log(dados)

const classes = ['nome', 'nometrust', 'email', 'emailtrust', 'cell', 'celltrust', 'cpf', 'conven', 'cep', 'numero', 'complemento', 'senha']
classes.forEach(classe => {
    nomear(classe)
})
function nomear(classe) {
    document.querySelectorAll(`.${classe}`).forEach(elemento => {
        if (elemento.tagName.toLowerCase() === 'p') {
            elemento.textContent = dados[`${classe}`]
        } else {
            elemento.value = dados[`${classe}`]
        }
    })
}
document.querySelector("#birthdate").value = dados.nasc.split('T')[0]
document.querySelector(".nasc").textContent = dados.nasc.split('T')[0]



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
    console.log("começar exclusão")
    const head = {
        method: 'DELETE'
    }

    try {
        const deleting = await fetch(`/deleteAcc?id=${id}`, head)
        const deleted = await deleting.json()

        console.log('exclusão terminada')
        sessionStorage.clear()
        document.cookie = 'userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        alert(deleted.message)
        window.location.assign("https://spai.onrender.com")
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
    
    const id = dados.id
    const nome = document.querySelector("#name").value
    const nomeTrust = document.querySelector("#nameTrusted").value
    const email = document.querySelector("#email").value
    const emailTrust = document.querySelector("#emailTrusted").value
    const cell = document.querySelector("#number").value
    const cellTrust = document.querySelector("#trustedCell").textContent = dados.celltrust
    const cpf = document.querySelector("#cpf").value
    const convenio = document.querySelector("#healthcare").value
    const cep = document.querySelector("#zipCode").value
    const numero = document.querySelector("#houseNumber").value
    const complemento = document.querySelector("#complement").value
    const nasc = document.querySelector("#birthdate").value
    const senha = document.querySelector("#password").value

    const data = { id, nome, nomeTrust, email, emailTrust, cell, cellTrust, cpf, convenio, cep, numero, complemento, nasc, senha }
    const head = {
        method: 'PUT',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(data)
    }

    try {
        const editing = await fetch('/updateData', head)
        const edited = await editing.json()

        console.log(edited.message)

        sessionStorage.clear()
        window.location.assign('https://spai.onrender.com/public/login/login.html')
    } catch (err) {
        console.error(err)
    }
})

function validarData(input) {
    let dataAtual = new Date();
    let dataInserida = new Date(input.value);

    if (dataInserida > dataAtual) {
        alert("Data de nascimento não pode ser no futuro.");
        input.value = '';
    }
}

document.getElementById('birthdate').max = new Date().toISOString().split('T')[0];

function inputCPF(input) {
    let numero = input.value.replace(/\D/g, '');

    if (numero.length > 11) {
        input.value = numero.slice(0, 11);
    }
}

// Adiciona um ouvinte de evento para limitar enquanto digita
let cpfInput = document.getElementById('cpf');
cpfInput.addEventListener('input', function () {
    inputCPF(cpfInput);
});


function formatarTelefone(input) {
    let numero = input.value.replace(/\D/g, '');
    let formatacao;

    if (numero.length <= 2) {
        formatacao = `(${numero}`;
    } else if (numero.length <= 7) {
        formatacao = `(${numero.slice(0, 2)}) ${numero.slice(2)}`;
    } else {
        formatacao = `(${numero.slice(0, 2)}) ${numero.slice(2, 7)}-${numero.slice(7, 11)}`;
    }

    input.value = formatacao;
}
