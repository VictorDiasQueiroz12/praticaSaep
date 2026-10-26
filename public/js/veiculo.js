let listaDeVeiculos = [];

async function carregarVeiculos() {
  const clientes = await chamandoServer('/cliente');
  document.getElementById('id_cliente').innerHTML =
    '<option value="">Selecione o cliente</option>' +
    clientes.map(cliente => `<option value="${cliente.id}">${cliente.nome}</option>`).join('');

  listaDeVeiculos = await chamandoServer('/veiculo');
  document.getElementById('tabela').innerHTML = listaDeVeiculos.map(veiculo => `
    <tr>
      <td>${veiculo.placa}</td>
      <td>${veiculo.modelo}</td>
      <td>${veiculo.ano}</td>
      <td>${veiculo.cliente}</td>
      <td>
        <button type="button" onclick="preencherFormularioDeVeiculo(${veiculo.id})">Editar</button>
        <button type="button" onclick="excluirVeiculo(${veiculo.id})">Excluir</button>
      </td>
    </tr>
  `).join('');
}

function limparFormularioDeVeiculo() {
  document.getElementById('formulario').reset();
  document.getElementById('id').value = '';
}

function preencherFormularioDeVeiculo(idDoVeiculo) {
  const veiculo = listaDeVeiculos.find(veiculoDaLista => veiculoDaLista.id == idDoVeiculo);
  document.getElementById('id').value = veiculo.id;
  document.getElementById('placa').value = veiculo.placa;
  document.getElementById('modelo').value = veiculo.modelo;
  document.getElementById('ano').value = veiculo.ano;
  document.getElementById('id_cliente').value = veiculo.id_cliente;
}

async function excluirVeiculo(idDoVeiculo) {
  await chamandoServer('/veiculo/' + idDoVeiculo, 'DELETE');
  carregarVeiculos();
}

document.getElementById('formulario').onsubmit = async (evento) => {
  evento.preventDefault();
  const idDoRegistro = document.getElementById('id').value;
  const dadosDoVeiculo = {
    placa: document.getElementById('placa').value,
    modelo: document.getElementById('modelo').value,
    ano: document.getElementById('ano').value,
    id_cliente: document.getElementById('id_cliente').value,
  };

  if (idDoRegistro) await chamandoServer('/veiculo/' + idDoRegistro, 'PUT', dadosDoVeiculo);
  else await chamandoServer('/veiculo', 'POST', dadosDoVeiculo);
  limparFormularioDeVeiculo();
  carregarVeiculos();
};

carregarVeiculos();