const api = {
    async buscarPensamento() {
        try {
            const response = await fetch('http://localhost:3000/pensamentos')
            return await response.json();
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar pensamento');
        }
    },

    async salvarPensamento(pensamento) {
        try {
            const response = await fetch('http://localhost:3000/pensamentos', {
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


    async buscarPensamentoPorId(id) {
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${id}`)
            return await response.json();
        } catch (error) {
            console.error(error);
            alert('Erro ao buscar pensamento: ' + id);
        }
    },

    async excluirPensamentoPorId(id) {
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${id}`, { method: 'DELETE' })
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir pensamento');
            throw error;
        }
    },

    async atualizarPensamento(pensamento) {
        try {

            const response = await fetch(`http://localhost:3000/pensamentos/${pensamento.id}`, {
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