const URL_BASE = 'http://localhost:3000';

const converterStringParaData = (dataString) => {
    const [ano, mes, dia] = dataString.split('-');
    return new Date(Date.UTC(ano, mes - 1, dia));
}

const api = {
    async buscarPensamentos() {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos`)
            const pensamentos = await response.json();

            return pensamentos.map(pensamento => {
                const data = new Date(pensamento.data);
                return { ...pensamento, data };
            });

        } catch (error) {
            console.error(error);
            alert('Erro ao buscar pensamento');
        }
    },

    async salvarPensamento(pensamento) {
        try {
            const data = converterStringParaData(pensamento.data);

            const response = await fetch(`${URL_BASE}/pensamentos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...pensamento, data: data.toISOString()}) 
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
            const pensamento = await response.json();

            return pensamento
           
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

    async atualizarFavorito(id, favorito) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ favorito })
            })
            return await response.json();
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar favorito: ' + id);
        }
    }

}

export default api;