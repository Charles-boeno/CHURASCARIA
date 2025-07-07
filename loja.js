// Carregar produtos do Firestore em tempo real
function loadProducts() {
    db.collection("produtos").onSnapshot(snapshot => {
        products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        renderProducts(products);
        // Atualizar filtro ao carregar produtos
        setupFilterButtons();
    });
}

// Obter produtos padrão
function getDefaultProducts() {
    return [
        // Carnes Parrilha
        {
            id: 1,
            name: "Contra Filé",
            price: 70.00,
            category: "carnes",
            image: "./img/t-bone.jpeg",
            description: "Contra filé grelhado na parrilha, suculento e saboroso"
        },
        {
            id: 2,
            name: "Alcatra",
            price: 65.00,
            category: "carnes",
            image: "./img/contra-parrilha1.png",
            description: "Alcatra grelhada na parrilha, macia e deliciosa"
        },
        {
            id: 3,
            name: "T-Bone",
            price: 70.00,
            category: "carnes",
            image: "./img/t-bone.jpeg",
            description: "T-Bone grelhado na parrilha, com osso característico"
        },
        {
            id: 4,
            name: "Assados Tiras",
            price: 60.00,
            category: "carnes",
            image: "./img/assados-tiras.png",
            description: "Carne assada em tiras, perfeita para acompanhamentos"
        },
        
        // Carnes Nobres
        {
            id: 5,
            name: "Alcatra Nobre",
            price: 60.00,
            category: "carnes",
            image: "./img/contra-parrilha1.png",
            description: "Alcatra nobre, corte especial da casa"
        },
        {
            id: 6,
            name: "Picado",
            price: 55.00,
            category: "carnes",
            image: "./img/contra-parrilha1.png",
            description: "Carne picada grelhada, ideal para sanduíches"
        },
        {
            id: 7,
            name: "Fraldinha",
            price: 60.00,
            category: "carnes",
            image: "./img/fraudinha.jpeg",
            description: "Fraldinha grelhada, saborosa e macia"
        },
        {
            id: 8,
            name: "Maminha",
            price: 60.00,
            category: "carnes",
            image: "./img/contra-parrilha1.png",
            description: "Maminha grelhada, corte nobre e suculento"
        },
        
        // Costela
        {
            id: 9,
            name: "Costela Bovina",
            price: 55.00,
            category: "carnes",
            image: "./img/costela1.png",
            description: "Costela bovina assada lentamente, desmancha na boca"
        },
        {
            id: 10,
            name: "Costela Suína",
            price: 55.00,
            category: "porco",
            image: "./img/costela1.png",
            description: "Costela suína assada, saborosa e tradicional"
        },
        {
            id: 11,
            name: "Costela de Ovelha",
            price: 60.00,
            category: "carnes",
            image: "./img/costela1.png",
            description: "Costela de ovelha, sabor único e especial"
        },
        
        // Frango
        {
            id: 12,
            name: "Frango Simples",
            price: 48.00,
            category: "frango",
            image: "./img/frango1.png",
            description: "Frango grelhado simples, sem recheio"
        },
        {
            id: 13,
            name: "Frango Recheado com Farofa",
            price: 53.00,
            category: "frango",
            image: "./img/frango1.png",
            description: "Frango recheado com farofa especial"
        },
        {
            id: 14,
            name: "Pato Recheado",
            price: 50.00,
            category: "frango",
            image: "./img/frango1.png",
            description: "Pato recheado, prato especial da casa"
        },
        {
            id: 15,
            name: "Frango Recheado Mandioca e Bacon",
            price: 50.00,
            category: "frango",
            image: "./img/frango1.png",
            description: "Frango recheado com mandioca e bacon"
        },
        {
            id: 16,
            name: "Frango Recheado Especial",
            price: 55.00,
            category: "frango",
            image: "./img/frango1.png",
            description: "Frango recheado especial, receita exclusiva"
        },
        
        // Porco
        {
            id: 17,
            name: "Porco Áparaguaia",
            price: 50.00,
            category: "porco",
            image: "./img/leitao1.png",
            description: "Porco áparaguaia, prato tradicional paraguaio"
        },
        {
            id: 18,
            name: "Paleta Suína",
            price: 45.00,
            category: "porco",
            image: "./img/leitao1.png",
            description: "Paleta suína por kg, saborosa e versátil"
        },
        
        // Na Brasa
        {
            id: 19,
            name: "Linguiçinha",
            price: 3.00,
            category: "carnes",
            image: "./img/linguiça.jpg",
            description: "Linguiçinha grelhada na brasa, unidade"
        },
        {
            id: 20,
            name: "Coxa Sobrecoxa",
            price: 8.00,
            category: "frango",
            image: "./img/linguiça.jpg",
            description: "Coxa sobrecoxa grelhada, unidade"
        },
        {
            id: 21,
            name: "Tulipinha de Frango",
            price: 40.00,
            category: "frango",
            image: "./img/linguiça.jpg",
            description: "Tulipinha de frango por kg"
        },
        {
            id: 22,
            name: "Coxinha da Asa",
            price: 35.00,
            category: "frango",
            image: "./img/linguiça.jpg",
            description: "Coxinha da asa por kg"
        },
        
        // Acompanhamentos
        {
            id: 23,
            name: "Maionese (Batata ou Mandioca)",
            price: 12.00,
            category: "acompanhamentos",
            image: "./img/sopa1.png",
            description: "Maionese caseira com batata ou mandioca"
        },
        {
            id: 24,
            name: "Farofa",
            price: 8.00,
            category: "acompanhamentos",
            image: "./img/sopa1.png",
            description: "Farofa tradicional da casa"
        },
        {
            id: 25,
            name: "Arroz",
            price: 8.00,
            category: "acompanhamentos",
            image: "./img/sopa1.png",
            description: "Arroz branco soltinho"
        },
        {
            id: 26,
            name: "Mandioca com Bacon",
            price: 10.00,
            category: "acompanhamentos",
            image: "./img/sopa1.png",
            description: "Mandioca frita com bacon crocante"
        },
        {
            id: 27,
            name: "Pão de Alho",
            price: 4.00,
            category: "acompanhamentos",
            image: "./img/sopa1.png",
            description: "Pão de alho grelhado, unidade"
        },
        {
            id: 28,
            name: "Abacaxi Assado",
            price: 20.00,
            category: "acompanhamentos",
            image: "./img/abacaxi.jpg",
            description: "Abacaxi assado na brasa, unidade"
        }
    ];
}

// Função para renderizar produtos
function renderProducts(filteredProducts = []) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='./img/logo-novo.png'">
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                <p class="product-description">${product.description}</p>
                <a href="https://wa.me/5545999463821?text=Olá! Gostaria de pedir ${product.name} por R$ ${product.price.toFixed(2).replace('.', ',')}" 
                   class="order-btn" target="_blank">
                    Pedir Agora
                </a>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Função para obter nome da categoria
function getCategoryName(category) {
    const categories = {
        'carnes': 'Carnes',
        'frango': 'Frango',
        'porco': 'Porco',
        'acompanhamentos': 'Acompanhamentos'
    };
    return categories[category] || category;
}

// Função para filtrar produtos
function filterProducts(category) {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    renderProducts(filteredProducts);
}

// Função para fazer scroll suave até a seção de produtos
function scrollToProducts() {
    const productsSection = document.getElementById('produtos');
    if (productsSection) {
        // Fazer scroll suave
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Adicionar efeito de destaque
        setTimeout(() => {
            productsSection.style.transition = 'all 0.3s ease';
            productsSection.style.transform = 'scale(1.02)';
            productsSection.style.boxShadow = '0 10px 30px rgba(243, 18, 18, 0.2)';
            
            // Remover o efeito após 1 segundo
            setTimeout(() => {
                productsSection.style.transform = 'scale(1)';
                productsSection.style.boxShadow = 'none';
            }, 1000);
        }, 500);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar produtos iniciais
    renderProducts();
    
    // Adicionar event listeners aos botões de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Filtrar produtos
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
});

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.onclick = function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            filterProducts(category);
        };
    });
}

// Chame loadProducts() ao carregar a página
window.addEventListener('DOMContentLoaded', loadProducts); 