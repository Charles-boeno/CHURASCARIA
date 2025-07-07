# 🍖 Churrascaria 2 Irmãos - Sistema Completo

Sistema web completo para a Churrascaria 2 Irmãos, localizada em Toledo-PR. O projeto inclui uma página principal, uma loja virtual e um painel administrativo para gerenciamento de produtos.

## 📋 Índice

- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Páginas](#páginas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Usar](#como-usar)
- [Funcionalidades do Admin](#funcionalidades-do-admin)
- [Responsividade](#responsividade)

## ✨ Funcionalidades

### 🏠 Página Principal (`index.html`)
- **Design responsivo** com menu hambúrguer para mobile
- **Seção hero** com chamada para ação
- **Cardápio completo** organizado por categorias
- **Integração com WhatsApp** para pedidos diretos
- **Mapa do Google Maps** com localização
- **Links para redes sociais**

### 🛒 Página da Loja (`loja.html`)
- **Catálogo de produtos** com filtros por categoria
- **Cards de produtos** com imagens e descrições
- **Sistema de filtros** (Todos, Carnes, Frango, Porco, Acompanhamentos)
- **Botões de pedido** direto para WhatsApp
- **Layout responsivo** e moderno

### ⚙️ Painel Administrativo (`admin.html`)
- **Sistema de login** com autenticação segura
- **CRUD completo** de produtos (Criar, Ler, Atualizar, Deletar)
- **Tabela de produtos** com todas as informações
- **Sistema de busca** por nome ou descrição
- **Filtros por categoria**
- **Modais para adicionar/editar** produtos
- **Confirmação de exclusão**
- **Notificações** de sucesso
- **Sessão persistente** (24 horas)
- **Logout seguro**

### 🌐 Painel Administrativo Online (`admin-firebase.html`)
- **Sistema online** com Firebase
- **Banco de dados em tempo real**
- **Sincronização automática** entre dispositivos
- **Backup automático** no servidor
- **Acesso de qualquer lugar** com internet
- **Mesmas funcionalidades** do admin local
- **Dados persistentes** e seguros

## 📁 Estrutura do Projeto

```
2irmaos-carne-assada/
├── index.html              # Página principal
├── loja.html               # Página da loja
├── admin.html              # Painel administrativo (local)
├── admin-firebase.html     # Painel administrativo (online)
├── style.css               # Estilos principais
├── loja.css                # Estilos da loja
├── admin.css               # Estilos do admin
├── script.js               # JavaScript principal (menu mobile)
├── loja.js                 # JavaScript da loja
├── admin.js                # JavaScript do admin (local)
├── admin-firebase.js       # JavaScript do admin (online)
├── README.md               # Documentação
├── GUIA-ONLINE.md          # Guia para sistema online
└── img/                    # Pasta de imagens
    ├── logo-novo.png
    ├── banerr.png
    ├── t-bone.jpeg
    ├── frango1.png
    ├── costela1.png
    ├── leitao1.png
    ├── linguiça.jpg
    ├── sopa1.png
    ├── abacaxi.jpg
    ├── whatssapp.svg
    └── ... (outras imagens)
```

## 🌐 Páginas

### 1. **Página Principal** (`index.html`)
- **URL**: `/index.html` ou `/`
- **Função**: Apresentação da churrascaria
- **Seções**:
  - Header com navegação
  - Hero section com botões de ação
  - Cardápio organizado
  - Mapa de localização
  - Contatos e footer

### 2. **Página da Loja** (`loja.html`)
- **URL**: `/loja.html`
- **Função**: Catálogo de produtos
- **Funcionalidades**:
  - Filtros por categoria
  - Cards de produtos
  - Botões de pedido direto
  - Layout responsivo

### 3. **Painel Administrativo** (`admin.html`)
- **URL**: `/admin.html`
- **Função**: Gerenciamento de produtos
- **Funcionalidades**:
  - Tabela de produtos
  - Adicionar/editar/excluir produtos
  - Busca e filtros
  - Modais interativos

### 4. **Painel Administrativo Online** (`admin-firebase.html`)
- **URL**: `/admin-firebase.html`
- **Função**: Gerenciamento de produtos online
- **Funcionalidades**:
  - Todas as funcionalidades do admin local
  - Banco de dados em tempo real (Firebase)
  - Sincronização automática
  - Acesso de qualquer lugar
  - Backup automático no servidor

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização e responsividade
- **JavaScript (ES6+)** - Funcionalidades interativas
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Roboto + Indie Flower)
- **Google Maps** - Localização
- **Firebase** - Banco de dados em tempo real (sistema online)

## 🚀 Como Usar

### Para Clientes:
1. Acesse `index.html` para ver o cardápio
2. Navegue para `loja.html` para ver produtos detalhados
3. Use os botões "Pedir Agora" para fazer pedidos via WhatsApp

### Para Administradores:
1. Acesse `admin.html`
2. **Faça login** com as credenciais:
   - **Usuário**: `2irmaos`
   - **Senha**: `val2025`
3. Use os botões "Adicionar Produto" para criar novos itens
4. Clique em "Editar" para modificar produtos existentes
5. Use "Excluir" para remover produtos
6. Utilize a busca e filtros para encontrar produtos
7. Clique em "Sair" para fazer logout

### Para Administradores (Sistema Online):
1. **Configure o Firebase** seguindo o `GUIA-ONLINE.md`
2. **Faça deploy** do site (GitHub Pages, Netlify, Vercel)
3. Acesse `admin-firebase.html` no seu site online
4. **Faça login** com as mesmas credenciais
5. **Todas as mudanças** são salvas automaticamente no servidor
6. **Acesse de qualquer lugar** com internet

### 🧪 Para Testar o Sistema:
1. Acesse `teste-admin.html` para verificar todas as funcionalidades
2. Use os botões de teste para:
   - **Testar Login/Logout**
   - **Adicionar/Editar/Excluir produtos**
   - **Exportar/Importar dados**
   - **Verificar responsividade**
3. Monitore o status do sistema em tempo real
4. Verifique a sincronização entre páginas

### 📊 Funcionalidades Avançadas:
- **Exportar Produtos**: Download de backup em JSON
- **Importar Produtos**: Carregar dados de arquivo JSON
- **Resetar Produtos**: Voltar aos valores padrão
- **Sincronização Automática**: Mudanças refletidas em todas as páginas
- **Persistência de Dados**: Dados salvos no navegador

## ⚙️ Funcionalidades do Admin

### 🔐 Sistema de Segurança
- **Autenticação obrigatória** para acessar o painel
- **Sessão persistente** por 24 horas
- **Logout automático** após expiração
- **Proteção de rotas** para todas as ações administrativas
- **Notificações de erro** para tentativas de acesso não autorizado

### 📊 Gerenciamento de Produtos
- **Adicionar Produto**: Modal com formulário completo
- **Editar Produto**: Preenchimento automático dos dados
- **Excluir Produto**: Confirmação antes da exclusão
- **Visualizar Produtos**: Tabela organizada com todas as informações
- **Acesso restrito**: Apenas usuários autenticados

### 🔍 Sistema de Busca e Filtros
- **Busca por texto**: Nome ou descrição do produto
- **Filtro por categoria**: Carnes, Frango, Porco, Acompanhamentos
- **Busca em tempo real**: Resultados instantâneos

### 💾 Persistência de Dados
- **LocalStorage**: Dados salvos automaticamente no navegador
- **Sincronização**: Mudanças refletidas em todas as páginas
- **Backup automático**: Dados preservados entre sessões
- **Exportação**: Download dos produtos em formato JSON
- **Importação**: Carregamento de produtos de arquivo JSON
- **Reset**: Voltar aos valores padrão quando necessário

### 📱 Interface Responsiva
- **Desktop**: Layout completo com tabela
- **Tablet**: Layout adaptado
- **Mobile**: Interface otimizada para touch

### 🧪 Sistema de Testes
- **Página de teste**: `teste-admin.html` para verificar funcionalidades
- **Testes automatizados**: Login, produtos, armazenamento
- **Verificação de responsividade**: Detecção automática de dispositivo
- **Status em tempo real**: Monitoramento do sistema

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:

- **Desktop**: > 1200px
- **Tablet**: 768px - 1200px
- **Mobile**: < 768px
- **Mobile Pequeno**: < 480px

### Características Responsivas:
- Menu hambúrguer em mobile
- Cards adaptáveis
- Tabelas com scroll horizontal
- Modais otimizados
- Botões touch-friendly

## 🎨 Design System

### Cores:
- **Primária**: #f31212 (Vermelho)
- **Secundária**: #333333 (Cinza escuro)
- **Background**: #f5f5f5 (Cinza claro)
- **Texto**: #333333 (Cinza escuro)

### Tipografia:
- **Títulos**: Indie Flower (cursiva)
- **Corpo**: Roboto (sans-serif)

### Componentes:
- Botões com hover effects
- Cards com sombras
- Modais com backdrop
- Notificações toast

## 📞 Integração WhatsApp

Todas as páginas incluem integração direta com WhatsApp:
- Botões de pedido com mensagem pré-formatada
- Botão flutuante fixo
- Links diretos para contato

## 🔧 Personalização

### Para alterar dados da empresa:
1. Edite as informações no `index.html`
2. Atualize o número do WhatsApp nos arquivos JS
3. Modifique as redes sociais no header

### Para alterar credenciais de login:
1. Edite o arquivo `admin.js`
2. Modifique as constantes `ADMIN_CREDENTIALS`
3. Altere o usuário e senha conforme necessário

### Para adicionar novos produtos:
1. Use o painel administrativo (após fazer login)
2. Ou edite diretamente o array `products` nos arquivos JS

## 📈 Próximas Melhorias

- [x] Sistema de login para admin
- [ ] Múltiplos usuários administrativos
- [ ] Níveis de permissão
- [ ] Persistência de dados (localStorage/backend)
- [ ] Galeria de fotos dos pratos
- [ ] Sistema de avaliações
- [ ] Histórico de pedidos
- [ ] Integração com sistema de pagamento

## 👨‍💻 Desenvolvedor

**Charles** - Desenvolvido em 2024

---

*Projeto desenvolvido para a Churrascaria 2 Irmãos - Toledo-PR* 