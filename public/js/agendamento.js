let listaDeAgendamento = []

async function carregarAgendamento() {
    const veiculos = await chamandoServer('/veiculo')
    document.getElementById('id_veiculo').innerHTML = 
    '<option value="">Selecione</option>' + 
     veiculos.map(veiculo => `<option value="${veiculo.id}">${veiculo.placa} - ${veiculo.modelo}</option>`).join('')
}