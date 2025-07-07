// Configuração do Firebase
// IMPORTANTE: Você precisa substituir estas configurações pelas suas próprias
const firebaseConfig = {
    apiKey: "sua-api-key-aqui",
    authDomain: "seu-projeto.firebaseapp.com",
    projectId: "seu-projeto-id",
    storageBucket: "seu-projeto.appspot.com",
    messagingSenderId: "123456789",
    appId: "seu-app-id"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referências do Firebase
const db = firebase.firestore();
const auth = firebase.auth();

// Sistema de Login
const ADMIN_CREDENTIALS = {
    username: '2irmaos',
    password: 'val2025'
};

let isLoggedIn = false;
let currentUser = '';
let products = [];

// Verificar se já está logado
function checkLoginStatus() {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            isLoggedIn = true;
            currentUser = user.email || 'Admin';
            showAdminPanel();
            loadProductsFromFirebase();
        } else {
            showLoginScreen();
        }
    });
}

// Mostrar tela de login
function showLoginScreen() {
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    isLoggedIn = false;
}

// Mostrar painel administrativo
function showAdminPanel() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('currentUser').textContent = currentUser;
}

// Função de login
async function login(username, password) {
    try {
        // Verificar credenciais locais primeiro
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            // Fazer login anônimo no Firebase (para simplificar)
            await auth.signInAnonymously();
            showNotification('Login realizado com sucesso!', 'success');
            return true;
        } else {
            showNotification('Usuário ou senha incorretos!', 'error');
            return false;
        }
    } catch (error) {
        showNotification('Erro ao fazer login: ' + error.message, 'error');
        return false;
    }
}

// Função de logout
async function logout() {
    try {
        await auth.signOut();
        isLoggedIn = false;
        currentUser = '';
        showLoginScreen();
        showNotification('Logout realizado com sucesso!', 'info');
    } catch (error) {
        showNotification('Erro ao fazer logout: ' + error.message, 'error');
    }
}

// Carregar produtos do Firebase
async function loadProductsFromFirebase() {
    try {
        const snapshot = await db.collection('products').get();
        if (snapshot.empty) {
            // Se não há produtos, carregar produtos padrão
            products = getDefaultProducts();
            await saveProductsToFirebase();
        } else {
            products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        }
        renderProductsTable();
    } catch (error) {
        showNotification('Erro ao carregar produtos: ' + error.message, 'error');
        // Fallback para produtos padrão
        products = getDefaultProducts();
        renderProductsTable();
    }
}

// Salvar produtos no Firebase
async function saveProductsToFirebase() {
    try {
        // Limpar coleção atual
        const snapshot = await db.collection('products').get();
        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        // Adicionar produtos atualizados
        const addBatch = db.batch();
        products.forEach(product => {
            const docRef = db.collection('products').doc();
            addBatch.set(docRef, {
                name: product.name,
                price: product.price,
                category: product.category,
                image: product.image,
                description: product.description
            });
        });
        await addBatch.commit();
        
        showNotification('Produtos salvos no servidor!', 'success');
    } catch (error) {
        showNotification('Erro ao salvar produtos: ' + error.message, 'error');
    }
}

// Obter produtos padrão
function getDefaultProducts() {
    return [
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

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// Variáveis globais
let currentEditId = null;
let currentDeleteId = null;

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

// Função para renderizar tabela de produtos
function renderProductsTable(filteredProducts = products) {
    const tableBody = document.getElementById('productsTableBody');
    tableBody.innerHTML = '';

    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${product.id}</td>
            <td class="product-image-cell">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='./img/logo-novo.png'">
            </td>
            <td>${product.name}</td>
            <td>${getCategoryName(product.category)}</td>
            <td class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</td>
            <td>${product.description}</td>
            <td class="actions-cell">
                <button class="edit-btn" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="delete-btn" onclick="showDeleteConfirm(${product.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Função para filtrar produtos
function filterProducts() {
    const searchTerm = document.getElementById('searchProduct').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    let filteredProducts = products;
    
    // Filtrar por categoria
    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    // Filtrar por busca
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    renderProductsTable(filteredProducts);
}

// Função para mostrar modal de adicionar produto
function showAddProductModal() {
    if (!isLoggedIn) {
        showNotification('Você precisa estar logado para realizar esta ação!', 'error');
        return;
    }
    
    currentEditId = null;
    document.getElementById('modalTitle').textContent = 'Adicionar Produto';
    document.getElementById('productForm').reset();
    document.getElementById('productModal').style.display = 'block';
}

// Função para editar produto
function editProduct(id) {
    if (!isLoggedIn) {
        showNotification('Você precisa estar logado para realizar esta ação!', 'error');
        return;
    }
    
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    currentEditId = id;
    document.getElementById('modalTitle').textContent = 'Editar Produto';
    
    // Preencher formulário
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productDescription').value = product.description;
    
    document.getElementById('productModal').style.display = 'block';
}

// Função para fechar modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    currentEditId = null;
}

// Função para mostrar confirmação de exclusão
function showDeleteConfirm(id) {
    if (!isLoggedIn) {
        showNotification('Você precisa estar logado para realizar esta ação!', 'error');
        return;
    }
    
    currentDeleteId = id;
    document.getElementById('confirmModal').style.display = 'block';
}

// Função para fechar modal de confirmação
function closeConfirmModal() {
    document.getElementById('confirmModal').style.display = 'none';
    currentDeleteId = null;
}

// Função para confirmar exclusão
async function confirmDelete() {
    if (currentDeleteId) {
        try {
            const productToDelete = products.find(p => p.id === currentDeleteId);
            products = products.filter(p => p.id !== currentDeleteId);
            
            // Salvar no Firebase
            await saveProductsToFirebase();
            
            renderProductsTable();
            closeConfirmModal();
            showNotification(`Produto "${productToDelete.name}" excluído com sucesso!`, 'success');
        } catch (error) {
            showNotification('Erro ao excluir produto: ' + error.message, 'error');
        }
    }
}

// Função para salvar produto
async function saveProduct(formData) {
    const productData = {
        name: formData.get('name').trim(),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        image: formData.get('image').trim(),
        description: formData.get('description').trim()
    };
    
    // Validação dos dados
    if (!productData.name || !productData.category || !productData.price || !productData.image || !productData.description) {
        showNotification('Todos os campos são obrigatórios!', 'error');
        return;
    }
    
    if (productData.price <= 0) {
        showNotification('O preço deve ser maior que zero!', 'error');
        return;
    }
    
    try {
        if (currentEditId) {
            // Editar produto existente
            const index = products.findIndex(p => p.id === currentEditId);
            if (index !== -1) {
                products[index] = { 
                    id: currentEditId,
                    ...productData 
                };
                showNotification(`Produto "${productData.name}" atualizado com sucesso!`, 'success');
            }
        } else {
            // Adicionar novo produto
            const newId = Math.max(...products.map(p => p.id)) + 1;
            products.push({
                id: newId,
                ...productData
            });
            showNotification(`Produto "${productData.name}" adicionado com sucesso!`, 'success');
        }
        
        // Salvar no Firebase
        await saveProductsToFirebase();
        
        // Atualizar a tabela
        renderProductsTable();
        
        // Fechar modal
        closeModal();
        
    } catch (error) {
        showNotification('Erro ao salvar produto: ' + error.message, 'error');
    }
}

// Função para mostrar notificação
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = '#28a745';
            break;
        case 'error':
            backgroundColor = '#dc3545';
            break;
        case 'warning':
            backgroundColor = '#ffc107';
            break;
        default:
            backgroundColor = '#007bff';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1001;
        animation: slideIn 0.3s ease;
        background: ${backgroundColor};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Função para resetar produtos para valores padrão
async function resetToDefaultProducts() {
    if (confirm('Tem certeza que deseja resetar todos os produtos para os valores padrão? Esta ação não pode ser desfeita.')) {
        try {
            products = getDefaultProducts();
            await saveProductsToFirebase();
            renderProductsTable();
            showNotification('Produtos resetados para valores padrão!', 'success');
        } catch (error) {
            showNotification('Erro ao resetar produtos: ' + error.message, 'error');
        }
    }
}

// Função para exportar produtos
function exportProducts() {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'produtos-churrascaria.json';
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Produtos exportados com sucesso!', 'success');
}

// Função para importar produtos
function importProducts() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async function(e) {
                try {
                    const importedProducts = JSON.parse(e.target.result);
                    if (Array.isArray(importedProducts)) {
                        products = importedProducts;
                        await saveProductsToFirebase();
                        renderProductsTable();
                        showNotification('Produtos importados com sucesso!', 'success');
                    } else {
                        showNotification('Arquivo inválido!', 'error');
                    }
                } catch (error) {
                    showNotification('Erro ao importar arquivo!', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    
    input.click();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Verificar status de login
    checkLoginStatus();
    
    // Event listener para formulário de login
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const username = formData.get('username');
        const password = formData.get('password');
        
        login(username, password);
    });
    
    // Event listeners para filtros
    document.getElementById('searchProduct').addEventListener('input', filterProducts);
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    
    // Event listener para formulário de produto
    document.getElementById('productForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        saveProduct(formData);
    });
    
    // Fechar modais ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});

// Adicionar CSS para animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 