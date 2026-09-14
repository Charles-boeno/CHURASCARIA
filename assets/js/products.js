/*
 * ARQUIVO FÁCIL PARA ATUALIZAR A LOJA
 *
 * WHATSAPP:
 * - Use somente números, com 55 + DDD + telefone.
 *
 * PRODUTOS:
 * - price: use ponto para os centavos. Exemplo: 49.90
 * - image: coloque a foto em assets/images e informe o caminho completo
 * - image: use null quando ainda não tiver uma foto correta
 * - category: carnes, linguicas, frango, porco ou acompanhamentos
 * - unit: por kg, por unidade ou por porção
 *
 * Evite alterar o campo id de um produto que já foi publicado.
 */

window.STORE_SETTINGS = Object.freeze({
    whatsapp: '5545999463821'
});

window.STORE_PRODUCTS = Object.freeze([
    // Carnes bovinas e ovinas
    { id: 'contra-file', name: 'Contra Filé', price: 70, unit: 'por kg', category: 'carnes', image: './assets/images/contra-file.png', description: 'Contra filé assado, macio e suculento.' },
    { id: 'alcatra', name: 'Alcatra', price: 65, unit: 'por kg', category: 'carnes', image: './assets/images/alcatra.jpg', description: 'Alcatra assada no ponto, com sabor marcante.' },
    { id: 't-bone', name: 'T-Bone', price: 70, unit: 'por kg', category: 'carnes', image: './assets/images/t-bone.jpeg', description: 'Corte com osso, preparado para manter a suculência.' },
    { id: 'assado-tiras', name: 'Assado de Tiras', price: 60, unit: 'por kg', category: 'carnes', image: './assets/images/assado-tiras.png', description: 'Tiras assadas na brasa, douradas e saborosas.' },
    { id: 'carne-picada', name: 'Carne Picada', price: 55, unit: 'por kg', category: 'carnes', image: './assets/images/carne-picada.webp', description: 'Carne assada e cortada em porções práticas.' },
    { id: 'fraldinha', name: 'Fraldinha', price: 65, unit: 'por kg', category: 'carnes', image: './assets/images/fraldinha.jpeg', description: 'Fraldinha assada, macia e cheia de sabor.' },
    { id: 'maminha', name: 'Maminha', price: 60, unit: 'por kg', category: 'carnes', image: './assets/images/maminha.webp', description: 'Maminha suculenta, assada lentamente.' },
    { id: 'costela-bovina', name: 'Costela Bovina', price: 55, unit: 'por kg', category: 'carnes', image: './assets/images/costela-bovina.jpg', description: 'Costela assada lentamente até ficar macia.' },
    { id: 'costela-ovelha', name: 'Costela de Ovelha', price: 65, unit: 'por kg', category: 'carnes', image: './assets/images/costela-ovelha.webp', description: 'Costela de ovelha assada, macia e de sabor especial.' },
    // Linguiças
    { id: 'linguica-brasa', name: 'Linguiça na Brasa', price: 3, unit: 'por unidade', category: 'linguicas', image: './assets/images/linguica-brasa.jpg', description: 'Linguiça dourada na brasa, vendida por unidade.' },
    { id: 'linguica-recheada', name: 'Linguiça Recheada', price: 3, unit: 'por unidade', category: 'linguicas', image: './assets/images/linguica-recheada.webp', description: 'Linguiça recheada e assada na brasa, vendida por unidade.' },
    { id: 'linguica-cuiabana', name: 'Linguiça Cuiabana', price: 25, unit: 'por unidade', category: 'linguicas', image: './assets/images/linguica-cuiabana.webp', description: 'Linguiça Cuiabana artesanal, suculenta e assada na brasa.' },
    { id: 'linguica-alho-poro', name: 'Linguiça de Alho-poró', price: 25, unit: 'por unidade', category: 'linguicas', image: './assets/images/linguica-alho-poro.webp', description: 'Linguiça artesanal com alho-poró, assada e dourada na brasa.' },
    { id: 'linguica-queijo-defumado', name: 'Linguiça de Queijo Defumado', price: 25, unit: 'por unidade', category: 'linguicas', image: './assets/images/linguica-queijo-defumado.webp', description: 'Linguiça recheada com queijo defumado, assada na brasa.' },
    { id: 'linguica-queijo-coalho', name: 'Linguiça de Queijo Coalho', price: 25, unit: 'por unidade', category: 'linguicas', image: './assets/images/linguica-queijo-coalho.webp', description: 'Linguiça recheada com queijo coalho, dourada na brasa.' },

    // Aves
    { id: 'frango-tradicional', name: 'Frango Assado Tradicional', price: 48, unit: 'por unidade', category: 'frango', image: './assets/images/frango-assado.png', description: 'Frango inteiro assado, temperado e dourado.' },
    { id: 'frango-farofa', name: 'Frango Recheado com Farofa', price: 53, unit: 'por unidade', category: 'frango', image: './assets/images/frango-farofa.jpg', description: 'Frango inteiro com recheio de farofa da casa.' },
    { id: 'pato-recheado', name: 'Pato Recheado', price: 70, unit: 'por unidade', category: 'frango', image: './assets/images/pato-recheado.webp', description: 'Pato recheado e assado, sob consulta de disponibilidade.' },
    { id: 'frango-mandioca-bacon', name: 'Frango Recheado com Mandioca e Bacon', price: 50, unit: 'por unidade', category: 'frango', image: './assets/images/frango-mandioca-bacon.webp', description: 'Frango inteiro com recheio de mandioca e bacon.' },
    { id: 'frango-especial', name: 'Frango Recheado Especial', price: 55, unit: 'por unidade', category: 'frango', image: './assets/images/frango-assado.png', description: 'Frango com recheio especial da 2 Irmãos.' },
    { id: 'coxa-sobrecoxa', name: 'Coxa Assada', price: 8, unit: 'por unidade', category: 'frango', image: './assets/images/coxa-assada.webp', description: 'Coxa de frango assada e dourada, vendida por unidade.' },
    { id: 'tulipinha-frango', name: 'Tulipa de Frango', price: 35, unit: 'por kg', category: 'frango', image: './assets/images/tulipa-frango.webp', description: 'Asinhas de frango temperadas e assadas, vendidas por quilo.' },
    { id: 'coxinha-asa', name: 'Coxinha da Asa', price: 35, unit: 'por kg', category: 'frango', image: './assets/images/coxinha-asa.webp', description: 'Coxinhas da asa assadas, vendidas por quilo.' },

    // Suínos
    { id: 'costela-suina', name: 'Costela Suína', price: 60, unit: 'por kg', category: 'porco', image: './assets/images/costela-suina.webp', description: 'Costela suína temperada e assada lentamente.' },
    { id: 'porco-paraguaia', name: 'Porco à Paraguaia', price: 55, unit: 'por kg', category: 'porco', image: './assets/images/porco-paraguaia.png', description: 'Porco assado à moda paraguaia, saboroso e crocante.' },
    { id: 'torresmo-rolo', name: 'Torresmo de Rolo (500 g)', price: 50, unit: 'por 500 g', category: 'porco', image: './assets/images/banner-torresmo.webp', description: 'Torresmo de rolo crocante, vendido em porção de 500 g.' },
    { id: 'paleta-suina', name: 'Paleta Suína', price: 45, unit: 'por kg', category: 'porco', image: './assets/images/paleta-suina.webp', description: 'Paleta suína assada, macia e bem temperada.' },

    // Acompanhamentos
    { id: 'maionese', name: 'Maionese de Batata ou Mandioca', price: 12, unit: 'por porção', category: 'acompanhamentos', image: './assets/images/maionese.webp', description: 'Maionese caseira: escolha batata ou mandioca.' },
    { id: 'maionese-defumada', name: 'Maionese Defumada', price: 12, unit: 'por porção', category: 'acompanhamentos', image: './assets/images/maionese-defumada.webp', description: 'Maionese cremosa com um sabor defumado especial.' },
    { id: 'farofa', name: 'Farofa da Casa', price: 8, unit: 'por porção', category: 'acompanhamentos', image: './assets/images/farofa.webp', description: 'Farofa tradicional para acompanhar seu assado.' },
    { id: 'arroz', name: 'Arroz Branco', price: 8, unit: 'por porção', category: 'acompanhamentos', image: './assets/images/arroz-branco.webp', description: 'Arroz branco soltinho, pronto para servir.' },
    { id: 'mandioca-bacon', name: 'Mandioca com Bacon', price: 10, unit: 'por porção', category: 'acompanhamentos', image: './assets/images/mandioca-bacon.webp', description: 'Mandioca preparada com bacon crocante.' },
    { id: 'pao-alho', name: 'Pão de Alho', price: 4, unit: 'por unidade', category: 'acompanhamentos', image: './assets/images/pao-alho.webp', description: 'Pão de alho assado, vendido por unidade.' },
    { id: 'abacaxi-assado', name: 'Abacaxi Assado', price: 15, unit: 'por unidade', category: 'acompanhamentos', image: './assets/images/abacaxi.jpg', description: 'Abacaxi assado com toque de especiarias.' }
]);
