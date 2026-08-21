# 2 Irmãos Carne Assada

Cardápio digital responsivo para a 2 Irmãos Carne Assada, em Toledo-PR. O cliente pesquisa produtos, filtra categorias, monta o pedido e envia o resumo para a loja pelo WhatsApp.

## Funcionalidades

- catálogo com busca e filtros por categoria;
- carrinho persistido no navegador;
- alteração de quantidades e cálculo do subtotal;
- seleção entre retirada e entrega;
- envio do pedido formatado para o WhatsApp;
- carrossel de destaques com navegação por toque;
- menu adaptado para celular, tablet e computador;
- navegação por teclado, foco controlado e suporte a movimento reduzido;
- metadados sociais, dados estruturados, sitemap e robots.txt.

## Tecnologias

HTML5 semântico, CSS3 e JavaScript puro. O projeto não depende de framework, biblioteca externa, banco de dados ou etapa de compilação.

## Estrutura

```text
.
├── assets/
│   ├── css/          # Estilos gerais, catálogo e carrinho
│   ├── images/       # Imagens usadas pela interface e pelos produtos
│   ├── js/           # Configuração dos produtos e comportamento do site
│   └── icons.svg     # Ícones vetoriais locais
├── index.html        # Página principal
├── netlify.toml      # Configuração de publicação e segurança
├── robots.txt        # Regras para buscadores
└── sitemap.xml       # Mapa do site
```

## Atualizar produtos

Edite `assets/js/products.js`. Cada produto contém:

- `id`: identificador único e estável;
- `name`: nome exibido no cardápio;
- `price`: preço numérico usando ponto para centavos;
- `unit`: unidade de venda;
- `category`: categoria usada nos filtros;
- `image`: caminho da imagem;
- `description`: descrição curta.

As imagens devem ser salvas em `assets/images`. Evite alterar o `id` de produtos já publicados, pois ele é usado para recuperar o carrinho salvo no navegador.

## Executar localmente

Na pasta do projeto, inicie um servidor estático:

```bash
python -m http.server 8080
```

Depois abra `http://localhost:8080`.

## Publicar no Netlify

Conecte este repositório ao Netlify. O projeto não utiliza comando de build e a pasta de publicação é a raiz (`.`). Todo push na branch de produção gera uma nova publicação automaticamente.
