-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14/04/2026 às 23:35
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `imobihub`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `corretores`
--

CREATE TABLE `corretores` (
  `id_corretor` int(11) NOT NULL,
  `nome_corretor` varchar(45) NOT NULL,
  `email_corretor` varchar(45) NOT NULL,
  `senha_corretor` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `corretores`
--

INSERT INTO `corretores` (`id_corretor`, `nome_corretor`, `email_corretor`, `senha_corretor`) VALUES
(1, 'Otavio Santana', 'otavio@email.com', '123'),
(2, 'Carlos Silva', 'carlos.silva@email.com', '123456'),
(3, 'Mariana Souza', 'mariana.souza@email.com', '123456'),
(4, 'João Pereira', 'joao.pereira@email.com', '123456'),
(5, 'Fernanda Costa', 'fernanda.costa@email.com', '123456'),
(6, 'Lucas Oliveira', 'lucas.oliveira@email.com', '123456'),
(7, 'Patrícia Santos', 'patricia.santos@email.com', '123456'),
(8, 'Rafael Almeida', 'rafael.almeida@email.com', '123456'),
(9, 'Juliana Rocha', 'juliana.rocha@email.com', '123456'),
(10, 'Bruno Martins', 'bruno.martins@email.com', '123456'),
(11, 'Aline Ferreira', 'aline.ferreira@email.com', '123456');

-- --------------------------------------------------------

--
-- Estrutura para tabela `imoveis`
--

CREATE TABLE `imoveis` (
  `id_imovel` int(11) NOT NULL,
  `fk_corretor` int(11) NOT NULL,
  `descricao_imovel` varchar(50) NOT NULL,
  `localizacao_imovel` varchar(50) NOT NULL,
  `valor_imovel` double DEFAULT NULL,
  `img_imovel` mediumblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `imoveis`
--

INSERT INTO `imoveis` (`id_imovel`, `fk_corretor`, `descricao_imovel`, `localizacao_imovel`, `valor_imovel`, `img_imovel`) VALUES
(2, 1, 'Casa com 3 quartos no Floresta', 'Rua Porto Rico, Floresta - Joinville', 500000, NULL),
(3, 1, 'Apartamento 2 quartos com sacada', 'Joinville - SC', 350000, 0x696d67312e6a7067),
(4, 2, 'Casa com 3 quartos e garagem', 'Florianópolis - SC', 550000, 0x696d67322e6a7067),
(5, 3, 'Apartamento no centro, 1 quarto', 'Curitiba - PR', 280000, 0x696d67332e6a7067),
(6, 4, 'Cobertura duplex com vista para o mar', 'Balneário Camboriú - SC', 1200000, 0x696d67342e6a7067),
(7, 5, 'Casa geminada em bairro tranquilo', 'Joinville - SC', 300000, 0x696d67352e6a7067),
(8, 6, 'Apartamento 3 quartos mobiliado', 'Blumenau - SC', 480000, 0x696d67362e6a7067),
(9, 7, 'Terreno amplo para construção', 'São José - SC', 200000, 0x696d67372e6a7067),
(10, 8, 'Casa de luxo com piscina', 'Itapema - SC', 1500000, 0x696d67382e6a7067),
(11, 9, 'Kitnet para investimento', 'Joinville - SC', 180000, 0x696d67392e6a7067),
(12, 10, 'Apartamento novo 2 quartos', 'Jaraguá do Sul - SC', 320000, 0x696d6731302e6a7067);

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id_usuario` int(11) NOT NULL,
  `nome_usuario` varchar(50) DEFAULT NULL,
  `email_usuario` varchar(70) DEFAULT NULL,
  `senha_usuario` varchar(70) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `corretores`
--
ALTER TABLE `corretores`
  ADD PRIMARY KEY (`id_corretor`);

--
-- Índices de tabela `imoveis`
--
ALTER TABLE `imoveis`
  ADD PRIMARY KEY (`id_imovel`),
  ADD KEY `fk_corretor` (`fk_corretor`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `corretores`
--
ALTER TABLE `corretores`
  MODIFY `id_corretor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `imoveis`
--
ALTER TABLE `imoveis`
  MODIFY `id_imovel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `imoveis`
--
ALTER TABLE `imoveis`
  ADD CONSTRAINT `fk_corretor` FOREIGN KEY (`fk_corretor`) REFERENCES `corretores` (`id_corretor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
