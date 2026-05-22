(function () {
  const STAGES = {
    milua: {
      title: 'MILUA.DAT',
      num: 'STAGE 01',
      name: 'MiLua',
      lang: 'VALA',
      langClass: 'lang-vala',
      stars: '★★★★☆',
      desc: 'A LIGHTWEIGHT LUA IDE BUILT WITH GTK4 AND ADWAITA. DESIGNED TO BE FAST, MINIMAL, AND FOCUSED — A PROPER TOOL FOR LUA DEVELOPMENT ON LINUX.',
      details: [
        '► SYNTAX HIGHLIGHTING VIA GTKSOURCEVIEW',
        '► PROJECT FILE TREE MANAGEMENT',
        '► INTEGRATED TERMINAL OUTPUT',
        '► CLEAN ADWAITA UI WITH DARK THEME',
        '► 34 GITHUB STARS — MOST STARRED PROJECT',
      ],
      link: 'https://github.com/milos-mkv/MiLua',
    },
    katia: {
      title: 'KATIA.DAT',
      num: 'STAGE 02',
      name: 'Katia Game Engine',
      lang: 'JAVA',
      langClass: 'lang-java',
      stars: '★★★☆☆',
      desc: 'A 2D GAME ENGINE BUILT FROM SCRATCH IN JAVA USING OPENGL FOR RENDERING. CREATED TO DEEPLY UNDERSTAND ENGINE ARCHITECTURE, SCENE GRAPHS, AND REAL-TIME GRAPHICS PIPELINES.',
      details: [
        '► OPENGL RENDERER WITH SPRITE BATCHING',
        '► SCENE/ENTITY COMPONENT SYSTEM',
        '► CUSTOM INPUT MANAGER',
        '► TEXTURE AND ASSET LOADING PIPELINE',
        '► BUILT FROM SCRATCH — ZERO FRAMEWORKS',
      ],
      link: 'https://github.com/milos-mkv/Katia-Game-Engine',
    },
    ghoul: {
      title: 'GHOUL.DAT',
      num: 'STAGE 03',
      name: 'Ghoul Slayer',
      lang: 'JAVA',
      langClass: 'lang-java',
      stars: '★★★☆☆',
      desc: 'A 3D FIRST-PERSON SHOOTER BUILT WITH LIBGDX. FOCUSES ON REAL-TIME 3D RENDERING, ENEMY AI BEHAVIOR, AND FIRST-PERSON CONTROLS.',
      details: [
        '► 3D RENDERING WITH LIBGDX + OPENGL',
        '► FIRST-PERSON CAMERA SYSTEM',
        '► BASIC ENEMY AI WITH PATHFINDING',
        '► COLLISION DETECTION AND PHYSICS',
        '► LEVEL LOADING FROM CUSTOM FORMAT',
      ],
      link: 'https://github.com/milos-mkv/Ghoul-Slayer',
    },
    minisharp: {
      title: 'MINI_SHARP.DAT',
      num: 'STAGE 04',
      name: 'Mini-Sharp',
      lang: 'C#',
      langClass: 'lang-cs',
      stars: '★★★☆☆',
      desc: 'A SCRIPTING LANGUAGE INSPIRED BY C# WITH A COMPILER AND INTERPRETER WRITTEN IN C#. SUPPORTS BASIC TYPES, CONTROL FLOW, FUNCTIONS, AND EXPRESSIONS.',
      details: [
        '► HAND-WRITTEN LEXER AND PARSER',
        '► AST-BASED INTERPRETER',
        '► SUPPORT FOR FUNCTIONS AND CLOSURES',
        '► TYPED VARIABLES AND EXPRESSIONS',
        '► BUILT TO LEARN COMPILER THEORY',
      ],
      link: 'https://github.com/milos-mkv/Mini-Sharp',
    },
    ftn: {
      title: 'FTN_16_2017.DAT',
      num: 'STAGE 05',
      name: 'FTN-16-2017',
      lang: 'JAVA',
      langClass: 'lang-java',
      stars: '★★★☆☆',
      desc: '3D GRAPHICS COURSEWORK COLLECTION FROM THE FACULTY OF TECHNICAL SCIENCES. COVERS CORE OPENGL CONCEPTS THROUGH PROGRESSIVE ASSIGNMENTS.',
      details: [
        '► 3D TRANSFORMATIONS AND PROJECTIONS',
        '► PHONG AND BLINN SHADING MODELS',
        '► TEXTURE MAPPING AND UV COORDINATES',
        '► DEAR IMGUI FOR RUNTIME CONTROLS',
        '► 16 PROGRESSIVE ASSIGNMENT LEVELS',
      ],
      link: 'https://github.com/milos-mkv/FTN-16-2017',
    },
    hackide: {
      title: 'HACK_IDE.DAT',
      num: 'STAGE 06',
      name: 'Hack IDE',
      lang: 'PYTHON',
      langClass: 'lang-python',
      stars: '★★☆☆☆',
      desc: 'A SIMPLE IDE FOR THE HACK ASSEMBLY LANGUAGE (NAND2TETRIS). SUPPORTS SYNTAX HIGHLIGHTING, CODE EDITING, AND DIRECT PROGRAM EXECUTION.',
      details: [
        '► BUILT WITH PYTHON AND TKINTER',
        '► HACK ASSEMBLY SYNTAX HIGHLIGHTING',
        '► INTEGRATED ASSEMBLER AND RUNNER',
        '► NAND2TETRIS COMPATIBLE OUTPUT',
      ],
      link: 'https://github.com/milos-mkv/Hack-IDE',
    },
    tetris: {
      title: 'MISAKA_TETRIS.DAT',
      num: 'STAGE 07',
      name: 'Misaka Tetris',
      lang: 'PYTHON',
      langClass: 'lang-python',
      stars: '★★☆☆☆',
      desc: 'A CLASSIC TETRIS CLONE BUILT WITH PYGAME. SMOOTH CONTROLS, LINE-CLEAR SCORING, AND INCREASING DIFFICULTY LEVELS.',
      details: [
        '► PYGAME RENDERING LOOP',
        '► ALL 7 TETROMINO SHAPES',
        '► LINE CLEAR WITH SCORE MULTIPLIER',
        '► INCREASING SPEED PER LEVEL',
        '► NAMED AFTER MISAKA MIKOTO',
      ],
      link: 'https://github.com/milos-mkv/Misaka-Tetris',
    },
    neural: {
      title: 'NEURAL_NET.DAT',
      num: 'STAGE 08',
      name: 'Misaka Neural Net',
      lang: 'C++',
      langClass: 'lang-cpp',
      stars: '★★★☆☆',
      desc: 'A SINGLE-HEADER C++ NEURAL NETWORK LIBRARY. LIGHTWEIGHT AND ZERO-DEPENDENCY — DROP IT IN AND USE IT. BUILT TO UNDERSTAND BACKPROPAGATION FROM SCRATCH.',
      details: [
        '► SINGLE HEADER FILE — ZERO DEPENDENCIES',
        '► CONFIGURABLE LAYER ARCHITECTURE',
        '► BACKPROPAGATION TRAINING LOOP',
        '► SUPPORTS SIGMOID, RELU ACTIVATIONS',
        '► SERIALIZATION FOR SAVING WEIGHTS',
      ],
      link: 'https://github.com/milos-mkv/Misaka-Neural-Network',
    },
  };

  const overlay = document.getElementById('modal-overlay');
  const box     = document.getElementById('modal-box');
  const closeBtn = document.getElementById('modal-close');

  function openModal(id) {
    const data = STAGES[id];
    if (!data) return;

    document.getElementById('modal-title').textContent  = data.title;
    document.getElementById('modal-num').textContent    = data.num;
    document.getElementById('modal-stars').textContent  = data.stars;
    document.getElementById('modal-desc').textContent   = data.desc;

    const langEl = document.getElementById('modal-lang');
    langEl.textContent  = data.lang;
    langEl.className    = 'stage-lang ' + data.langClass;

    const detailsEl = document.getElementById('modal-details');
    detailsEl.innerHTML = data.details.map(d => `<div class="modal-detail-row">${d}</div>`).join('');

    document.getElementById('modal-link').href = data.link;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Attach click handlers to stage cards
  document.querySelectorAll('.stage[data-modal]').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.modal));
  });

  closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeModal(); });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();
