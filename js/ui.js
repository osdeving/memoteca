import api from './api.js';

const ui = {
    async renderizarPensamentos() {
         const listaPensamentos = document.getElementById("lista-pensamentos")
        const mensagemVazia = document.getElementById("mensagem-vazia")
        listaPensamentos.innerHTML = ""
      
        try {
            const pensamentos = await api.buscarPensamento()
            
          if (pensamentos.length <= 0) { 
            mensagemVazia.style.display = "block"
          } else {
            mensagemVazia.style.display = "none"
            pensamentos.forEach(ui.adicionarPensamentoNaLista)
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

        const pensamentoAutoria = document.createElement('div');
        pensamentoAutoria.classList.add('pensamento-autoria');
        pensamentoAutoria.textContent = pensamento.autoria;
        
        const botaoEditar = document.createElement('button');
        botaoEditar.classList.add('botao-editar');
        botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id);

        const iconeEditar = document.createElement('img');
        iconeEditar.src = 'assets/imagens/icone-editar.png';
        iconeEditar.alt = 'Editar Pensamento';
        botaoEditar.append(iconeEditar);

        const botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add('botao-excluir');
        botaoExcluir.onclick = () => ui.excluirPensamento(pensamento.id);

        const iconeExcluir = document.createElement('img');
        iconeExcluir.src = 'assets/imagens/icone-excluir.png';
        iconeExcluir.alt = 'Excluir Pensamento';
        botaoExcluir.append(iconeExcluir);

        const icones = document.createElement('div');
        icones.classList.add('icones');
        icones.append(botaoEditar);
        icones.append(botaoExcluir);


        li.append(iconeAspas);
        li.append(pensamentoConteudo);
        li.append(pensamentoAutoria);
        li.append(icones);

        listaPensamentos.append(li);
    }

    ,

    async inserirPensamento() {
        const pensamentId = document.getElementById('pensamento-id').value;
        const conteudo = document.getElementById('pensamento-conteudo').value;
        const autoria = document.getElementById('pensamento-autoria').value;

        const pensamento = {
            conteudo,
            autoria
        }

        try {
            pensamentId ? await api.atualizarPensamento({id: pensamentId, ...pensamento}): await api.salvarPensamento(pensamento)
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar pensamento');
        }
    },

    limparFormulario() {
        document.getElementById("pensamento-form").reset();
    },

    excluirPensamento(id) {
        try {
            api.excluirPensamentoPorId(id);
            this.renderizarPensamentos();
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir pensamento: ' + id);
        }
    },

    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId)
        document.getElementById('pensamento-id').value = pensamento.id;
        document.getElementById('pensamento-conteudo').value = pensamento.conteudo;
        document.getElementById('pensamento-autoria').value = pensamento.autoria

        document.getElementById('pensamento-form').scrollIntoView({
            behavior: 'smooth'
        });
    }


}

export default ui;