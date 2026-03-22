create database mercadinho;

use mercadinho;

create table cliente (
    codcliente int primary key auto_increment,
    nome varchar(100) not null,
    telefone varchar(15) not null,
    rua varchar(100) not null,
    bairro varchar(50) not null,
    nrocasa int not null
);

create table funcionario (
    codfunc int primary key auto_increment,
    nome varchar(100) not null,
    cargo varchar(45) not null,
    telefone varchar(15) not null,
    salario decimal(10,2) not null
);

create table categoria (
    codigo int primary key auto_increment,
    nome varchar(45) not null
);

create table produto (
    codproduto int primary key auto_increment,
    nome varchar(60) not null,
    preco decimal(10,2) not null,
    codigo int,
    foreign key (codigo) references categoria(codigo)
);

create table pedido (
    codpedido int primary key auto_increment,
    data date not null,
    valortotal decimal(10,2) not null,
    codcliente int,
    codfunc int,
    foreign key (codcliente) references cliente(codcliente),
    foreign key (codfunc) references funcionario(codfunc)
);

create table itempedido (
    coditem int primary key auto_increment,
    quantidade int not null,
    codpedido int,
    codproduto int,
    foreign key (codpedido) references pedido(codpedido),
    foreign key (codproduto) references produto(codproduto)
);

create table pagamento (
    codpagamento int primary key auto_increment,
    tipo varchar(45) not null,
    valor decimal(10,2) not null,
    codpedido int,
    foreign key (codpedido) references pedido(codpedido)
);

-- Inserindo Clientes
insert into cliente (nome, telefone, rua, bairro, nrocasa) values
('ana silva','779999999','rua das flores','centro',10),
('carlos souza','778888888','rua bela vista','primavera',20),
('marcos lima','779777777','rua c','morumbi',15),
('juliana santos','779666666','avenida brasil','clodoaldo',40),
('paulo rocha','779555555','rua e','nova itapetinga',22);

-- Inserindo Funcionários do Mercadinho
insert into funcionario (nome, cargo, telefone, salario) values
('joao pereira','caixa','779111111',1500),
('maria costa','repositor(a)','779222222',1400),
('pedro alves','gerente','779333333',3500),
('carla souza','caixa','779444444',1500),
('lucas mendes','estoquista','779555555',1600);

-- Inserindo Categorias de Mercado
insert into categoria (nome) values
('hortifruti'),
('padaria'),
('laticínios'),
('limpeza'),
('bebidas');

-- Inserindo Produtos do Mercadinho (com base nos produtos do seu React)
insert into produto (nome, preco, codigo) values
('tomate', 6.99, 1),
('pão francês', 12.99, 2),
('leite integral', 5.49, 3),
('detergente', 3.49, 4),
('refrigerante', 6.99, 5);

-- Inserindo Pedidos (Valores recalculados de acordo com os itens abaixo)
insert into pedido (data, valortotal, codcliente, codfunc) values
('2026-03-10', 19.47, 1, 1), -- 2 tomates + 1 leite
('2026-03-11', 6.99, 2, 2),  -- 1 tomate
('2026-03-12', 6.99, 3, 1),  -- 1 refrigerante
('2026-03-13', 25.98, 4, 3), -- 2 pães franceses
('2026-03-14', 8.98, 5, 4);  -- 1 detergente + 1 leite

-- Inserindo os Itens dos Pedidos
insert into itempedido (quantidade, codpedido, codproduto) values
(2, 1, 1), -- Pedido 1: 2x Tomate (13.98)
(1, 1, 3), -- Pedido 1: 1x Leite Integral (5.49)
(1, 2, 1), -- Pedido 2: 1x Tomate (6.99)
(1, 3, 5), -- Pedido 3: 1x Refrigerante (6.99)
(2, 4, 2), -- Pedido 4: 2x Pão Francês (25.98)
(1, 5, 4), -- Pedido 5: 1x Detergente (3.49)
(1, 5, 3); -- Pedido 5: 1x Leite Integral (5.49)

-- Inserindo Pagamentos
insert into pagamento (tipo, valor, codpedido) values
('pix', 19.47, 1),
('cartao', 6.99, 2),
('dinheiro', 6.99, 3),
('pix', 25.98, 4),
('cartao', 8.98, 5);


-- --------------------------------------------------------
-- Consultas de Teste (Selects)
-- --------------------------------------------------------

-- 1. Mostrar todos os clientes
select * from cliente;

-- 2. Mostrar todos os produtos ordenados do mais caro pro mais barato
select * from produto
order by preco desc;

-- 3. Mostrar os pedidos e quem foi o cliente
select pedido.codpedido, cliente.nome as cliente, pedido.valortotal
from pedido
join cliente on pedido.codcliente = cliente.codcliente;

-- 4. Mostrar os pedidos e qual funcionário (caixa) atendeu
select pedido.codpedido, funcionario.nome as funcionario
from pedido
join funcionario on pedido.codfunc = funcionario.codfunc;

-- 5. Mostrar a categoria de cada produto
select produto.nome as produto, categoria.nome as categoria
from produto
join categoria on produto.codigo = categoria.codigo;

-- 6. Mostrar os detalhes dos itens dentro de cada pedido
select pedido.codpedido, produto.nome, itempedido.quantidade
from itempedido
join produto on itempedido.codproduto = produto.codproduto
join pedido on itempedido.codpedido = pedido.codpedido;

-- 7. Mostrar a forma de pagamento de cada pedido
select pedido.codpedido, pagamento.tipo, pagamento.valor
from pagamento
join pedido on pagamento.codpedido = pedido.codpedido;

-- 8. Procurar um cliente que tenha 'ana' no nome
select * from cliente
where nome like '%ana%';

-- 9. Mostrar produtos que custam mais que 10 reais
select * from produto
where preco > 10;

-- 10. Contar quantos pedidos cada cliente fez
select cliente.nome, count(pedido.codpedido) as total_pedidos
from cliente
join pedido on cliente.codcliente = pedido.codcliente
group by cliente.nome;
