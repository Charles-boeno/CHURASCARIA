'use strict';

const WHATSAPP_NUMBER = window.STORE_SETTINGS?.whatsapp || '5545999463821';
const CART_STORAGE_KEY = 'doisIrmaosCartV2';
const MAX_QUANTITY = 99;

const products = Array.isArray(window.STORE_PRODUCTS)
    ? window.STORE_PRODUCTS.filter(product =>
        product &&
        typeof product.id === 'string' &&
        typeof product.name === 'string' &&
        Number.isFinite(Number(product.price)) &&
        Number(product.price) >= 0
    )
    : [];

const categoryNames = {
    carnes: 'Carnes',
    linguicas: 'Linguiças',
    frango: 'Frangos',
    porco: 'Suínos',
    acompanhamentos: 'Acompanhamentos'
};

let activeCategory = 'all';
let searchTerm = '';
let cart = loadCart();
let lastFocusedElement = null;
let toastTimer;

function createIcon(name) {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    icon.classList.add('icon');
    icon.setAttribute('aria-hidden', 'true');
    use.setAttribute('href', `./assets/icons.svg#${name}`);
    icon.appendChild(use);
    return icon;
}

const productsGrid = document.getElementById('productsGrid');
const noProducts = document.getElementById('noProducts');
const productSearch = document.getElementById('productSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartCheckout = document.getElementById('cartCheckout');
const cartTotal = document.getElementById('cartTotal');
const mobileCartTotal = document.getElementById('mobileCartTotal');
const mobileCartBar = document.querySelector('.mobile-cart-bar');
const customerName = document.getElementById('customerName');
const fulfillmentType = document.getElementById('fulfillmentType');
const orderNotes = document.getElementById('orderNotes');
const finishOrder = document.getElementById('finishOrder');
const toast = document.getElementById('toast');

function formatMoney(value) {
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function normalizeText(value) {
    return String(value)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

function loadCart() {
    try {
        const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '{}');
        if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return {};

        return Object.fromEntries(
            Object.entries(stored)
                .filter(([id, quantity]) =>
                    products.some(product => product.id === id) && Number(quantity) > 0
                )
                .map(([id, quantity]) => [id, Math.min(MAX_QUANTITY, Math.floor(Number(quantity)))])
        );
    } catch {
        return {};
    }
}

function saveCart() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
        // O carrinho continua funcionando mesmo quando o navegador bloqueia o armazenamento local.
    }
}

function getProduct(productId) {
    return products.find(product => product.id === productId);
}

function getCartEntries() {
    return Object.entries(cart)
        .map(([productId, quantity]) => ({ product: getProduct(productId), quantity: Number(quantity) }))
        .filter(entry => entry.product && entry.quantity > 0);
}

function getCartSummary() {
    return getCartEntries().reduce((summary, entry) => {
        summary.quantity += entry.quantity;
        summary.total += entry.product.price * entry.quantity;
        return summary;
    }, { quantity: 0, total: 0 });
}

function createPlaceholder(product) {
    const placeholder = document.createElement('div');
    const message = document.createElement('span');
    const detail = document.createElement('small');

    placeholder.className = 'product-placeholder';
    message.textContent = 'Foto em breve';
    detail.textContent = 'Produto da 2 Irmãos';
    placeholder.append(createIcon('utensils'), message, detail);
    placeholder.setAttribute('role', 'img');
    placeholder.setAttribute('aria-label', `Foto de ${product.name} em breve`);
    return placeholder;
}

function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.category = product.category;

    const media = document.createElement('div');
    media.className = 'product-media';

    const badge = document.createElement('span');
    badge.className = 'product-badge';
    badge.textContent = categoryNames[product.category];
    media.appendChild(badge);

    if (product.image) {
        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name;
        image.loading = 'lazy';
        image.width = 600;
        image.height = 450;
        image.addEventListener('error', () => {
            image.remove();
            media.appendChild(createPlaceholder(product));
        }, { once: true });
        media.appendChild(image);
    } else {
        media.appendChild(createPlaceholder(product));
    }

    const info = document.createElement('div');
    info.className = 'product-info';

    const name = document.createElement('h3');
    name.className = 'product-name';
    name.textContent = product.name;

    const description = document.createElement('p');
    description.className = 'product-description';
    description.textContent = product.description;

    const footer = document.createElement('div');
    footer.className = 'product-footer';

    const price = document.createElement('div');
    const unit = document.createElement('small');
    price.className = 'product-price';
    unit.textContent = product.unit;
    price.append(document.createTextNode(formatMoney(product.price)), unit);

    const addButton = document.createElement('button');
    addButton.className = 'add-to-cart';
    addButton.type = 'button';
    addButton.dataset.productId = product.id;
    addButton.setAttribute('aria-label', `Adicionar ${product.name} ao pedido`);
    addButton.append(createIcon('plus'), document.createTextNode(' Adicionar'));

    footer.append(price, addButton);
    info.append(name, description, footer);
    card.append(media, info);
    return card;
}

function renderProducts() {
    const normalizedSearch = normalizeText(searchTerm);
    const filteredProducts = products.filter(product => {
        const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
        const searchMatch = !normalizedSearch || normalizeText(`${product.name} ${product.description}`).includes(normalizedSearch);
        return categoryMatch && searchMatch;
    });

    productsGrid.replaceChildren(...filteredProducts.map(createProductCard));
    noProducts.hidden = filteredProducts.length > 0;
}

function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function addToCart(productId, trigger) {
    const product = getProduct(productId);
    if (!product) return;

    cart[productId] = Math.min(MAX_QUANTITY, (Number(cart[productId]) || 0) + 1);
    saveCart();
    renderCart();
    openCart(trigger);
    showToast(`${product.name} adicionado ao pedido.`);
}

function changeQuantity(productId, change) {
    const nextQuantity = (Number(cart[productId]) || 0) + change;

    if (nextQuantity <= 0) {
        delete cart[productId];
    } else {
        cart[productId] = Math.min(MAX_QUANTITY, nextQuantity);
    }

    saveCart();
    renderCart();
}

function removeFromCart(productId) {
    delete cart[productId];
    saveCart();
    renderCart();
}

function createCartItem({ product, quantity }) {
    const item = document.createElement('article');
    item.className = 'cart-item';

    const media = document.createElement('div');
    media.className = 'cart-item-media';
    if (product.image) {
        const image = document.createElement('img');
        image.src = product.image;
        image.alt = '';
        image.addEventListener('error', () => {
            media.replaceChildren(createIcon('utensils'));
        }, { once: true });
        media.appendChild(image);
    } else {
        media.appendChild(createIcon('utensils'));
    }

    const info = document.createElement('div');
    const name = document.createElement('h3');
    const itemPrice = document.createElement('div');
    info.className = 'cart-item-info';
    name.textContent = product.name;
    itemPrice.className = 'cart-item-price';
    itemPrice.textContent = formatMoney(product.price * quantity);
    info.append(name, itemPrice);

    const actions = document.createElement('div');
    const quantityControl = document.createElement('div');
    const decreaseButton = document.createElement('button');
    const quantityValue = document.createElement('span');
    const increaseButton = document.createElement('button');
    const removeButton = document.createElement('button');

    actions.className = 'cart-item-actions';

    quantityControl.className = 'quantity-control';
    quantityControl.setAttribute('role', 'group');
    quantityControl.setAttribute('aria-label', `Quantidade de ${product.name}`);

    decreaseButton.type = 'button';
    decreaseButton.dataset.cartAction = 'decrease';
    decreaseButton.dataset.productId = product.id;
    decreaseButton.setAttribute('aria-label', `Diminuir quantidade de ${product.name}`);
    decreaseButton.textContent = '−';

    quantityValue.setAttribute('aria-live', 'polite');
    quantityValue.textContent = quantity;

    increaseButton.type = 'button';
    increaseButton.dataset.cartAction = 'increase';
    increaseButton.dataset.productId = product.id;
    increaseButton.setAttribute('aria-label', `Aumentar quantidade de ${product.name}`);
    increaseButton.textContent = '+';

    removeButton.className = 'remove-item';
    removeButton.type = 'button';
    removeButton.dataset.cartAction = 'remove';
    removeButton.dataset.productId = product.id;
    removeButton.textContent = 'Remover';

    quantityControl.append(decreaseButton, quantityValue, increaseButton);
    actions.append(quantityControl, removeButton);

    info.appendChild(actions);
    item.append(media, info);
    return item;
}

function renderCart() {
    const entries = getCartEntries();
    const summary = getCartSummary();

    cartItems.replaceChildren(...entries.map(createCartItem));
    cartEmpty.hidden = entries.length > 0;
    cartCheckout.hidden = entries.length === 0;
    cartItems.hidden = entries.length === 0;
    cartTotal.textContent = formatMoney(summary.total);
    mobileCartTotal.textContent = formatMoney(summary.total);

    document.querySelectorAll('[data-cart-count]').forEach(element => {
        element.textContent = summary.quantity;
    });

    mobileCartBar.classList.toggle('visible', summary.quantity > 0);
}

function openCart(trigger) {
    lastFocusedElement = trigger || document.activeElement;
    cartOverlay.hidden = false;
    cartDrawer.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartDrawer.inert = false;
    document.body.classList.add('cart-open');
    cartDrawer.querySelector('[data-cart-close]')?.focus();
}

function closeCart() {
    cartDrawer.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartDrawer.inert = true;
    document.body.classList.remove('cart-open');
    setTimeout(() => {
        if (!cartDrawer.classList.contains('open')) cartOverlay.hidden = true;
    }, 280);
    if (lastFocusedElement?.isConnected) lastFocusedElement.focus();
}

function finishOrderOnWhatsApp() {
    const entries = getCartEntries();
    if (!entries.length) {
        showToast('Adicione um produto antes de enviar o pedido.');
        return;
    }

    const summary = getCartSummary();
    const name = customerName.value.trim();
    const fulfillment = fulfillmentType.value;
    const notes = orderNotes.value.trim();
    const itemLines = entries.map(entry =>
        `• ${entry.quantity}x ${entry.product.name} — ${formatMoney(entry.product.price * entry.quantity)}`
    );

    const message = [
        'Olá! Gostaria de fazer este pedido na 2 Irmãos:',
        '',
        ...itemLines,
        '',
        `Subtotal estimado: ${formatMoney(summary.total)}`,
        `Recebimento: ${fulfillment}`,
        name ? `Nome: ${name}` : null,
        notes ? `Observações: ${notes}` : null,
        '',
        'Por favor, confirme a disponibilidade, o prazo, a taxa de entrega e a forma de pagamento.'
    ].filter(line => line !== null).join('\n');

    const orderUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const orderWindow = window.open(orderUrl, '_blank', 'noopener,noreferrer');
    if (orderWindow) orderWindow.opener = null;
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        activeCategory = button.dataset.category;
        filterButtons.forEach(item => {
            const active = item === button;
            item.classList.toggle('active', active);
            item.setAttribute('aria-pressed', String(active));
        });
        renderProducts();
    });
});

productSearch.addEventListener('input', event => {
    searchTerm = event.target.value;
    renderProducts();
});

productsGrid.addEventListener('click', event => {
    const button = event.target.closest('.add-to-cart');
    if (button) addToCart(button.dataset.productId, button);
});

cartItems.addEventListener('click', event => {
    const button = event.target.closest('[data-cart-action]');
    if (!button) return;

    const productId = button.dataset.productId;
    const action = button.dataset.cartAction;
    if (action === 'increase') changeQuantity(productId, 1);
    if (action === 'decrease') changeQuantity(productId, -1);
    if (action === 'remove') removeFromCart(productId);
});

document.querySelectorAll('[data-cart-open]').forEach(button => {
    button.addEventListener('click', () => openCart(button));
});

document.querySelectorAll('[data-cart-close]').forEach(button => {
    button.addEventListener('click', closeCart);
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && cartDrawer.classList.contains('open')) closeCart();
});

cartDrawer.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || !cartDrawer.classList.contains('open')) return;

    const focusableElements = [...cartDrawer.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]'
    )].filter(element => !element.closest('[hidden]'));
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (!firstElement || !lastElement) return;
    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
});

finishOrder.addEventListener('click', finishOrderOnWhatsApp);

renderProducts();
renderCart();
