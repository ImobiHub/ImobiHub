🏠 Sistema Imobiliário – Plataforma de Venda e Anúncio de Imóveis
📌 1. Domínio do Problema

O mercado imobiliário envolve a intermediação de compra e venda de imóveis como casas, apartamentos e terrenos. Muitas imobiliárias de pequeno e médio porte utilizam redes sociais e planilhas para gerenciar anúncios, clientes interessados e propostas, o que dificulta o controle de negociações e o acompanhamento de vendas.

Este sistema tem como objetivo desenvolver uma plataforma web imobiliária, permitindo que corretores anunciem imóveis, clientes visualizem ofertas e registrem interesse, e administradores acompanhem negociações e relatórios.

👥 2. Perfis de Usuário

Administrador

Corretor

Cliente

🎯 3. Casos de Uso
🔹 Cliente

Criar conta

Realizar login

Visualizar imóveis disponíveis

Filtrar imóveis (preço, cidade, tipo, quartos)

Visualizar detalhes do imóvel

Favoritar imóvel

Enviar proposta

Solicitar agendamento de visita

🔹 Corretor

Realizar login

Cadastrar imóvel

Editar imóvel

Remover imóvel

Visualizar propostas recebidas

Alterar status do imóvel (Disponível, Reservado, Vendido)

Confirmar agendamento de visita

🔹 Administrador

Gerenciar usuários

Visualizar relatório de vendas

Visualizar métricas gerais (imóveis ativos, vendidos, propostas)

✅ 4. Requisitos Funcionais (RF)

RF01 – O sistema deve permitir cadastro de usuários.

RF02 – O sistema deve permitir autenticação de usuários.

RF03 – O corretor deve poder cadastrar imóveis.

RF04 – O sistema deve permitir upload de imagens do imóvel.

RF05 – O cliente deve poder visualizar imóveis disponíveis.

RF06 – O sistema deve permitir filtro de busca por critérios.

RF07 – O cliente deve poder enviar proposta para um imóvel.

RF08 – O sistema deve permitir agendamento de visitas.

RF09 – O corretor deve poder alterar o status do imóvel.

RF10 – O administrador deve visualizar relatórios de vendas.

🔒 5. Requisitos Não Funcionais (RNF)

RNF01 – O backend deve ser desenvolvido em C# utilizando ASP.NET Core.

RNF02 – O frontend deve ser desenvolvido em React (SPA).

RNF03 – O banco de dados deve ser MySQL.

RNF04 – O sistema deve utilizar autenticação JWT.

RNF05 – As senhas devem ser armazenadas criptografadas.

RNF06 – O tempo de resposta das requisições deve ser inferior a 3 segundos.

RNF07 – A interface deve ser responsiva.

RNF08 – O sistema deve seguir o padrão REST para comunicação entre frontend e backend.

🛠 6. Tecnologias Utilizadas
🔹 Backend

C#

ASP.NET Core Web API

Entity Framework Core

JWT (Json Web Token)

Justificativa:

ASP.NET Core oferece alta performance, segurança e excelente suporte para construção de APIs RESTful. O Entity Framework facilita o mapeamento objeto-relacional com MySQL.

🔹 Frontend

React

Axios (consumo da API)

React Router

Biblioteca de gráficos (ex: Chart.js ou Recharts)

Justificativa:

React permite construção de interface moderna, componentizada e dinâmica, ideal para aplicações SPA.

🔹 Banco de Dados

MySQL

Justificativa:

Banco relacional robusto, adequado para modelagem com múltiplos relacionamentos (Usuário, Imóvel, Proposta, Visita, Venda).

🗄 7. Principais Entidades do Sistema

Usuário

Imóvel

TipoImovel

Cidade

Imagem

Proposta

Visita

Venda

📊 8. Possíveis Melhorias Futuras

Implementação de pagamento de sinal online

Chat em tempo real entre cliente e corretor

Sistema de avaliação de corretores

Integração com API de mapas (Google Maps)

Envio de notificações por e-mail

Filtros avançados (metragem, vaga de garagem, condomínio)

Dashboard com gráficos mais avançados

Deploy em nuvem (Azure ou AWS)

Sistema de assinatura para corretores

📌 9. Estrutura Geral do Projeto
Backend

Controllers

Services

Repositories

Models

DTOs

Authentication

Migrations

Frontend

Pages

Components

Services (API)

Context (Auth)

Routes

🎓 10. Objetivo Acadêmico

Este projeto visa aplicar conceitos de:

Arquitetura em camadas

API REST

Autenticação e autorização

Modelagem relacional

Integração frontend/backend

Boas práticas de desenvolvimento

Se você quiser, posso agora:

Criar o diagrama de classes

Criar o modelo entidade-relacionamento

Criar backlog organizado para dupla

Criar divisão de tarefas detalhada

Montar roteiro de apresentação

Qual você quer fazer agora? 🚀
