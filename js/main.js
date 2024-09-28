import ui from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.getElementById('pensamento-form');
    const botaoCancelar = document.getElementById("botao-cancelar")

    formularioPensamento.addEventListener('submit', manipularSubmissaoFormulario);
    botaoCancelar.addEventListener('click', manipularCancelamentoFormulario);
});


async function manipularSubmissaoFormulario(evento) {
    evento.preventDefault();
    ui.inserirPensamento();
    ui.renderizarPensamentos();
}

async function manipularCancelamentoFormulario(evento) {
    evento.preventDefault();
    ui.limparFormulario();
}    





