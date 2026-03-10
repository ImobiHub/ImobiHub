# 🏠 ImobiHub
Plataforma Web para Gestão e Anúncio de Imóveis
Link Jira: https://imobihub.atlassian.net/jira/software/projects/DEV/summary?atlOrigin=eyJpIjoiYzgzNGVkYzQ3NWQxNGFhN2EwOWRhZTMzMmNiMzlmMzAiLCJwIjoiaiJ9

---

## 📌 Sobre o Projeto

O **ImobiHub** é uma plataforma web desenvolvida para auxiliar imobiliárias e corretores na gestão de imóveis para venda, bem como permitir que clientes visualizem anúncios, enviem propostas e agendem visitas.

O sistema centraliza o gerenciamento de imóveis, clientes e negociações, substituindo controles manuais e planilhas por uma solução digital moderna.

---

## 🎯 Objetivo

Desenvolver uma aplicação web completa utilizando:

- Backend em **C# com ASP.NET Core**
- Frontend em **React**
- Banco de dados **MySQL**

Aplicando conceitos de:
- API REST
- Arquitetura em camadas
- Modelagem relacional
- Integração Frontend e Backend

---

## 👥 Perfis de Usuário

### 👤 Cliente
- Criar conta
- Realizar login
- Visualizar imóveis disponíveis
- Filtrar imóveis
- Visualizar detalhes do imóvel
- Favoritar imóvel
- Solicitar agendamento de visita

### 🏢 Corretor
- Realizar login
- Cadastrar imóvel
- Editar imóvel
- Remover imóvel
- Alterar status do imóvel (Disponível, Reservado, Vendido)
- Confirmar visitas

### 🔑 Administrador
- Gerenciar usuários
- Visualizar relatórios
- Acompanhar métricas gerais do sistema

---

## 📚 Casos de Uso

- UC01 – Cadastrar Usuário
- UC02 – Realizar Login
- UC03 – Cadastrar Imóvel
- UC04 – Editar Imóvel
- UC05 – Listar Imóveis
- UC06 – Filtrar Imóveis
- UC07 – Agendar Visita
- UC08 – Alterar Status do Imóvel
- UC09 – Visualizar Relatório

---

## ✅ Requisitos Funcionais (RF)

- RF01 – O sistema deve permitir cadastro de usuários.
- RF02 – O sistema deve permitir autenticação via login.
- RF03 – O corretor deve poder cadastrar imóveis.
- RF04 – O sistema deve permitir upload de imagens.
- RF05 – O cliente deve visualizar imóveis disponíveis.
- RF06 – O sistema deve permitir filtro por preço, cidade e tipo.
- RF07 – O sistema deve permitir agendamento de visitas.
- RF08 – O corretor deve poder alterar o status do imóvel.
- RF09 – O administrador deve visualizar relatórios.

---

## 🔒 Requisitos Não Funcionais (RNF)

- RNF01 – Backend desenvolvido em ASP.NET Core.
- RNF02 – Frontend desenvolvido em React (SPA).
- RNF03 – Banco de dados MySQL.
- RNF04 – Senhas armazenadas com criptografia.
- RNF05 – Tempo de resposta inferior a 3 segundos.
- RNF06 – Interface responsiva.
- RNF07 – Comunicação via API REST.

---

## 🛠 Tecnologias Utilizadas

### 🔹 Backend
- C#
- ASP.NET Core Web API
- Entity Framework Core

### 🔹 Frontend
- React
- React Router
- Biblioteca de gráficos 

### 🔹 Banco de Dados
- MySQL

---

## 🗄 Principais Entidades

- Usuário
- Imóvel
- TipoImovel
- Cidade
- Imagem
- Proposta
- Visita
- Venda

---

## 📊 Possíveis Melhorias Futuras

- Chat entre cliente e corretor
- Integração com API de mapas
- Notificações por e-mail
- Pagamento de sinal online
- Dashboard com gráficos avançados
- Deploy em nuvem (Azure ou AWS)
- Sistema de assinatura para corretores

---

## 📂 Estrutura do Projeto

### Backend
- Controllers
- Services
- Repositories
- Models
- DTOs
- Authentication
- Migrations

### Frontend
- Pages
- Components
- Services (API)
- Context (Auth)
- Routes

---

## 👨‍💻 Organização da Dupla

### Desenvolvedor 1 – Backend
- Modelagem do banco
- API REST
- Autenticação
- Regras de negócio

### Desenvolvedor 2 – Frontend
- Telas
- Componentes
- Integração com API
- Dashboard

---

## 🎓 Projeto Acadêmico

Sistema desenvolvido para fins acadêmicos com o objetivo de aplicar conceitos de desenvolvimento full stack utilizando tecnologias modernas.
