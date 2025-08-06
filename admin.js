// Sistema de Login
const ADMIN_CREDENTIALS = {
    username: '2irmaos',
    password: 'val2025'
};

let isLoggedIn = false;
let currentUser = '';
let products = []; // Declaração global da variável products
let useFirebase = false;

// Carregar produtos do Firestore em tempo real
function loadProducts() {
    console.log('Carregando produtos na administração...');
    
    if (!db) {
        console.log('Firebase não disponível, usando produtos de fallback');
        useFirebase = false;
        loadLocalProducts();
        return;
    }
    
    // Tentar usar Firebase primeiro
    useFirebase = true;
    
    if (window._productsListener) {
        window._productsListener(); // Remove o snapshot antigo, se existir
    }
    
    window._productsListener = db.collection("produtos").onSnapshot(snapshot => {
        console.log('Snapshot recebido na admin:', snapshot.size, 'produtos');
        
        if (snapshot.size === 0) {
            console.log('Nenhum produto no Firestore, usando fallback');
            loadLocalProducts();
        } else {
            products = [];
            snapshot.forEach(doc => {
                products.push({ id: doc.id, ...doc.data() });
            });
            renderProductsTable(products);
        }
    }, error => {
        console.error('Erro ao carregar produtos:', error);
        console.log('Usando produtos de fallback devido ao erro');
        useFirebase = false;
        loadLocalProducts();
    });
}

// Carregar produtos locais
function loadLocalProducts() {
    const localProducts = localStorage.getItem('localProducts');
    if (localProducts) {
        products = JSON.parse(localProducts);
    } else {
        // Produtos padrão
        products = [
            {
                id: '1',
                name: "Contra Filé",
                price: 70.00,
                category: "carnes",
                image: "./img/t-bone.jpeg",
                description: "Contra filé grelhado na parrilha"
            },
            {
                id: '2',
                name: "Frango Simples",
                price: 48.00,
                category: "frango",
                image: "./img/frango1.png",
                description: "Frango grelhado simples"
            }
        ];
    }
    renderProductsTable(products);
}

// Adicionar produto
async function addProduct(product) {
    try {
        if (useFirebase && db) {
            const docRef = await db.collection("produtos").add(product);
            console.log('Produto adicionado ao Firebase! ID:', docRef.id);
            return true;
        } else {
            const newId = (products.length + 1).toString();
            products.push({ id: newId, ...product });
            localStorage.setItem('localProducts', JSON.stringify(products));
            console.log('Produto adicionado localmente!');
            return true;
        }
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        showNotification('Erro ao adicionar produto: ' + error.message, 'error');
        return false;
    }
}

// Editar produto
async function updateProduct(id, product) {
    console.log('Tentando atualizar:', id, product);
    try {
        if (useFirebase && db) {
            await db.collection("produtos").doc(id).set(product, { merge: true });
            console.log('Atualizado no Firebase com sucesso!');
        } else {
            const index = products.findIndex(p => p.id === id);
            if (index !== -1) {
                products[index] = { ...products[index], ...product };
                localStorage.setItem('localProducts', JSON.stringify(products));
                console.log('Atualizado localmente com sucesso!');
            }
        }
        return true;
    } catch (error) {
        showNotification('Erro ao atualizar produto: ' + error.message, 'error');
        console.error('Erro ao atualizar:', error);
        return false;
    }
}

// Remover produto
async function deleteProduct(id) {
    try {
        if (useFirebase && db) {
            await db.collection("produtos").doc(id).delete();
            console.log('Produto excluído do Firebase!');
        } else {
            products = products.filter(p => p.id !== id);
            localStorage.setItem('localProducts', JSON.stringify(products));
            console.log('Produto excluído localmente!');
        }
        return true;
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        showNotification('Erro ao excluir produto: ' + error.message, 'error');
        return false;
    }
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

    if (filteredProducts.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem;">
                    Nenhum produto encontrado
                </td>
            </tr>
        `;
        return;
    }

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
    
    // Mostrar preview da imagem atual
    const previewDiv = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    if (product.image) {
        previewImg.src = product.image;
        previewDiv.style.display = 'block';
    } else {
        previewDiv.style.display = 'none';
    }
    
    document.getElementById('productModal').style.display = 'block';
}

// Função para fechar modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    currentEditId = null;
    clearImagePreview(); // Limpar preview de imagem
}

// Função para mostrar confirmação de exclusão
function showDeleteConfirm(id) {
    console.log('🔍 showDeleteConfirm chamada com ID:', id);
    console.log('🔍 isLoggedIn:', isLoggedIn);
    
    if (!isLoggedIn) {
        showNotification('Você precisa estar logado para realizar esta ação!', 'error');
        return;
    }
    
    currentDeleteId = id;
    console.log('🔍 currentDeleteId definido como:', currentDeleteId);
    document.getElementById('confirmModal').style.display = 'block';
    console.log('🔍 Modal de confirmação aberto');
}

// Função para fechar modal de confirmação
function closeConfirmModal() {
    console.log('🔍 closeConfirmModal chamada');
    document.getElementById('confirmModal').style.display = 'none';
    currentDeleteId = null;
}

// Função para confirmar exclusão
async function confirmDelete() {
    console.log('🔍 confirmDelete chamada');
    console.log('🔍 currentDeleteId:', currentDeleteId);
    
    if (currentDeleteId) {
        console.log('🔍 Tentando excluir produto com ID:', currentDeleteId);
        const success = await deleteProduct(currentDeleteId);
        console.log('🔍 Resultado da exclusão:', success);
        
        if (success) {
            closeConfirmModal();
            showNotification('Produto excluído com sucesso!', 'success');
            loadProducts(); // Recarregar produtos
        } else {
            showNotification('Erro ao excluir produto!', 'error');
        }
    } else {
        console.log('🔍 currentDeleteId é null ou undefined');
        showNotification('ID do produto não encontrado!', 'error');
    }
}

// Função para gerenciar upload de imagem
function handleImageUpload() {
    const fileInput = document.getElementById('productImageUpload');
    const imageUrlInput = document.getElementById('productImage');
    const previewDiv = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Verificar se é uma imagem
            if (!file.type.startsWith('image/')) {
                showNotification('Por favor, selecione apenas arquivos de imagem!', 'error');
                return;
            }
            
            // Verificar tamanho (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('A imagem deve ter menos de 5MB!', 'error');
                return;
            }
            
            // Converter para base64
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Image = e.target.result;
                
                // Mostrar preview
                previewImg.src = base64Image;
                previewDiv.style.display = 'block';
                
                // Preencher campo de URL com base64
                imageUrlInput.value = base64Image;
                
                showNotification('Imagem carregada com sucesso!', 'success');
            };
            reader.readAsDataURL(file);
        }
    });
}

// Função para limpar preview de imagem
function clearImagePreview() {
    const fileInput = document.getElementById('productImageUpload');
    const imageUrlInput = document.getElementById('productImage');
    const previewDiv = document.getElementById('imagePreview');
    
    fileInput.value = '';
    imageUrlInput.value = '';
    previewDiv.style.display = 'none';
}

// Função para otimizar imagem antes do upload
function optimizeImage(file) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = function() {
            // Calcular novas dimensões (máximo 800x600)
            let { width, height } = img;
            const maxWidth = 800;
            const maxHeight = 600;
            
            if (width > height) {
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
            }
            
            // Redimensionar
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            
            // Converter para base64 com qualidade 0.8
            const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.8);
            resolve(optimizedBase64);
        };
        
        img.src = URL.createObjectURL(file);
    });
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
    
    console.log('Salvando produto:', currentEditId, productData);
    
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
            // Atualizar produto existente
            const ok = await updateProduct(currentEditId, productData);
            if (ok) {
                showNotification(`Produto atualizado com sucesso!`, 'success');
                closeModal();
            } else {
                showNotification('Erro ao atualizar produto!', 'error');
            }
            currentEditId = null;
        } else {
            // Adicionar novo produto
            const success = await addProduct(productData);
            if (success) {
                showNotification(`Produto adicionado com sucesso!`, 'success');
                closeModal();
            } else {
                showNotification('Erro ao adicionar produto!', 'error');
            }
        }
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        showNotification('Erro ao salvar produto: ' + error.message, 'error');
    }
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
    
    // Event listener para upload de imagem
    handleImageUpload();
    
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
                        // Salvar cada produto no Firebase ou local
                        importedProducts.forEach(async product => {
                            if (useFirebase && db) {
                                await db.collection("produtos").add(product);
                            } else {
                                products.push(product);
                                localStorage.setItem('localProducts', JSON.stringify(products));
                            }
                        });
                        showNotification('Produtos importados com sucesso!', 'success');
                        loadProducts();
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