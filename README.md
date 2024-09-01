# advogados

Cadastro de Advogados

## Tecnologias Utilizadas

- Api em .NET 6 (Backend)
- React (Frontend)
- Banco de Dados MySQL.

## Configuração para montar o ambiente

Será necessário criar o banco de dados e as tabelas, para poder rodar a API (dotnet run) e o FRONTEND (npm start).

```bash
- Criação do Banco de Dados:

  CREATE DATABASE `DbAdvogados` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

- Criação das Tabelas:

CREATE TABLE Enderecos (
    Id CHAR(36) NOT NULL PRIMARY KEY,
    Logradouro VARCHAR(255) NOT NULL,
    Bairro VARCHAR(255) NOT NULL,
    Estado VARCHAR(255) NOT NULL,
    CEP VARCHAR(20) NOT NULL,
    Numero VARCHAR(20) NOT NULL,
    Complemento VARCHAR(255),
    Ativo BOOLEAN NOT NULL DEFAULT TRUE,
    DataCriacao DATETIME NOT NULL

);

CREATE TABLE Advogados (
    Id CHAR(36) NOT NULL PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    DataDeNascimento DATE NOT NULL,
    Email VARCHAR(255) NOT NULL,
    EnderecoId CHAR(36) NOT NULL,
    Senioridade ENUM('Junior', 'Pleno', 'Senior') NOT NULL,
    Ativo BOOLEAN NOT NULL DEFAULT TRUE,
    DataCriacao DATETIME NOT NULL,
    FOREIGN KEY (EnderecoId) REFERENCES Enderecos(Id)
);

```
