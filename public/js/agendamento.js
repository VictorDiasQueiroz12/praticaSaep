let listaDeAgendamento = []

async function carregarAgendamento() {
    const veiculos = await chamandoServer('/veiculo')
    document.getElementById('id_veiculo').innerHTML = 
    '<option value="">Selecione o  veículo</option>' + 
     veiculos.map(veiculo => `<option value="${veiculo.id}">${veiculo.placa} - ${veiculo.modelo}</option>`).join('')


    listaDeAgendamento = await chamandoServer('/agendamento')
    document.getElementById('tabela').innerHTML = listaDeAgendamento.map(agendamento => `
        <tr>
            <td>${agendamento.data_agendamento}</td>
            <td>${agendamento.servico}</td>
            <td>${agendamento.cliente}</td>
            <td>${agendamento.placa}</td>
            <td>${agendamento.modelo}</td>
            <td>Ações</td>
            <td>
                <button onclick="preencherFormularioDeAgendamento(${agendamento.id})">Editar</button>
                <button onclick="excluirAgendamento(${agendamento.id})">Excluir</button>
            </td>
        </tr>
        `).join('')
}