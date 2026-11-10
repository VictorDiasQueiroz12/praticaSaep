-- Os dados de exemplo usam a chave DATA_ENCRYPTION_KEY do .env local. Preserve essa chave.
create table if not exists usuario(
id serial primary key,
nome varchar(100) not null,
login varchar(100) not null unique,
senha text not null
);

create table if not exists cliente(
id serial primary key,
nome varchar(100) not null,
cpf text not null,
telefone text not null
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
foreign key (id_veiculo) references veiculo(id)
);

-- USUARIOS
INSERT INTO usuario (nome, login, senha) VALUES
('João Silva', 'joao.silva', '$2b$10$H0ke24ahqS.xHmArWyrxVefu064felGc0htUXEaMXlDLmKG.Afsje'),
('Maria Oliveira', 'maria.oliveira', '$2b$10$IwI0zGk8t4dvDiwKv.zcLeOsR6xcCXm/85y.sTzfPWx1W9nEu2Dw6'),
('Pedro Santos', 'pedro.santos', '$2b$10$OAqS5RIDXheOlchObrKso.t4sD2SlOYM9LUjsUJzA5.rLSpdPGTEe'),
('Usuario Teste', 'teste@gmail.com', '$2b$10$KSyKNZmubGmXN2vdXStgnObw2u/n5jnyI5sANgUUApHlD.GPKniKW')
ON CONFLICT (login) DO NOTHING;


-- CLIENTES
INSERT INTO cliente (nome, cpf, telefone) VALUES
('Carlos Souza', 'enc:v1:hhjFMmUVWjpzSAD49IWIpjkdKF4LLnc64Szwbt4XYkBLAXOcSemj', 'enc:v1:VLgg/L6Y0iaOCgCN5k5ET9AwbCW8XxrekfLmAbpn8yTl5WChrtkQ'),
('Ana Pereira', 'enc:v1:dz91WucXfE27K5zMJQqjpDmoyXKrqP95OlFi52wfEnKiyiPTBFjk', 'enc:v1:A+7mZdi9f9tu5bvqhqYS0zgkNH6+ojAR8Ide3TGYAGw6vmSrmHfn'),
('Lucas Ferreira', 'enc:v1:VqewdDcRXctp5YkRtWTEz6VBptsnDpbozvf5Y2KMpNTDsjNaVQrV', 'enc:v1:/4WImA1jGJv7dELp8Rt2L/zB1Um0Izks0X217ziqCGmzk3jx/aiJ');


-- VEICULOS
INSERT INTO veiculo (placa, modelo, ano, id_cliente) VALUES
('ABC1D23', 'Honda Civic', 2020, 1),
('DEF4G56', 'Toyota Corolla', 2022, 2),
('GHI7J89', 'Volkswagen Gol', 2018, 3);


-- AGENDAMENTOS
INSERT INTO agendamento (data_agendamento, servico, id_veiculo) VALUES
('2026-10-20', 'Troca de óleo', 1),
('2026-10-21', 'Alinhamento e balanceamento', 2),
('2026-10-22', 'Revisão geral', 3);

