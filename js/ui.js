import api from './api.js';

const ui = {
    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId)
        document.getElementById('pensamento-id').value = pensamento.id
        document.getElementById('pensamento-conteudo').value = pensamento.conteudo
        document.getElementById('pensamento-autoria').value = pensamento.autoria
        document.getElementById('pensamento-data').value = pensamento.data.split('T')[0]
    
    
        document.getElementById('form-container').scrollIntoView({behavior: 'smooth'})
    },

    limparFormulario() {
        document.getElementById("pensamento-form").reset();
    },

    async renderizarPensamentos(pensamentosFiltrados = null) {

        const listaPensamentos = document.getElementById("lista-pensamentos")
        const mensagemVazia = document.getElementById("mensagem-vazia")
        listaPensamentos.innerHTML = ""
        
        try {

            let pensamentosParaRenderizar = pensamentosFiltrados || await api.buscarPensamentos()

            
            if (pensamentosParaRenderizar.length <= 0) { 
                mensagemVazia.style.display = "block"
            } else {
                mensagemVazia.style.display = "none"
                pensamentosParaRenderizar.forEach(ui.adicionarPensamentoNaLista)
            } 
        }
        catch {
          alert('Erro ao renderizar pensamentos')
        }
      },

    adicionarPensamentoNaLista(pensamento) { 
        const listaPensamentos = document.getElementById('lista-pensamentos');
        const li = document.createElement('li');
        li.classList.add('li-pensamento');
        li.setAttribute('data-id', pensamento.id);
        
        const iconeAspas = document.createElement('img');
        iconeAspas.classList.add('icone-aspas');
        iconeAspas.src = 'assets/imagens/aspas-azuis.png';
        iconeAspas.alt = 'Aspas Azuis';

        const pensamentoConteudo = document.createElement('div');
        pensamentoConteudo.classList.add('pensamento-conteudo');
        pensamentoConteudo.textContent = pensamento.conteudo;

        const pensamentoData = document.createElement('div');
        
        const options = {
            timeZone: 'UTC',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        }

        const dataFormatada = pensamento.data.toLocaleDateString('pt-BR', options);
        const dataComRegex  = dataFormatada.replace(/^(\w)/, match => match.toUpperCase());       
        pensamentoData.classList.add('pensamento-data');
        pensamentoData.textContent = dataComRegex;

        const pensamentoAutoria = document.createElement('div');
        pensamentoAutoria.classList.add('pensamento-autoria');
        pensamentoAutoria.textContent = pensamento.autoria;
        
        const botaoFavoritar = document.createElement('button');
        botaoFavoritar.classList.add('botao-favorito');
        botaoFavoritar.onclick = async () => {
            try {
                await api.atualizarFavorito(pensamento.id, !pensamento.favorito)
                ui.renderizarPensamentos()
            } catch (error) {
                console.error(error);
                alert('Erro ao favoritar pensamento: ' + pensamento.id)
            }
        };

        const iconeFavorito = document.createElement('img');
        iconeFavorito.src = pensamento.favorito ? 'assets/imagens/icone-favorito.png' : 'assets/imagens/icone-favorito_outline.png'
        iconeFavorito.alt = 'Favoritar Pensamento';
        botaoFavoritar.append(iconeFavorito);

        const botaoEditar = document.createElement('button');
        botaoEditar.classList.add('botao-editar');
        botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id);

        const iconeEditar = document.createElement('img');
        iconeEditar.src = 'assets/imagens/icone-editar.png';
        iconeEditar.alt = 'Editar Pensamento';
        botaoEditar.append(iconeEditar);

        const botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add('botao-excluir');
        botaoExcluir.onclick = async () => ui.excluirPensamento(pensamento.id);

        const iconeExcluir = document.createElement('img');
        iconeExcluir.src = 'assets/imagens/icone-excluir.png';
        iconeExcluir.alt = 'Excluir Pensamento';
        botaoExcluir.append(iconeExcluir);


        const icones = document.createElement('div');
        icones.classList.add('icones');
        icones.append(botaoFavoritar);
        icones.append(botaoEditar);
        icones.append(botaoExcluir);


        li.append(iconeAspas);
        li.append(pensamentoConteudo);
        li.append(pensamentoAutoria);
        li.append(pensamentoData);
        li.append(icones);

        listaPensamentos.append(li);
    },

    async excluirPensamento(id) {
        try {
            await api.excluirPensamentoPorId(id)
            ui.renderizarPensamentos()
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir pensamento: ' + id)
        }
    },
}

export default ui;