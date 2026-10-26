'use strict';
const toggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeNavigation() {
  navigation.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu de navegação');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeNavigation(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNavigation(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', closeNavigation);
const categories = {
  classicos: {
    title: 'Clássicos da casa',
    description: 'Comida de verdade, com aquele tempero que dá vontade de voltar.',
    image: 'img/classicos.png',
    alt: 'Arroz, feijão, bife acebolado e batatas fritas',
    dishes: [
      ['Bife acebolado', 'Arroz soltinho, feijão, bife com cebolas douradas e batatas fritas.'],
      ['Frango da casa', 'Filé de frango grelhado com arroz, feijão e salada do dia.'],
      ['Prato da horta', 'Arroz, feijão e uma combinação de legumes salteados.']
    ]
  },
  leve: {
    title: 'Leve e fresquinho',
    description: 'Ingredientes frescos e combinações simples para uma refeição cheia de sabor.',
    image: 'img/leve.png',
    alt: 'Salada de folhas e legumes com frango grelhado',
    dishes: [
      ['Salada com frango', 'Mix de folhas, frango grelhado, tomate-cereja, pepino e cenoura.'],
      ['Salada da horta', 'Folhas frescas, legumes da estação e molho de ervas.'],
      ['Grelhado com legumes', 'Filé de frango acompanhado de legumes e arroz.']
    ]
  },
  compartilhar: {
    title: 'Para compartilhar',
    description: 'Puxe mais uma cadeira: esses sabores ficam ainda melhores em boa companhia.',
    image: 'img/compartilhar.png',
    alt: 'Petiscos dourados com molhos para compartilhar',
    dishes: [
      ['Porção de coxinhas', 'Coxinhas douradinhas, com recheio de frango e molho da casa.'],
      ['Bolinhos de queijo', 'Crocantes por fora, macios por dentro.'],
      ['Batatas da casa', 'Batatas fritas com molho de ervas para acompanhar.']
    ]
  }
};
const dialog = document.getElementById('menu-dialog');
document.querySelectorAll('[data-category]').forEach(button => {
  button.addEventListener('click', () => {
    const category = categories[button.dataset.category];
    document.getElementById('dialog-title').textContent = category.title;
    document.getElementById('dialog-description').textContent = category.description;
    const image = document.getElementById('dialog-image');
    image.src = category.image;
    image.alt = category.alt;
    const list = document.getElementById('dialog-dishes');
    list.replaceChildren(...category.dishes.map(([name, description]) => {
      const item = document.createElement('li');
      const title = document.createElement('strong');
      const detail = document.createElement('span');
      title.textContent = name;
      detail.textContent = description;
      item.append(title, detail);
      return item;
    }));
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
document.querySelectorAll('.dialog-close, .dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});

