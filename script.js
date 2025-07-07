let show = true;
const menuContent = document.querySelector('.content');
const menuToggle = menuContent.querySelector('.menu-toggle');

// Novos elementos do menu mobile
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const mobileMenuLinks = mobileMenu.querySelectorAll('a');

// Função para abrir menu mobile
function openMobileMenu() {
    mobileOverlay.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}
// Função para fechar menu mobile
function closeMenuMobile() {
    mobileOverlay.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'initial';
}

// Abrir menu mobile ao clicar no hamburguer
menuToggle.addEventListener('click', openMobileMenu);
// Fechar ao clicar no X
closeMobileMenu.addEventListener('click', closeMenuMobile);
// Fechar ao clicar fora (overlay)
mobileOverlay.addEventListener('click', closeMenuMobile);

// Função para identificar link 'Início' por texto (mesmo com ícone)
function isInicioLink(link) {
    const href = link.getAttribute('href');
    if (href === '#top' || href === '#') return true;
    // Verifica se o texto do link contém 'Início' (ignorando ícones)
    return link.textContent.trim().toLowerCase().startsWith('início');
}

// Para menu mobile
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (isInicioLink(this)) {
            e.preventDefault();
            closeMenuMobile();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        closeMenuMobile();
        // Scroll suave para o destino (caso seja âncora)
        const href = this.getAttribute('href');
        if(href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if(target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Fechar menu mobile antigo ao clicar em qualquer item do menu desktop (caso esteja aberto)
const menuLinks = document.querySelectorAll('.list-menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (isInicioLink(this)) {
            e.preventDefault();
            if(menuContent.classList.contains('on')) {
                menuContent.classList.remove('on');
                show = true;
                document.body.style.overflow = 'initial';
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if(menuContent.classList.contains('on')) {
            menuContent.classList.remove('on');
            show = true;
            document.body.style.overflow = 'initial';
        }
        // Scroll suave para o destino (caso seja âncora)
        const href = this.getAttribute('href');
        if(href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if(target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});