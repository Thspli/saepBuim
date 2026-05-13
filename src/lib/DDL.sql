-- =============================================
-- Banco de Dados: Sistema de Gestão de Estoque
-- Projeto: saep / saepBuim
-- =============================================

CREATE DATABASE IF NOT EXISTS saep_estoque
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE saep_estoque;

-- ----------------------------
-- Tabela: usuarios
-- ----------------------------
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------
-- Tabela: produtos
-- ----------------------------
CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  quantidade INT NOT NULL DEFAULT 0,
  estoque_min INT NOT NULL DEFAULT 5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------
-- Tabela: movimentacao
-- ----------------------------
CREATE TABLE IF NOT EXISTS movimentacao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('Entrada', 'Saída') NOT NULL,
  quantidade INT NOT NULL,
  data DATE NOT NULL,
  produtos_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (produtos_id) REFERENCES produtos(id) ON DELETE CASCADE
);

-- ----------------------------
-- Dados iniciais: usuário admin
-- ----------------------------
INSERT INTO usuarios (nome, email, senha) VALUES
  ('Administrador', 'admin@saep.com', '123456');

-- ----------------------------
-- Dados iniciais: produtos de exemplo
-- ----------------------------
INSERT INTO produtos (nome, descricao, preco, quantidade, estoque_min) VALUES
  ('Caneta Azul',     'Caneta esferográfica azul',         2.50,  50, 10),
  ('Papel A4',        'Resma com 500 folhas',              25.90, 30,  5),
  ('Grampeador',      'Grampeador médio 26/6',             18.00,  8,  3),
  ('Pasta Arquivo',   'Pasta AZ lombo largo',               9.90, 15,  5),
  ('Régua 30cm',      'Régua plástica transparente 30cm',   3.50,  4, 10);

-- ----------------------------
-- Dados iniciais: movimentações de exemplo
-- ----------------------------
INSERT INTO movimentacao (tipo, quantidade, data, produtos_id) VALUES
  ('Entrada', 50, '2025-05-01', 1),
  ('Entrada', 30, '2025-05-02', 2),
  ('Saída',   10, '2025-05-05', 1),
  ('Entrada',  8, '2025-05-06', 3),
  ('Saída',    5, '2025-05-10', 2);