create table if not exists usuario(
id serial primary key,
nome varchar(100) not null,
login varchar(100) not null unique,
senha text not null
);

create table if not exists cliente(
id serial primary key,
nome varchar(100) not null,
cpf varchar(100) not null,
telefone varchar(100) not null
);

create table if not exists veiculo(
id serial primary key,
placa varchar(100) not null,
modelo varchar(100) not null,
ano int not null,
id_cliente int not null,
foreign key (id_cliente) references cliente(id)
);

create table if not exists agendamento(
id serial primary key,
data_agendamento date not null,
servico varchar(100) not null,
id_veiculo int not null,
foreign key (id_veiculo) references veiculo(id),
id_cliente int not null,
foreign key (id_cliente) references cliente(id)
);

-- USUARIOS
INSERT INTO usuario (nome, login, senha) VALUES
('João Silva', 'joao.silva', 'senha123'),
('Maria Oliveira', 'maria.oliveira', 'senha456'),
('Pedro Santos', 'pedro.santos', 'senha789');


-- CLIENTES
INSERT INTO cliente (nome, cpf, telefone) VALUES
('Carlos Souza', '12345678901', '48999991111'),
('Ana Pereira', '98765432100', '48988882222'),
('Lucas Ferreira', '45678912300', '48977773333');


-- VEICULOS
INSERT INTO veiculo (placa, modelo, ano, id_cliente) VALUES
('ABC1D23', 'Honda Civic', 2020, 1),
('DEF4G56', 'Toyota Corolla', 2022, 2),
('GHI7J89', 'Volkswagen Gol', 2018, 3);


-- AGENDAMENTOS
INSERT INTO agendamento (data_agendamento, servico, id_veiculo, id_cliente) VALUES
('2026-10-20', 'Troca de óleo', 1, 1),
('2026-10-21', 'Alinhamento e balanceamento', 2, 2),
('2026-10-22', 'Revisão geral', 3, 3);

