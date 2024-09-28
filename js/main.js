import ui from './ui.js';
import api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.getElementById('pensamento-form')
    const botaoCancelar = document.getElementById("botao-cancelar")
    const campoBusca = document.getElementById("campo-busca")

    formularioPensamento.addEventListener('submit', manipularSubmissaoFormulario);
    botaoCancelar.addEventListener('click', manipularCancelamentoFormulario);
    campoBusca.addEventListener('input', manipularBusca);

});


async function manipularSubmissaoFormulario(evento) {
    evento.preventDefault();

    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;

    try {
        id ? await api.atualizarPensamento({id, conteudo, autoria}) : await api.salvarPensamento({conteudo, autoria});
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


