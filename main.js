const signos = [
  { nome: 'Áries', simbolo: '♈', datas: '21 mar — 19 abr', descricao: 'Signo de fogo associado à coragem, à espontaneidade e à iniciativa. Áries encontra inspiração ao abrir caminhos e abraçar novas experiências.', reflexao: 'Que primeiro passo você pode dar em algo que vem adiando?' },
  { nome: 'Touro', simbolo: '♉', datas: '20 abr — 20 mai', descricao: 'Signo de terra associado à estabilidade, à paciência e aos sentidos. Touro valoriza o conforto, a constância e os vínculos construídos com tempo.', reflexao: 'Reserve um momento para apreciar algo simples com calma.' },
  { nome: 'Gêmeos', simbolo: '♊', datas: '21 mai — 20 jun', descricao: 'Signo de ar associado à comunicação, à versatilidade e à curiosidade. Gêmeos se inspira em conversas e em novas maneiras de compreender o mundo.', reflexao: 'Qual assunto desperta sua curiosidade hoje?' },
  { nome: 'Câncer', simbolo: '♋', datas: '21 jun — 22 jul', descricao: 'Signo de água associado ao afeto, à memória e ao acolhimento. Câncer encontra significado nas conexões e nos espaços onde pode se sentir em casa.', reflexao: 'Pense em uma pequena forma de cuidar de você.' },
  { nome: 'Leão', simbolo: '♌', datas: '23 jul — 22 ago', descricao: 'Signo de fogo associado à criatividade, à generosidade e à expressão. Leão inspira a compartilhar talentos e a encontrar alegria na própria autenticidade.', reflexao: 'Dê espaço para uma atividade que permita expressar sua criatividade.' },
  { nome: 'Virgem', simbolo: '♍', datas: '23 ago — 22 set', descricao: 'Signo de terra associado ao cuidado, à observação e à organização. Virgem percebe detalhes e encontra satisfação ao tornar o cotidiano mais leve e funcional.', reflexao: 'Que pequeno ajuste pode deixar sua rotina mais acolhedora?' },
  { nome: 'Libra', simbolo: '♎', datas: '23 set — 22 out', descricao: 'Signo de ar associado à harmonia, ao diálogo e à beleza. Libra se interessa pelos encontros e pela possibilidade de considerar diferentes pontos de vista.', reflexao: 'Procure equilibrar o tempo que dedica aos outros e a si.' },
  { nome: 'Escorpião', simbolo: '♏', datas: '23 out — 21 nov', descricao: 'Signo de água associado à profundidade, à intensidade e à transformação. Escorpião convida a olhar para as emoções com honestidade e acolher mudanças.', reflexao: 'O que você gostaria de deixar para trás para abrir espaço ao novo?' },
  { nome: 'Sagitário', simbolo: '♐', datas: '22 nov — 21 dez', descricao: 'Signo de fogo associado à liberdade, ao entusiasmo e à descoberta. Sagitário busca horizontes e se inspira ao aprender com experiências diferentes.', reflexao: 'Experimente conhecer um lugar, uma ideia ou uma história nova.' },
  { nome: 'Capricórnio', simbolo: '♑', datas: '22 dez — 19 jan', descricao: 'Signo de terra associado à perseverança, à responsabilidade e à construção. Capricórnio valoriza o caminho percorrido e os projetos que amadurecem com dedicação.', reflexao: 'Reconheça uma conquista pequena antes de pensar no próximo objetivo.' },
  { nome: 'Aquário', simbolo: '♒', datas: '20 jan — 18 fev', descricao: 'Signo de ar associado à originalidade, à independência e ao coletivo. Aquário explora possibilidades e se interessa por ideias que ampliam a vida em comunidade.', reflexao: 'Como uma ideia sua poderia contribuir com as pessoas ao redor?' },
  { nome: 'Peixes', simbolo: '♓', datas: '19 fev — 20 mar', descricao: 'Signo de água associado à empatia, à imaginação e à sensibilidade. Peixes encontra inspiração na arte, nos sonhos e nas sutilezas do cotidiano.', reflexao: 'Faça uma pausa e dê espaço à música, à arte ou à imaginação.' }
];

const grid = document.querySelector('#signos-grid');
const dialog = document.querySelector('#signo-dialog');
signos.forEach((signo) => {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'sign-card';
  card.setAttribute('aria-label', `Conhecer ${signo.nome}`);
  card.setAttribute('aria-haspopup', 'dialog');
  card.innerHTML = `<span class="sign-symbol" aria-hidden="true">${signo.simbolo}</span><h3>${signo.nome}</h3><small>${signo.datas}</small>`;
  card.addEventListener('click', () => {
    document.querySelector('#dialog-symbol').textContent = signo.simbolo;
    document.querySelector('#dialog-dates').textContent = signo.datas;
    document.querySelector('#dialog-name').textContent = signo.nome;
    document.querySelector('#dialog-description').textContent = signo.descricao;
    document.querySelector('#dialog-reflection').textContent = signo.reflexao;
    dialog.showModal();
  });
  grid.append(card);
});
dialog.setAttribute('aria-labelledby', 'dialog-name');
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const search = document.querySelector('#pesquisa');
search.addEventListener('input', () => {
  const query = normalize(search.value.trim());
  let count = 0;
  [...grid.children].forEach((card, index) => {
    const matches = normalize(signos[index].nome).includes(query);
    card.hidden = !matches;
    if (matches) count++;
  });
  document.querySelector('#resultado-pesquisa').textContent = !query ? '' : count ? `${count} ${count === 1 ? 'signo encontrado' : 'signos encontrados'}.` : 'Nenhum signo encontrado. Tente outro nome.';
});
document.querySelector('.search').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#signos').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
});

const carousel = document.querySelector('.carousel');
const slides = [...document.querySelectorAll('.slide')];
const indicators = [...document.querySelectorAll('.indicator')];
const pauseButton = document.querySelector('#pausar');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let current = 0;
let paused = reducedMotion.matches;
let timer;
let hovering = false;

function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.hidden = i !== current;
    slide.classList.toggle('active', i === current);
    indicators[i].classList.toggle('active', i === current);
    if (i === current) indicators[i].setAttribute('aria-current', 'true');
    else indicators[i].removeAttribute('aria-current');
  });
  document.querySelector('#slide-count').textContent = `0${current + 1} / 0${slides.length}`;
}
function syncTimer() {
  clearInterval(timer);
  if (!paused && !hovering && !document.hidden && !carousel.contains(document.activeElement)) timer = setInterval(() => showSlide(current + 1), 6500);
  pauseButton.textContent = paused ? '▷' : 'Ⅱ';
  pauseButton.setAttribute('aria-label', paused ? 'Reproduzir carrossel' : 'Pausar carrossel');
  carousel.setAttribute('aria-live', paused ? 'polite' : 'off');
}
function navigate(index) { showSlide(index); syncTimer(); }
document.querySelector('#anterior').addEventListener('click', () => navigate(current - 1));
document.querySelector('#proximo').addEventListener('click', () => navigate(current + 1));
indicators.forEach((button, i) => button.addEventListener('click', () => navigate(i)));
pauseButton.addEventListener('click', () => { paused = !paused; syncTimer(); });
carousel.addEventListener('mouseenter', () => { hovering = true; syncTimer(); });
carousel.addEventListener('mouseleave', () => { hovering = false; syncTimer(); });
carousel.addEventListener('focusin', syncTimer);
carousel.addEventListener('focusout', () => setTimeout(syncTimer, 0));
carousel.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    navigate(current + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
document.addEventListener('visibilitychange', syncTimer);
reducedMotion.addEventListener('change', (event) => { paused = event.matches; syncTimer(); });
syncTimer();
