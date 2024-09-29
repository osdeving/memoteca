import ui from './ui.js';
import api from './api.js';

const pensamentosSet = new Set()

async function adicionarChaveAoPensamento() {
    try {
        const pensamentos = await api.buscarPensamentos();
        pensamentos.forEach(pensamento => {
            const chavePensamento = `${pensamento.conteudo.trim().toLowerCase()}-${pensamento.autoria.trim().toLowerCase()}`
            pensamentosSet.add(chavePensamento)
        })
    } catch (error) {
        console.error(error);
        alert('Erro ao adicionar chave ao pensamento');
    }
}

const regexConteudo = /^[A-Za-z\s]+$/
const regexAutoria = /^[A-Za-z\s]+$/

function removerEspacos(texto) {
    return texto.replaceAll(/\s+/g, ' ').trim();
}

function validarConteudo(conteudo) {
    console.log(/^[A-Za-z\s]$/.test('teste'))
    return regexConteudo.test(conteudo)
}

function validarAutoria(autoria) {
    return regexAutoria.test(autoria)
}

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.getElementById('pensamento-form')
    const botaoCancelar = document.getElementById("botao-cancelar")
    const campoBusca = document.getElementById("campo-busca")

    const campoData = document.getElementById('pensamento-data')
    const hoje = new Date().toISOString().split('T')[0];
    campoData.value = hoje;

    // campoData.addEventListener('click', function(event) {
    //     // Obtém as dimensões do campo de data
    //     const rect = campoData.getBoundingClientRect();
    //     const clickX = event.clientX - rect.left; // Posição do clique dentro do input

    //     // Suponha que o valor da data ocupe os primeiros 70% do campo
    //     const limiteAreaVazia = rect.width * 0.18;

    //     if (clickX > limiteAreaVazia) {
    //         // Se o clique ocorreu na área "vazia" (onde está o ícone)
    //         console.log('Clique na área vazia, abrindo seletor de data...');
    //         campoData.showPicker(); // Abre o seletor de datas
    //     } else {
    //         console.log('Clique no valor da data.');
    //     }
    // });

    adicionarChaveAoPensamento();

    formularioPensamento.addEventListener('submit', manipularSubmissaoFormulario);
    botaoCancelar.addEventListener('click', manipularCancelamentoFormulario);
    campoBusca.addEventListener('input', manipularBusca);

});


async function manipularSubmissaoFormulario(evento) {
    evento.preventDefault();

    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;
    const data = document.getElementById('pensamento-data').value;

    const conteudoSemEspacos = removerEspacos(conteudo);
    const autoriaSemEspacos = removerEspacos(autoria);

    if(!validarConteudo(conteudoSemEspacos)) {
        alert('O conteúdo do pensamento deve ter apenas letras e espaços com um mínimo de 10 caracteres.');
        return; 
    }

    if(!validarAutoria(autoriaSemEspacos)) {
        alert('A autoria do pensamento deve ter apenas letras sem espaços, com um mínimo de 3 caracteres e máximo de 15 caracteres.');
        return;
    }

    if(!validarData(data)) {
        alert('Não é permitido inserir pensamentos com data futuras. Selecione outra data.');
        return;
    }

    const chaveNovoPensamento = `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`

    if(pensamentosSet.has(chaveNovoPensamento)) {
        alert('Esse pensamento já existe')
        return
    } else {
        pensamentosSet.add(chaveNovoPensamento)
    }

    try {
        id ? await api.atualizarPensamento({id, conteudo, autoria, data}) : await api.salvarPensamento({conteudo, autoria, data});
        ui.renderizarPensamentos();
        ui.limparFormulario();
    } catch (error) {
        console.error(error);
        alert('Erro ao salvar pensamento');
    }
}

async function manipularCancelamentoFormulario(evento) {
    ui.limparFormulario();
}    


async function manipularBusca(evento) {
    const termoBusca = document.getElementById("campo-busca").value;
    
    try {
        const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca);
        ui.renderizarPensamentos(pensamentosFiltrados);
    } catch (error) {
        console.error(error);
        alert('Erro ao buscar pensamento: ' + termoBusca);
    }
}

function validarData(data) {
    const dataAtual = new Date();
    const dataPensamento = new Date(data);
    return dataPensamento <= dataAtual;

}


