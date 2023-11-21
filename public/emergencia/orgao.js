let conectado = false
const dados = sessionStorage.getItem('dadosUser')
if (dados !== null) {
    conectado = true
}

async function validateForm(event) {
    event.preventDefault();

    let motivoSelecionado = document.querySelector('input[name="motivo"]:checked');
    if (conectado) {
        if (!motivoSelecionado) {
            alert("Selecione um motivo antes de confirmar a chamada.");
            return false;
        }
        const id = dados.id
        const nome = dados.nome
        const localizacao = dados.cep
        let call = document.querySelector("#call").textContent.toLowerCase()
        const orgao = call
        const motivo = motivoSelecionado.value

        const data = { id, nome, localizacao, orgao, motivo }
        const head = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        try {
            const chamando = await fetch('/calls', head)
            const chamada = await chamando.json()

            console.log(chamada.message)
            call = call.slice(0, 4).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            
            window.location.assign(`https://spai.onrender.com/public/emergencia/confirmacaoEmerg/confirmar-${call}.html`);
        } catch (err) {
            if (err) throw err
            console.log('não foi possível armazenar os dados da chamada')
        }
    } else {
        console.log('você não está conectado')
        alert("conecte-se à uma conta")
    }
}