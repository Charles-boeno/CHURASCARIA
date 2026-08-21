'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const createIcon = (name) => {
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

        icon.classList.add('icon');
        icon.setAttribute('aria-hidden', 'true');
        use.setAttribute('href', `./assets/icons.svg#${name}`);
        icon.appendChild(use);
        return icon;
    };
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.getElementById('primaryNavigation');

    if (menuToggle && navigation) {
        const setMenu = (open) => {
            navigation.classList.toggle('open', open);
            menuToggle.setAttribute('aria-expanded', String(open));
            menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
            document.body.classList.toggle('menu-open', open);
        };

        menuToggle.addEventListener('click', () => {
            setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
        });

        navigation.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenu(false));
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') setMenu(false);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 860) setMenu(false);
        });
    }

    const hero = document.querySelector('[data-hero-slider]');
    if (!hero) return;

    const slides = [...hero.querySelectorAll('.hero-slide')];
    const dots = [...hero.querySelectorAll('[data-hero-dot]')];
    const copy = hero.querySelector('.hero-copy');
    const eyebrow = document.getElementById('heroEyebrow');
    const title = document.getElementById('hero-title');
    const description = document.getElementById('heroDescription');
    const orderButton = document.getElementById('heroOrderButton');
    const status = document.getElementById('heroSliderStatus');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const banners = [
        {
            eyebrow: 'Novidade da 2 Irmãos',
            icon: 'fire',
            title: 'Torresmo de rolo, crocante e irresistível.',
            description: 'Faça sua encomenda antecipada e confirme a disponibilidade pelo WhatsApp.',
            button: 'Pedir torresmo',
            product: 'torresmo de rolo'
        },
        {
            eyebrow: 'Recheada e assada na brasa',
            icon: 'utensils',
            title: 'Linguiça recheada, suculenta e cheia de sabor.',
            description: 'Suculenta, bem temperada e preparada no capricho. Consulte os sabores disponíveis.',
            button: 'Pedir linguiça',
            product: 'linguiça recheada'
        },
        {
            eyebrow: 'O sabor do domingo',
            icon: 'clock',
            title: 'Costela assada lentamente e cheia de sabor.',
            description: 'Reserve sua porção e confirme o melhor horário para retirada ou entrega.',
            button: 'Pedir costela',
            product: 'costela assada'
        }
    ];

    let currentSlide = 0;
    let autoplayTimer;
    let contentTimer;
    let dragStartX = null;

    const updateContent = (banner) => {
        eyebrow.replaceChildren(createIcon(banner.icon), document.createTextNode(` ${banner.eyebrow}`));
        title.textContent = banner.title;
        description.textContent = banner.description;
        orderButton.replaceChildren(createIcon('whatsapp'), document.createTextNode(` ${banner.button}`));
        orderButton.href = `https://wa.me/5545999463821?text=${encodeURIComponent(`Olá! Gostaria de encomendar ${banner.product}.`)}`;
        orderButton.setAttribute('aria-label', `${banner.button} pelo WhatsApp`);
    };

    const showSlide = (index, announce = false) => {
        currentSlide = (index + slides.length) % slides.length;
        const banner = banners[currentSlide];

        slides.forEach((slide, slideIndex) => {
            const active = slideIndex === currentSlide;
            slide.classList.toggle('active', active);
            slide.setAttribute('aria-hidden', String(!active));
        });

        dots.forEach((dot, dotIndex) => {
            const active = dotIndex === currentSlide;
            dot.classList.toggle('active', active);
            dot.setAttribute('aria-pressed', String(active));
        });

        copy.classList.add('is-changing');
        window.clearTimeout(contentTimer);
        contentTimer = window.setTimeout(() => {
            updateContent(banner);
            copy.classList.remove('is-changing');
        }, reduceMotion.matches ? 0 : 160);

        if (announce) status.textContent = `Banner ${currentSlide + 1} de ${slides.length}: ${banner.title}`;
    };

    const stopAutoplay = () => window.clearInterval(autoplayTimer);
    const startAutoplay = () => {
        stopAutoplay();
        if (!reduceMotion.matches && document.visibilityState === 'visible') {
            autoplayTimer = window.setInterval(() => showSlide(currentSlide + 1), 5500);
        }
    };

    const changeSlide = (direction) => {
        showSlide(currentSlide + direction, true);
        startAutoplay();
    };

    dots.forEach(dot => dot.addEventListener('click', () => {
        showSlide(Number(dot.dataset.heroDot), true);
        startAutoplay();
    }));

    hero.addEventListener('mouseenter', stopAutoplay);
    hero.addEventListener('mouseleave', startAutoplay);
    hero.addEventListener('focusin', stopAutoplay);
    hero.addEventListener('focusout', () => window.setTimeout(() => {
        if (!hero.contains(document.activeElement)) startAutoplay();
    }, 0));

    hero.addEventListener('pointerdown', event => {
        if (event.button !== 0 || event.target.closest('a, button')) return;
        dragStartX = event.clientX;
        stopAutoplay();
    });

    hero.addEventListener('pointerup', event => {
        if (dragStartX === null) return;
        const distance = event.clientX - dragStartX;
        dragStartX = null;
        if (Math.abs(distance) > 45) changeSlide(distance < 0 ? 1 : -1);
        else startAutoplay();
    });

    hero.addEventListener('pointercancel', () => {
        dragStartX = null;
        startAutoplay();
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') startAutoplay();
        else stopAutoplay();
    });

    reduceMotion.addEventListener?.('change', startAutoplay);
    startAutoplay();
});
