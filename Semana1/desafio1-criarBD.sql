
-- Criar um banco de dados para um sistema de empréstimos de livros com  
-- as tabelas usuário, livro e empréstimo. Montar as tabelas com chaves 
-- estrangeiras onde for preciso.
-- usuario ↔ Emprestimo ↔ Livro
CREATE DATABASE livraria;

USE livraria; 

CREATE	TABLE cliente (
	id_cliente INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(100) NOT NULL, 
    telefone VARCHAR(20) NOT NULL
);

CREATE TABLE livro (
    id_livro INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	titulo VARCHAR(1000) NOT NULL
); 

CREATE TABLE emprestimo (
	id_emprestimo INT PRIMARY KEY AUTO_INCREMENT, 
    id_cliente INT NOT NULL, 
    id_livro INT NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE, 
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_livro) REFERENCES livro(id_livro)
);

SELECT * 
FROM emprestimo;

INSERT INTO cliente (id_cliente, nome, telefone)
VALUES 
	(1, 'Wanessa de Souza', '24999093316'),
	(2, 'Raul Rodrigues', '24992731539'),
    (3, 'Maria Eduarda Bonan', '22999086514'),
    (4, 'Gabriel Saar', '21999873456'),
    (5, 'David Rabelo Gabri', '24998765567');

SELECT *
FROM cliente;

INSERT INTO livro (id_livro, titulo)
VALUES 
	(1, 'Python para Análise de Dados'), 
    (2, 'Introdução à Linguagem SQL'),
    (3, 'Física e Eletromagnetismo'),
    (4, 'Cálculo e Equações Diferenciais');

SELECT *
FROM livro;

INSERT INTO emprestimo (id_emprestimo, id_cliente, id_livro, data_emprestimo, data_devolucao)
VALUES 
	(1, 1, 1, '2026-03-01', NULL),
    (2, 2, 2, '2025-11-26', '2026-01-01'),
    (3, 3, 4, '2024-03-21', '2024-05-12');

SELECT *
FROM emprestimo;

UPDATE emprestimo 
SET data_devolucao = '2026-03-04'
WHERE id_emprestimo = 1;

SELECT *
FROM emprestimo;




    



