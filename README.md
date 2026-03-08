# 🍕 Projeto Pizza

> **Aviso:** Este projeto é uma ferramenta de impacto social criada para oferecer uma rota de fuga discreta e segura para mulheres em situação de vulnerabilidade.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

## 🎯 O que é o Pizza?

O **Pizza** é uma aplicação web construída para parecer um simples sistema de delivery de pizzas. No entanto, sua verdadeira função é atuar como um **canal de emergência oculto** para vítimas de violência doméstica.

Em um cenário onde o agressor monitora o celular da vítima, baixar um aplicativo de denúncia tradicional ou ligar para a polícia pode ser perigoso ou impossível. O Pizza resolve isso através do "Design de Camuflagem":

1. A usuária acessa o site (sem necessidade de instalação).
2. Cadastra previamente um número de WhatsApp de uma pessoa de confiança.
3. Em uma situação de perigo, clica no botão para pedir uma **"Pizza Especial"**.
4. O sistema captura a **geolocalização exata** em tempo real e envia um pedido de socorro silencioso via WhatsApp para o contato de segurança.

## ✨ Principais Funcionalidades

- **🕵️ Interface Discreta:** UI/UX desenhada para imitar perfeitamente um cardápio de restaurante. Nenhuma palavra sobre "denúncia" ou "polícia" fica visível.
- **📍 Geolocalização Nativa:** Captura instantânea das coordenadas do dispositivo (latitude e longitude) via browser API.
- **💬 Alerta via WhatsApp:** Integração direta com a API do WhatsApp Web/Mobile para envio rápido da mensagem de socorro.
- **🔒 Privacidade Extrema (Local First):** Zero dados armazenados em banco de dados ou nuvem. O contato de emergência fica salvo apenas no `localStorage` do dispositivo da vítima, sumindo se os dados de navegação forem limpos.

## 🛠️ Stack Tecnológica

- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS + shadcn/ui (para componentes acessíveis e responsivos)
- **Roteamento:** Wouter
- **Build Tool:** Vite
- **Ícones:** Lucide React

## 🚀 Como rodar o projeto localmente

Se você é desenvolvedor e quer contribuir ou testar a aplicação na sua máquina, siga os passos abaixo:

### Pré-requisitos

- Node.js (v18 ou superior)
- npm, yarn ou pnpm

### Instalação

1. Clone o repositório:

```bash
git clone [https://github.com/SEU_USUARIO/projeto-pizza.git](https://github.com/SEU_USUARIO/projeto-pizza.git)
```
