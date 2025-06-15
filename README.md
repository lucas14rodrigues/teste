# Ana Gaming - Plataforma de Apostas Esportivas

Uma plataforma moderna e intuitiva para acompanhar apostas esportivas em tempo real, desenvolvida com Next.js, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

- **Odds em Tempo Real**: Acompanhe as melhores odds de múltiplas casas de apostas
- **Esportes Favoritos**: Sistema de favoritos com drag-and-drop para organização
- **Autenticação GitHub**: Login seguro via NextAuth.js
- **Interface Responsiva**: Design otimizado para desktop e mobile
- **Busca Inteligente**: Encontre rapidamente esportes e ligas
- **Comparação de Odds**: Compare preços entre diferentes bookmakers
- **Dados Atualizados**: Integração com The Odds API para informações precisas

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Autenticação**: NextAuth.js
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **Utilitários**: Lodash, date-fns
- **API**: The Odds API

## 📋 Pré-requisitos

- Node.js
- npm ou yarn
- Conta no GitHub (para autenticação)
- API Key do The Odds API

## 🔧 Instalação

2. **Instale as dependências**
\`\`\`bash
npm install
# ou
yarn install
\`\`\`

4. **Execute o projeto**
\`\`\`bash
npm run dev
# ou
yarn dev
\`\`\`

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🎯 Configuração da API de Odds

1. Registre-se em [The Odds API](https://the-odds-api.com/)
2. Obtenha sua API Key gratuita
3. Adicione a chave no arquivo `.env.local`

## 🎨 Componentes Principais

### Odds em Destaque
- Exibe odds de múltiplos esportes
- Atualização automática
- Comparação de melhores preços

### Sistema de Favoritos
- Adicionar/remover esportes favoritos
- Reorganização por drag-and-drop
- Persistência no localStorage

### Sidebar de Esportes
- Navegação por categorias
- Busca em tempo real
- Indicadores de atividade

## 🔄 API Routes

- `GET /api/sports` - Lista todos os esportes disponíveis
- `GET /api/odds?sport={sport_key}` - Odds de um esporte específico
- `POST /api/auth/[...nextauth]` - Autenticação NextAuth

## 🎯 Esportes Suportados

- ⚽ Futebol (Premier League, Brasileirão, Champions League)
- 🏀 Basquete (NBA)
- 🏈 Futebol Americano (NFL)
- 🏒 Hockey no Gelo
- ⚾ Baseball

## 👥 Equipe

- **Desenvolvimento**: Lucas Mattos Rodrigues
- **Design**: Interface moderna e intuitiva
- **API**: Integração com The Odds API

## 📞 Suporte

- **Email**: lucasmatt014@gmail.com
- **Telefone**: +55 31 9 9772-1408
