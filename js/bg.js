(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  // Pixel size — everything snaps to this grid
  const PX = 4;

  // Pico-8 palette subset
  const COLORS = ['#29adff', '#ffec27', '#00e436', '#ff77a8', '#83769c', '#ff004d', '#ffa300'];

  function snap(v) { return Math.round(v / PX) * PX; }
  function rand(a, b) { return Math.random() * (b - a) + a; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  /* ── Stars ── */
  const STAR_COUNT = 80;
  const stars = [];

  function makeStar() {
    return {
      x:     snap(rand(0, W)),
      y:     snap(rand(0, H)),
      size:  pick([PX, PX, PX, PX * 2]),   // mostly 1px, rare 2px
      alpha: rand(0.2, 0.8),
      twinkleSpeed: rand(0.005, 0.02),
      twinkleDir: 1,
    };
  }

  /* ── Shooting stars ── */
  const shooters = [];

  function makeShooter() {
    return {
      x:     snap(rand(0, W)),
      y:     snap(rand(0, H * 0.6)),
      len:   Math.floor(rand(4, 10)),   // length in pixels
      speed: rand(3, 7),
      alpha: rand(0.5, 0.9),
      color: '#fff1e8',
      dead:  false,
    };
  }

  /* ── Floating pixel blocks (Tetris-like) ── */
  const BLOCK_SHAPES = [
    // I
    [[1,1,1,1]],
    // O
    [[1,1],[1,1]],
    // L
    [[1,0],[1,0],[1,1]],
    // T
    [[1,1,1],[0,1,0]],
    // S
    [[0,1,1],[1,1,0]],
    // single
    [[1]],
    [[1],[1]],
  ];

  const blocks = [];
  const BLOCK_COUNT = 28;
  const BLOCK_PX = 10;

  function makeBlock() {
    const shape = pick(BLOCK_SHAPES);
    return {
      x:     rand(0, W),
      y:     rand(-200, H + 200),
      shape,
      color: pick(COLORS),
      alpha: rand(0.18, 0.45),
      vy:    rand(0.5, 1.4),
      vx:    rand(-0.2, 0.2),
      rot:   rand(0, Math.PI * 2),
      rotSpeed: rand(-0.008, 0.008),
    };
  }

  /* ── Pixel rain columns ── */
  const RAIN_COLS = [];
  const RAIN_CHARS = '01アイウエオカキクケコサシスセソ';
  const RAIN_COUNT = 12;

  function makeRainCol() {
    return {
      x:      snap(rand(0, W)),
      y:      rand(-300, 0),
      speed:  rand(0.4, 1.2),
      len:    Math.floor(rand(5, 18)),
      chars:  Array.from({ length: 20 }, () => pick([...RAIN_CHARS])),
      alpha:  rand(0.04, 0.1),
      color:  pick(['#29adff', '#00e436', '#ffec27']),
      timer:  0,
      updateEvery: Math.floor(rand(8, 20)),
    };
  }

  /* ── Init ── */
  function init() {
    resize();
    stars.length = 0;
    shooters.length = 0;
    blocks.length = 0;
    RAIN_COLS.length = 0;

    for (let i = 0; i < STAR_COUNT; i++)    stars.push(makeStar());
    for (let i = 0; i < BLOCK_COUNT; i++)   blocks.push(makeBlock());
    for (let i = 0; i < RAIN_COUNT; i++)    RAIN_COLS.push(makeRainCol());

    // stagger initial shooter spawns
    setTimeout(() => shooters.push(makeShooter()), 800);
    setTimeout(() => shooters.push(makeShooter()), 2200);
  }

  /* ── Draw pixel rect ── */
  function px(x, y, w, h, color, alpha) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(snap(x), snap(y), w, h);
  }

  /* ── Frame ── */
  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* Stars */
    for (const s of stars) {
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha >= 0.85 || s.alpha <= 0.08) s.twinkleDir *= -1;
      px(s.x, s.y, s.size, s.size, '#fff1e8', s.alpha);
    }

    /* Shooting stars */
    for (let i = shooters.length - 1; i >= 0; i--) {
      const s = shooters[i];
      for (let t = 0; t < s.len; t++) {
        const fade = (s.len - t) / s.len;
        px(s.x - t * PX, s.y - t * PX, PX, PX, s.color, s.alpha * fade * fade);
      }
      s.x += s.speed;
      s.y += s.speed * 0.5;
      if (s.x > W + 100 || s.y > H + 100) {
        shooters.splice(i, 1);
        // spawn next one after a delay
        setTimeout(() => shooters.push(makeShooter()), rand(1500, 5000));
      }
    }

    /* Floating blocks */
    for (const b of blocks) {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.globalAlpha = b.alpha;
      for (let row = 0; row < b.shape.length; row++) {
        for (let col = 0; col < b.shape[row].length; col++) {
          if (b.shape[row][col]) {
            const bx = col * BLOCK_PX;
            const by = row * BLOCK_PX;
            // fill
            ctx.fillStyle = b.color;
            ctx.fillRect(bx, by, BLOCK_PX - 1, BLOCK_PX - 1);
            // highlight top/left edge
            ctx.fillStyle = 'rgba(255,255,255,0.35)';
            ctx.fillRect(bx, by, BLOCK_PX - 1, 2);
            ctx.fillRect(bx, by, 2, BLOCK_PX - 1);
            // shadow bottom/right edge
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.fillRect(bx, by + BLOCK_PX - 3, BLOCK_PX - 1, 2);
            ctx.fillRect(bx + BLOCK_PX - 3, by, 2, BLOCK_PX - 1);
          }
        }
      }
      ctx.restore();

      b.y += b.vy;
      b.x += b.vx;
      b.rot += b.rotSpeed;

      // wrap around
      if (b.y > H + 200)  b.y = -120;
      if (b.x < -100)     b.x = W + 100;
      if (b.x > W + 100)  b.x = -100;
    }

    /* Pixel rain */
    ctx.font = `bold ${PX * 2}px "Press Start 2P", monospace`;
    for (const col of RAIN_COLS) {
      col.timer++;
      if (col.timer >= col.updateEvery) {
        col.timer = 0;
        // shuffle one char
        const idx = Math.floor(rand(0, col.chars.length));
        col.chars[idx] = pick([...RAIN_CHARS]);
      }

      for (let i = 0; i < col.len; i++) {
        const charAlpha = col.alpha * ((col.len - i) / col.len);
        ctx.globalAlpha = charAlpha;
        ctx.fillStyle = col.color;
        ctx.fillText(
          col.chars[i % col.chars.length],
          snap(col.x),
          snap(col.y + i * (PX * 3))
        );
      }

      col.y += col.speed;
      if (col.y > H + col.len * PX * 3) {
        col.y = -col.len * PX * 3;
        col.x = snap(rand(0, W));
        col.speed = rand(0.4, 1.2);
        col.color = pick(['#29adff', '#00e436', '#ffec27']);
      }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  draw();
})();
