// Variável global para produtos
let products = [];

// Carregar produtos do Firestore em tempo real
function loadProducts() {
    console.log('Carregando produtos do Firestore...');
    
    if (!db) {
        console.error('Firebase não está inicializado!');
        return;
    }
    
    db.collection("produtos").onSnapshot(snapshot => {
        products = [];
        snapshot.forEach(doc => {
            products.push({ id: doc.id, ...doc.data() });
        });
        
        console.log('Produtos carregados:', products.length);
        renderProducts(products);
        setupFilterButtons();
    }, error => {
        console.error('Erro ao carregar produtos:', error);
    });
}

// Função para renderizar produtos
function renderProducts(filteredProducts = []) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) {
        console.error('Elemento productsGrid não encontrado');
        return;
    }
    
    productsGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">Nenhum produto encontrado</div>';
        return;
    }

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
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

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

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada');
    loadProducts();
}); 