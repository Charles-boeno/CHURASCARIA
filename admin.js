// Sistema de Login
const ADMIN_CREDENTIALS = {
    username: '2irmaos',
    password: 'val2025'
};

let isLoggedIn = false;
let currentUser = '';

// Produtos de fallback para a administração
const fallbackProducts = [
    {
        id: '1',
        name: "Contra Filé",
        price: 70.00,
        category: "carnes",
        image: "./img/t-bone.jpeg",
        description: "Contra filé grelhado na parrilha, suculento e saboroso"
    },
    {
        id: '2',
        name: "Alcatra",
        price: 65.00,
        category: "carnes",
        image: "./img/contra-parrilha1.png",
        description: "Alcatra grelhada na parrilha, macia e deliciosa"
    },
    {
        id: '3',
        name: "T-Bone",
        price: 70.00,
        category: "carnes",
        image: "./img/t-bone.jpeg",
        description: "T-Bone grelhado na parrilha, com osso característico"
    },
    {
        id: '4',
        name: "Costela Bovina",
        price: 55.00,
        category: "carnes",
        image: "./img/costela1.png",
        description: "Costela bovina assada lentamente, desmancha na boca"
    },
    {
        id: '5',
        name: "Frango Simples",
        price: 48.00,
        category: "frango",
        image: "./img/frango1.png",
        description: "Frango grelhado simples, sem recheio"
    },
    {
        id: '6',
        name: "Frango Recheado com Farofa",
        price: 53.00,
        category: "frango",
        image: "./img/frango1.png",
        description: "Frango recheado com farofa especial"
    },
    {
        id: '7',
        name: "Pato Recheado",
        price: 50.00,
        category: "frango",
        image: "./img/frango1.png",
        description: "Pato recheado, prato especial da casa"
    },
    {
        id: '8',
        name: "Coxa Sobrecoxa",
        price: 8.00,
        category: "frango",
        image: "./img/linguiça.jpg",
        description: "Coxa sobrecoxa grelhada, unidade"
    },
    {
        id: '9',
        name: "Porco Áparaguaia",
        price: 50.00,
        category: "porco",
        image: "./img/leitao1.png",
        description: "Porco áparaguaia, prato tradicional paraguaio"
    },
    {
        id: '10',
        name: "Paleta Suína",
        price: 45.00,
        category: "porco",
        image: "./img/leitao1.png",
        description: "Paleta suína por kg, saborosa e versátil"
    },
    {
        id: '11',
        name: "Costela Suína",
        price: 55.00,
        category: "porco",
        image: "./img/costela1.png",
        description: "Costela suína assada, saborosa e tradicional"
    },
    {
        id: '12',
        name: "Farofa",
        price: 8.00,
        category: "acompanhamentos",
        image: "./img/sopa1.png",
        description: "Farofa tradicional da casa"
    },
    {
        id: '13',
        name: "Arroz",
        price: 8.00,
        category: "acompanhamentos",
        image: "./img/sopa1.png",
        description: "Arroz branco soltinho"
    },
    {
        id: '14',
        name: "Mandioca com Bacon",
        price: 10.00,
        category: "acompanhamentos",
        image: "./img/sopa1.png",
        description: "Mandioca frita com bacon crocante"
    },
    {
        id: '15',
        name: "Pão de Alho",
        price: 4.00,
        category: "acompanhamentos",
        image: "./img/sopa1.png",
        description: "Pão de alho grelhado, unidade"
    },
    {
        id: '16',
        name: "Abacaxi Assado",
        price: 20.00,
        category: "acompanhamentos",
        image: "./img/abacaxi.jpg",
        description: "Abacaxi assado na brasa, unidade"
    }
];

// Carregar produtos do Firestore em tempo real
function loadProducts() {
    console.log('Carregando produtos na administração...');
    
    if (!db) {
        console.log('Firebase não disponível, usando produtos de fallback');
        products = fallbackProducts;
        renderProductsTable(products);
        return;
    }
    
    if (window._productsListener) {
        window._productsListener(); // Remove o snapshot antigo, se existir
    }
    
    window._productsListener = db.collection("produtos").onSnapshot(snapshot => {
        console.log('Snapshot recebido na admin:', snapshot.size, 'produtos');
        
        if (snapshot.size === 0) {
            console.log('Nenhum produto no Firestore, usando fallback');
            products = fallbackProducts;
        } else {
            products = [];
            snapshot.forEach(doc => {
                products.push({ id: doc.id, ...doc.data() });
            });
        }
        
        renderProductsTable(products);
    }, error => {
        console.error('Erro ao carregar produtos:', error);
        console.log('Usando produtos de fallback devido ao erro');
        products = fallbackProducts;
        renderProductsTable(products);
    });
}

// Adicionar produto
function addProduct(product) {
    db.collection("produtos").add(product);
}

// Editar produto
async function updateProduct(id, product) {
    console.log('Tentando atualizar:', id, product);
    try {
        await db.collection("produtos").doc(id).set(product, { merge: true });
        console.log('Atualizado com sucesso!');
        return true;
    } catch (error) {
        showNotification('Erro ao atualizar produto: ' + error.message, 'error');
        console.error('Erro ao atualizar:', error);
        return false;
    }
}

// Remover produto
function deleteProduct(id) {
    db.collection("produtos").doc(id).delete();
}

// Verificar se já está logado
function checkLoginStatus() {
    const session = localStorage.getItem('adminSession');
    if (session) {
        const sessionData = JSON.parse(session);
        const now = new Date().getTime();
        
        // Verificar se a sessão não expirou (24 horas)
        if (now - sessionData.timestamp < 24 * 60 * 60 * 1000) {
            isLoggedIn = true;
            currentUser = sessionData.username;
            showAdminPanel();
            return;
        } else {
            // Sessão expirada
            localStorage.removeItem('adminSession');
        }
    }
    
    showLoginScreen();
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
    // Corrigido: só carregar produtos, não renderizar tabela diretamente
    loadProducts();
}

// Função de login
function login(username, password) {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        isLoggedIn = true;
        currentUser = username;
        
        // Salvar sessão
        const sessionData = {
            username: username,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('adminSession', JSON.stringify(sessionData));
        
        showAdminPanel();
        showNotification('Login realizado com sucesso!', 'success');
        return true;
    } else {
        showNotification('Usuário ou senha incorretos!', 'error');
        return false;
    }
}

// Função de logout
function logout() {
    isLoggedIn = false;
    currentUser = '';
    localStorage.removeItem('adminSession');
    showLoginScreen();
    showNotification('Logout realizado com sucesso!', 'info');
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
                <button class="edit-btn" onclick="editProduct('${product.id}')">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="delete-btn" onclick="showDeleteConfirm('${product.id}')">
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
    // Buscar sempre pelo id do Firestore
    const product = products.find(p => p.id === id);
    if (!product) return;
    currentEditId = product.id; // sempre o id do Firestore
    document.getElementById('modalTitle').textContent = 'Editar Produto';
    document.getElementById('productId').value = product.id;
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
function confirmDelete() {
    if (currentDeleteId) {
        deleteProduct(currentDeleteId);
        closeConfirmModal();
        showNotification('Produto excluído com sucesso!', 'success');
    }
}

// Função para salvar produto
async function saveProduct(formData) {
    alert('Atualizado!');
    const productData = {
        name: formData.get('name').trim(),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        image: formData.get('image').trim(),
        description: formData.get('description').trim()
    };
    console.log('Salvando produto:', currentEditId, productData);
    if (!productData.name || !productData.category || !productData.price || !productData.image || !productData.description) {
        showNotification('Todos os campos são obrigatórios!', 'error');
        return;
    }
    if (productData.price <= 0) {
        showNotification('O preço deve ser maior que zero!', 'error');
        return;
    }
    if (currentEditId) {
        const ok = await updateProduct(currentEditId, productData);
        if (ok) {
            showNotification(`Produto atualizado com sucesso!`, 'success');
        }
        currentEditId = null;
    } else {
        addProduct(productData);
        showNotification(`Produto adicionado com sucesso!`, 'success');
    }
    closeModal();
}

// Função para mostrar notificação
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
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
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
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
    
    // Event listeners para filtros (apenas se estiver logado)
    if (isLoggedIn) {
        document.getElementById('searchProduct').addEventListener('input', filterProducts);
        document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    }
    
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

// Função para resetar produtos para valores padrão
function resetToDefaultProducts() {
    if (confirm('Tem certeza que deseja resetar todos os produtos para os valores padrão? Esta ação não pode ser desfeita.')) {
        products = getDefaultProducts();
        saveProductsToStorage();
        renderProductsTable();
        showNotification('Produtos resetados para valores padrão!', 'success');
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
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedProducts = JSON.parse(e.target.result);
                    if (Array.isArray(importedProducts)) {
                        // Salvar cada produto no Firestore
                        importedProducts.forEach(product => {
                            db.collection("produtos").add(product);
                        });
                        showNotification('Produtos importados para o Firestore com sucesso!', 'success');
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