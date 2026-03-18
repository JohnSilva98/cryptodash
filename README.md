# CryptoDash

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Recharts-2.15-FF6384?style=for-the-badge" alt="Recharts" />
</p>

<p align="center">
  <strong>Dashboard de Criptomoedas em Tempo Real</strong>
</p>

<p align="center">
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-instalação">Instalação</a> •
  <a href="#-uso">Uso</a> •
  <a href="#-api">API</a>
</p>

---

## 🚀 Funcionalidades

- **📊 Dashboard em Tempo Real**: Acompanhamento de preços, volume e variações de criptomoedas
- **🔍 Busca Inteligente**: Pesquisa dinâmica de moedas com sugestões em tempo real
- **📈 Gráficos Interativos**: Visualização de tendências com gráficos de linha responsivos
- **🌙 Tema Claro/Escuro**: Alternância suave entre temas com persistência
- **📱 Design Responsivo**: Interface adaptável para desktop e mobile
- **⚡ Performance Otimizada**: Requisições otimizadas com debounce e cache
- **🎯 Detalhes Completos**: Informações detalhadas de cada criptomoeda selecionada

## 🛠 Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| [Next.js](https://nextjs.org/) | 15 | Framework React com SSR/SSG |
| [React](https://react.dev/) | 19 | Biblioteca UI declarativa |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Superset JavaScript tipado |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Framework CSS utility-first |
| [Recharts](https://recharts.org/) | 2.15 | Biblioteca de gráficos React |
| [Lucide React](https://lucide.dev/) | Latest | Ícones modernos e consistentes |
| [CoinGecko API](https://www.coingecko.com/en/api) | v3 | API de dados de criptomoedas |

## 📦 Instalação

### Pré-requisitos

- Node.js 18.x ou superior
- npm, yarn ou pnpm

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/cryptodash.git
cd cryptodash
```

2. **Instale as dependências**

```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

4. **Acesse a aplicação**

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🎯 Uso

### Navegação Principal

| Componente | Descrição |
|------------|-----------|
| **Top Cryptos** | Cards das 4 principais criptomoedas com preço e variação 24h |
| **Market Overview** | Gráfico de capitalização de mercado global com estatísticas |
| **Cryptocurrency Prices** | Tabela completa com preços, variações e market cap |
| **Coin Details** | Painel lateral com detalhes da moeda selecionada |

### Busca de Moedas

1. Digite o nome ou símbolo da moeda no campo de busca
2. Aguarde as sugestões aparecerem automaticamente
3. Clique na moeda desejada para visualizar seus detalhes

### Alternância de Tema

- Clique no ícone 🌞/🌙 no header para alternar entre tema claro e escuro

## 🔌 API

A aplicação utiliza a [CoinGecko API](https://www.coingecko.com/en/api) gratuita para obter dados em tempo real.

### Endpoints Utilizados

| Endpoint | Descrição |
|----------|-----------|
| `/coins/markets` | Lista de moedas com dados de mercado |
| `/coins/{id}/market_chart` | Dados históricos de preço para gráficos |
| `/search` | Busca de moedas por nome/símbolo |
| `/global` | Estatísticas globais do mercado cripto |

## 🏗 Estrutura do Projeto

```
cryptodash/
├── app/
│   ├── components/          # Componentes React
│   │   ├── Header.tsx       # Header com busca e tema
│   │   ├── TopCryptos.tsx   # Cards de top criptos
│   │   ├── MarketCap.tsx    # Gráfico de market cap
│   │   ├── CryptosPrice.tsx # Tabela de preços
│   │   └── CoinChart.tsx    # Detalhes da moeda
│   ├── services/
│   │   └── api.ts           # Funções de API
│   ├── utils/
│   │   └── formatCurrency.ts # Utilitários de formatação
│   ├── globals.css          # Estilos globais e temas
│   ├── page.tsx             # Página principal
│   └── layout.tsx           # Layout root
├── public/                  # Assets estáticos
├── next.config.js           # Configuração Next.js
├── tailwind.config.js       # Configuração Tailwind
├── tsconfig.json            # Configuração TypeScript
└── package.json             # Dependências
```

## 📝 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build para produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa linter ESLint |

## 📄 Licença

Este projeto está sob a licença MIT.

---

<p align="center">
  Feito com ❤️ para a comunidade cripto
</p>
