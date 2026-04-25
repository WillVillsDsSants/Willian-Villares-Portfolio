  /* cursor removed */

  /* NAVBAR */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll',()=>{
    navbar.classList.toggle('scrolled', window.scrollY>50);
    const hero = document.getElementById('home') || document.querySelector('section');
    const heroH = hero ? hero.offsetHeight : window.innerHeight;
    document.getElementById('scroll-top').classList.toggle('visible', window.scrollY > heroH);
  });

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const el=document.getElementById(a.getAttribute('href').slice(1));
      if(el){ e.preventDefault(); window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-75,behavior:'smooth'}); }
      closeMobile();
    });
  });

  /* SCROLL TOP */
  document.getElementById('scroll-top').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  /* LOADER */
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.classList.add('site-ready');
  }, 2000);

  /* MOBILE MENU */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobCloseBtn = document.getElementById('mob-close-btn');
  function closeMobile(){
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click',()=>{
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  if(mobCloseBtn) mobCloseBtn.addEventListener('click', closeMobile);
  document.querySelectorAll('.mobile-link').forEach(l=>l.addEventListener('click',()=>{
    closeMobile();
    setTimeout(()=>{ const el=document.getElementById(l.getAttribute('href').slice(1)); if(el) window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-75,behavior:'smooth'}); },300);
  }));
  mobileMenu.addEventListener('click', e=>{ if(e.target===mobileMenu) closeMobile(); });

  /* PHOTOGRAPHY */
  const WILLIAN=[
    {title:'Vigília',location:'Bauru, SP',imageUrl:'assets/photos/vigilia.jpg'},
    {title:'Entre Folhas',location:'Bauru, SP',imageUrl:'assets/photos/entre-folhas.jpg'},
    {title:'Entre Luzes',location:'Bauru, SP',imageUrl:'assets/photos/entre-luzes.jpg'},
    {title:'Instante',location:'Bauru, SP',imageUrl:'assets/photos/instante.jpg'}
  ];
  const PELASRUAS=[
    {title:'Calçada de Ouro',location:'Bauru, SP',imageUrl:'assets/photos/calcada-de-ouro.jpg'},
    {title:'Ponto Vazio',location:'Bauru, SP',imageUrl:'assets/photos/ponto-vazio.jpg'},
    {title:'Rente ao Chão',location:'Bauru, SP',imageUrl:'assets/photos/rente-ao-chao.jpg'},
    {title:'Sinal',location:'Bauru, SP',imageUrl:'assets/photos/sinal.jpg'}
  ];
  const DESCS={
    willian:['Fotografar é o meu modo de enxergar o que passa rápido demais. A rua, a luz que sobra no fim do dia, o detalhe que ninguém parou para olhar.','Cada imagem nasce de uma pausa. Um gato que observa em silêncio, a folhagem que filtra a luz como se escondesse o céu, o instante exato em que o cotidiano vira poesia.'],
    pelasruas:['Pelas Ruas nasceu de uma amizade e de câmeras apontadas para o mesmo cotidiano. Junto com Luiz, saímos pelas ruas de Bauru registrando o que a pressa normalmente ignora.',"O projeto foi desenvolvido por Thays Henriques e reúne dois olhares sobre a mesma cidade: pores do sol que douram a calçada, noites que escondem mais do que revelam e instantes que só existem uma vez."]
  };
  const LINKS={
    willian:{href:'https://wvillares-photography.vercel.app/',label:'Ver Portfólio Completo'},
    pelasruas:{href:'https://pelasruas.netlify.app/',label:'Ver Pelas Ruas'}
  };

  const photosGrid=document.getElementById('photos-grid');
  const photoDesc=document.getElementById('photo-desc');
  const photoLink=document.getElementById('photo-ext-link');
  let activePortfolio='willian';

  function renderPhotos(key){
    const photos=key==='willian'?WILLIAN:PELASRUAS;
    photosGrid.innerHTML=photos.map(p=>`<div class="photo-item"><img src="${p.imageUrl}" alt="${p.title}" loading="lazy"/><div class="photo-caption"><span class="photo-loc">${p.location}</span><h4 class="photo-name">${p.title}</h4></div></div>`).join('');
  }
  function switchPortfolio(key){
    if(key===activePortfolio)return;
    activePortfolio=key;
    const FADE_OUT = 400;
    const FADE_IN  = 500;
    // Fade everything out
    [photoDesc, photosGrid, photoLink].forEach(el=>{
      el.style.transition = `opacity ${FADE_OUT}ms ease`;
      el.style.opacity = '0';
    });
    // Tabs fade
    document.querySelectorAll('.photo-tab').forEach(t=>{
      t.style.transition = 'color .4s, opacity .4s';
    });
    setTimeout(()=>{
      // Swap content
      photoDesc.innerHTML=DESCS[key].map(t=>`<p>${t}</p>`).join('');
      photoLink.href=LINKS[key].href;
      photoLink.childNodes[0].textContent=LINKS[key].label+' ';
      const devCredit=document.getElementById('photo-dev-credit');
      if(devCredit) devCredit.style.display=key==='pelasruas'?'block':'none';
      renderPhotos(key);
      // Update active tab
      document.querySelectorAll('.photo-tab').forEach(t=>t.classList.toggle('active',t.dataset.portfolio===key));
      // Fade everything back in
      [photoDesc, photosGrid, photoLink].forEach(el=>{
        el.style.transition = `opacity ${FADE_IN}ms ease`;
        el.style.opacity = '1';
      });
    }, FADE_OUT);
  }
  document.querySelectorAll('.photo-tab').forEach(tab=>tab.addEventListener('click',()=>switchPortfolio(tab.dataset.portfolio)));
  renderPhotos('willian');

  /* SCROLL REVEAL */
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
  },{threshold:.1,rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

    /* FOOTER YEAR */
  document.getElementById('footer-copy').textContent = '\u00a9 ' + new Date().getFullYear() + ' Willian Villares';
  // Email obfuscado — protegido contra bots/scrapers
  (function(){const u=['W','i','l','l','.','V','i','l','l','s','.','D','s','.','S','a','n','t','s'];const d=['h','o','t','m','a','i','l','.','c','o','m'];const e=u.join('')+'@'+d.join('');const a=document.getElementById('contact-email-link');if(a){a.href='mailto:'+e;}})();

  /* PROJECT MODAL DATA */
  const PROJECTS = {
    logistico: {
      eyebrow: 'Data Analytics · Supply Chain',
      title: 'Control Tower · Dashboards Logísticos',
      tags: ['SQL', 'BigQuery', 'Looker Studio', 'KPIs', 'Supply Chain'],
      desc1: 'Ecossistema de monitoramento operacional constru\u00eddo ao longo do tempo para cobrir toda a opera\u00e7\u00e3o log\u00edstica em tempo real. Perdas, avarias, erros de triagem, backlogs, invers\u00f5es, atrasos de ve\u00edculos e produ\u00e7\u00e3o hora a hora reunidos em um \u00fanico ambiente visual, atualizado automaticamente.',
      desc2: 'Cada painel conecta fontes de dados via SQL e BigQuery sem depend\u00eancia de planilhas ou interven\u00e7\u00e3o manual. O resultado \u00e9 uma vis\u00e3o completa e precisa da opera\u00e7\u00e3o que permite decis\u00f5es mais r\u00e1pidas, identifica\u00e7\u00e3o imediata de desvios e acompanhamento de KPIs cr\u00edticos com clareza.',
      meta: [
        { label: 'Ferramentas', val: 'SQL, BigQuery, Looker Studio, KPIs.' },
        { label: 'Resultado', val: 'Vis\u00e3o operacional completa em tempo real, com atualiza\u00e7\u00e3o aut\u00f4noma, elimina\u00e7\u00e3o de planilhas manuais e tomada de decis\u00e3o centralizada em um \u00fanico painel.' }
      ],
      images: [
        'assets/projects/logistico-modal-1.jpg',
        'assets/projects/logistico-modal-2.jpg',
        'assets/projects/logistico-modal-3.jpg'
      ]
    },
    identidade: {
      eyebrow: 'Automa\u00e7\u00e3o \u00b7 Dados',
      title: 'Fechamento de Turno Automatizado',
      tags: ['Google Studio AI', 'SQL', 'IA', 'PDF', 'Data Integration'],
      desc1: 'Relat\u00f3rios operacionais gerados e enviados automaticamente por e-mail ao fim de cada turno, consolidando resultados, ofensores e pontos de melhoria para o dia seguinte, tudo no formato PDF, direto para a caixa da equipe.',
      desc2: 'A automa\u00e7\u00e3o eliminou o trabalho manual de compila\u00e7\u00e3o e distribui\u00e7\u00e3o. Com dados integrados via SQL e an\u00e1lise assistida por IA, cada relat\u00f3rio entrega um detalhamento preciso do que aconteceu na opera\u00e7\u00e3o e o que precisa ser ajustado.',
      meta: [
        { label: 'Ferramentas', val: 'Google Studio AI, SQL, IA, PDF.' },
        { label: 'Resultado', val: 'Fechamento di\u00e1rio automatizado: relat\u00f3rios completos entregues no e-mail da equipe ao fim de cada turno, com zero interven\u00e7\u00e3o manual e dados 100% integrados.' }
      ],
      images: [
        'assets/projects/identidade-modal-1.jpg',
        'assets/projects/identidade-modal-2.jpg',
        'assets/projects/identidade-modal-3.jpg'
      ]
    },
    relatorio: {
      eyebrow: 'UI · UX · Identidade Visual',
      title: 'Identidade Visual e Rebranding Operacional',
      tags: ['Figma', 'UI', 'UX', 'Identidade Visual', 'Branding'],
      desc1: 'Cria\u00e7\u00e3o da identidade visual dos dashboards operacionais e, posteriormente, o rebranding completo de todo o ecossistema. O projeto partiu de uma pergunta simples: como fazer o dado contar uma hist\u00f3ria?',
      desc2: 'A resposta veio em forma de sistema: tipografia, hierarquia visual, paleta de cores e componentes pensados para garantir clareza m\u00e1xima na leitura dos dados. Cada detalhe foi desenhado para que qualquer operador, em qualquer turno, compreendesse o painel em segundos, sem nenhuma curva de aprendizado.',
      meta: [
        { label: 'Ferramentas', val: 'Figma, UI, UX, Identidade Visual, Branding.' },
        { label: 'Resultado', val: 'Ecossistema de dashboards com identidade visual coesa e consistente, dados leg\u00edveis \u00e0 primeira vista e uma linguagem visual que comunica com clareza para toda a equipe operacional.' }
      ],
      images: [
        'assets/projects/relatorio-modal-1.jpg',
        'assets/projects/relatorio-modal-2.jpg',
        'assets/projects/relatorio-modal-3.jpg'
      ]
    },
    'layout-maker': {
      eyebrow: 'Produto · Web App',
      title: 'Villares | Layout Maker',
      tags: ['Web App', 'JSON', 'Multi-idioma', 'pt-BR / EN / ES'],
      desc1: 'Aplicação web para planejamento e gestão de layouts físicos em tempo real, reunindo criação, edição e visualização em um único ambiente visual. Suporte a 3 idiomas, múltiplos modos de ambiente e construção intuitiva dos layouts.',
      desc2: 'Permite exportação em JSON e JPG, além de modo apresentação integrado para compartilhamento e leitura clara dos projetos. O resultado é uma solução completa que centraliza a criação de layouts, garantindo autonomia, precisão e agilidade no uso.',
      meta: [
        { label: 'Tecnologias', val: 'Web App, JSON.' },
        { label: 'Acesso', val: 'Disponível online em villares-layout-maker.vercel.app' }
      ],
      images: [
        'assets/projects/layout-maker-1.jpg',
        'assets/projects/layout-maker-2.jpg',
        'assets/projects/layout-maker-3.jpg'
      ],
      link: 'https://villares-layout-maker.vercel.app/'
    }
  };

  /* MODAL LOGIC */
  const modalOverlay = document.getElementById('project-modal');
  const modalClose   = document.getElementById('modal-close');

  function openModal(key) {
    const p = PROJECTS[key];
    if (!p) return;

    // images
    document.getElementById('modal-images').innerHTML = `
      <div class="modal-img-main"><img src="${p.images[0]}" alt="${p.title}" /></div>
      <div class="modal-img-side"><img src="${p.images[1]}" alt="${p.title}" /></div>
      <div class="modal-img-side"><img src="${p.images[2]}" alt="${p.title}" /></div>
    `;
    // text
    document.getElementById('modal-eyebrow').textContent = p.eyebrow;
    document.getElementById('modal-title').textContent   = p.title;
    document.getElementById('modal-tags').innerHTML      = p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
    document.getElementById('modal-desc1').textContent   = p.desc1;
    document.getElementById('modal-desc2').textContent   = p.desc2;
    document.getElementById('modal-meta').innerHTML      = p.meta.map(m =>
      `<div class="modal-meta-row"><span class="modal-meta-label">${m.label}</span><span class="modal-meta-val">${m.val}</span></div>`
    ).join('');
    // Show/hide desc2 if empty
    const d2 = document.getElementById('modal-desc2');
    d2.style.display = p.desc2 ? 'block' : 'none';
    // live link CTA
    const existingLink = document.getElementById('modal-live-link');
    if (existingLink) existingLink.remove();
    if (p.link) {
      const liveBtn = document.createElement('a');
      liveBtn.id = 'modal-live-link';
      liveBtn.href = p.link;
      liveBtn.target = '_blank';
      liveBtn.rel = 'noopener noreferrer';
      liveBtn.className = 'modal-live-btn';
      liveBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>Ver site ao vivo';
      document.getElementById('modal-meta').appendChild(liveBtn);
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  document.querySelectorAll('[data-project]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      openModal(link.dataset.project);
    });
  });

  /* ── ALL PROJECTS MODAL ── */
  const ALL_PROJECTS = [
    {
      key: 'logistico',
      num: '01',
      cat: 'Data Analytics · Supply Chain',
      name: 'Control Tower · Dashboards Logísticos',
      desc: 'Ecossistema de monitoramento operacional cobrindo toda a operação logística em tempo real — perdas, avarias, backlogs, inversões, atrasos de veículos e produção hora a hora, atualizado automaticamente via SQL e BigQuery.',
      tags: ['SQL', 'BigQuery', 'Looker Studio', 'KPIs', 'Supply Chain'],
      year: '2025 – 2026'
    },
    {
      key: 'layout-maker',
      num: '02',
      cat: 'Produto · Web App',
      name: 'Villares | Layout Maker',
      desc: 'Desenvolvi do zero uma ferramenta web para planejar layouts de espaços físicos — 3 idiomas, 3 modos de ambiente e exportação em JSON para uso imediato.',
      tags: ['Web App', 'JSON', 'Multi-idioma'],
      year: '2026'
    },
    {
      key: 'identidade',
      num: '03',
      cat: 'Automação · Dados',
      name: 'Fechamento de Turno Automatizado',
      desc: 'Fechamento de turno gerado automaticamente: resultados, ofensores e pontos de melhoria consolidados em PDF e enviados por e-mail para toda a equipe sem nenhuma intervenção manual.',
      tags: ['Google Studio AI', 'SQL', 'Automação'],
      year: '2025 – 2026'
    },
    {
      key: 'relatorio',
      num: '04',
      cat: 'UI · UX · Identidade Visual',
      name: 'Identidade Visual e Rebranding Operacional',
      desc: 'Do conceito ao rebranding completo: uma linguagem visual construída para que qualquer operador leia os dados com clareza, em qualquer turno. Design aplicado a dashboards, relatórios e materiais internos.',
      tags: ['UI Design', 'UX', 'Branding', 'Figma'],
      year: '2025 – 2026'
    }
  ];

  const apmModal   = document.getElementById('all-projects-modal');
  const apmClose   = document.getElementById('apm-close');
  const apmList    = document.getElementById('apm-list');
  const btnVerTodos = document.getElementById('btn-ver-todos');

  // Build list
  ALL_PROJECTS.forEach(p => {
    const item = document.createElement('div');
    item.className = 'apm-item';
    item.innerHTML = `
      <span class="apm-num">${p.num}</span>
      <div class="apm-body">
        <p class="apm-cat">${p.cat}</p>
        <h3 class="apm-name">${p.name}</h3>
        <p class="apm-desc">${p.desc}</p>
        <div class="apm-tags">${p.tags.map(t=>`<span class="apm-tag">${t}</span>`).join('')}</div>
      </div>
      <div class="apm-right">
        <span class="apm-year">${p.year}</span>
        <div class="apm-arrow">
          <svg viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M7 7h10v10"/></svg>
        </div>
      </div>`;
    item.addEventListener('click', () => {
      apmModal.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => openModal(p.key), 300);
    });
    apmList.appendChild(item);
  });

  function openAllProjects() {
    apmModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeAllProjects() {
    apmModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (btnVerTodos) btnVerTodos.addEventListener('click', openAllProjects);
  apmClose.addEventListener('click', closeAllProjects);
  apmModal.addEventListener('click', e => { if (e.target === apmModal) closeAllProjects(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && apmModal.classList.contains('open')) closeAllProjects(); });

