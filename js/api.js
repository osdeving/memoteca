const URL_BASE = 'http://localhost:3000';

const api = {
    async buscarPensamentos() {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos`)
            return await response.json();
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar pensamento');
        }
    },

    async salvarPensamento(pensamento) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pensamento)
            })
            return await response.json();
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar pensamento: ' + pensamento);
        }
    },

    async buscarPensamentoPorTermo(termo) {
        try {
            const pensamentos = await this.buscarPensamentos();
            const termoEmMinusculas = termo.toLowerCase();

            const pensamentosFiltrados = pensamentos.filter(pensamento => {
                return pensamento.conteudo.toLowerCase().includes(termoEmMinusculas) ||
                pensamento.autoria.toLowerCase().includes(termoEmMinusculas)
            })

            return pensamentosFiltrados
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar pensamento: ' + pensamento);
        }
    },


    async buscarPensamentoPorId(id) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`)
            return await response.json();
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar pensamento: ' + id);
        }
    },

    async excluirPensamentoPorId(id) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`, { method: 'DELETE' })
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir pensamento');
            throw error;
        }
    },

    async atualizarPensamento(pensamento) {
        try {

            const response = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pensamento)
            })
            return await response.json();
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar pensamento: ' + pensamento.id);
        }
    },

}

export default api;