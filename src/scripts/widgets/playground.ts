import { GameLoop, init } from 'kontra';
import { RallyGame, MemoryGame, ReactionGame } from '../../lib/playground';

export function setupPlayground(root: HTMLElement) {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-game-tab]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-game-panel]'));
  const canvas = root.querySelector<HTMLCanvasElement>('[data-rally-canvas]')!;
  const rallyAction = root.querySelector<HTMLButtonElement>('[data-rally-action]')!;
  const rallyScore = root.querySelector<HTMLElement>('[data-rally-score]')!;
  const rallyStatus = root.querySelector<HTMLElement>('[data-rally-status]')!;
  const calm = root.querySelector<HTMLInputElement>('[data-calm-mode]')!;
  const reactionAction = root.querySelector<HTMLButtonElement>('[data-reaction-action]')!;
  const reactionScore = root.querySelector<HTMLElement>('[data-reaction-score]')!;
  const reactionStatus = root.querySelector<HTMLElement>('[data-reaction-status]')!;
  const lights = root.querySelector<HTMLElement>('[data-reaction-lights]')!;
  const reactionStage = root.querySelector<HTMLElement>('[data-reaction-stage]')!;
  const cards = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-memory-card]'));
  const memoryReset = root.querySelector<HTMLButtonElement>('[data-memory-reset]')!;
  const memoryStatus = root.querySelector<HTMLElement>('[data-memory-status]')!;
  const rally = new RallyGame();
  const reaction = new ReactionGame();
  let memory = new MemoryGame();
  let active = 'badminton';
  let signalTimer: ReturnType<typeof setTimeout> | undefined;
  let memoryTimer: ReturnType<typeof setTimeout> | undefined;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  calm.checked = reduce.matches;
  let context: CanvasRenderingContext2D | null = null;
  try {
    context = init(canvas).context;
  } catch {
    rallyStatus.textContent =
      'This browser cannot display the rally track. The other games remain available.';
  }
  let colors = { surface: '#dcf3d7', ink: '#17482c', accent: '#269b43', stroke: '#cbd8c9' };
  const readColors = () => {
    const style = getComputedStyle(root);
    colors = {
      surface: style.getPropertyValue('--weather-surface-soft').trim(),
      ink: style.getPropertyValue('--weather-primary-ink').trim(),
      accent: style.getPropertyValue('--weather-primary').trim(),
      stroke: style.getPropertyValue('--weather-stroke').trim(),
    };
  };
  const draw = () => {
    if (!context) return;
    const ctx = context;
    const w = canvas.width,
      h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = colors.accent;
    ctx.globalAlpha = 0.2;
    ctx.fillRect(w * 0.4, 14, w * 0.2, h - 28);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = colors.ink;
    ctx.strokeRect(w * 0.4 + 0.5, 14.5, w * 0.2 - 1, h - 29);
    ctx.setLineDash([3, 5]);
    ctx.beginPath();
    ctx.moveTo(12, h / 2);
    ctx.lineTo(w - 12, h / 2);
    ctx.stroke();
    ctx.setLineDash([]);
    const x = w * (rally.running ? rally.x : 0.15);
    ctx.fillStyle = colors.ink;
    ctx.beginPath();
    ctx.arc(x, h / 2, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = colors.ink;
    ctx.lineWidth = 2;
    for (let offset = -1; offset <= 1; offset++) {
      ctx.beginPath();
      ctx.moveTo(x + 4, h / 2);
      ctx.lineTo(x + 16, h / 2 + offset * 9);
      ctx.stroke();
    }
    ctx.font = '10px sans-serif';
    ctx.fillText(calm.checked ? 'Calm practice' : 'Hit zone', w * 0.4 + 7, h - 5);
  };
  const refreshRally = () => {
    rallyAction.textContent = rally.running ? 'Hit!' : 'Start rally';
    rallyScore.textContent = `${rally.hits} ${rally.hits === 1 ? 'hit' : 'hits'} · best ${rally.best}`;
  };
  let loop: ReturnType<typeof GameLoop> | null = null;
  if (context)
    loop = GameLoop({
      context,
      fps: 30,
      blur: true,
      update(dt: number) {
        rally.tick(dt);
        if (!rally.running) {
          loop?.stop();
          refreshRally();
          rallyStatus.textContent = 'Missed the zone. Start another rally.';
        }
      },
      render: draw,
    });
  rallyAction.disabled = !context;
  reactionAction.disabled = false;
  memoryReset.disabled = false;

  rallyAction.addEventListener('click', () => {
    if (!rally.running) {
      rally.start(calm.checked);
      refreshRally();
      rallyStatus.textContent = calm.checked
        ? 'Calm practice: each press returns the shuttle.'
        : 'Press Hit when the shuttle crosses the marked zone.';
      if (!calm.checked) loop?.start();
    } else {
      const success = rally.hit();
      refreshRally();
      rallyStatus.textContent = success
        ? `${rally.hits} successful returns.`
        : 'Outside the zone. Try another rally.';
      if (!rally.running) loop?.stop();
    }
    draw();
  });
  const stopRally = () => {
    loop?.stop();
    rally.stop();
    refreshRally();
    draw();
  };
  calm.addEventListener('change', stopRally);
  reduce.addEventListener('change', () => {
    calm.checked = reduce.matches;
    stopRally();
  });
  reactionAction.addEventListener('click', () => {
    if (reaction.state === 'waiting' || reaction.state === 'go') {
      clearTimeout(signalTimer);
      const result = reaction.react(performance.now());
      lights.dataset.on = 'false';
      reactionStage.dataset.state = result === null ? 'early' : 'result';
      reactionScore.textContent = result === null ? 'Jump start' : `${result} ms`;
      reactionStatus.textContent =
        result === null
          ? 'Too early. Wait for all lights to go out.'
          : `Your reaction was ${result} milliseconds.`;
      reactionAction.textContent = 'Try again';
    } else {
      reactionStage.dataset.state = 'waiting';
      reaction.start();
      lights.dataset.on = 'true';
      reactionAction.textContent = 'Wait…';
      reactionScore.textContent = 'Watch the lights';
      reactionStatus.textContent = 'Lights on. Wait for lights out.';
      signalTimer = setTimeout(
        () => {
          if (active !== 'f1' || document.hidden) return;
          reaction.go(performance.now());
          reactionStage.dataset.state = 'go';
          lights.dataset.on = 'false';
          reactionAction.textContent = 'React!';
          reactionStatus.textContent = 'Go!';
        },
        1200 + Math.random() * 1400,
      );
    }
  });
  const paintMemory = () =>
    cards.forEach((card, index) => {
      const visible = memory.open.has(index) || memory.matched.has(index);
      const image = card.querySelector<HTMLImageElement>('[data-card-icon]')!;
      const face = card.querySelector<HTMLElement>('[data-card-face]')!;
      image.src = `/weather/elements/${memory.deck[index]}.svg`;
      image.hidden = !visible;
      face.hidden = visible;
      card.disabled = memory.matched.has(index);
      card.setAttribute('aria-pressed', String(visible));
      card.dataset.selected = String(visible);
      card.setAttribute(
        'aria-label',
        `Card ${index + 1}, ${visible ? memory.deck[index] + (card.disabled ? ', matched' : '') : 'hidden'}`,
      );
    });
  const resetMemory = () => {
    clearTimeout(memoryTimer);
    memory = new MemoryGame();
    memoryStatus.textContent = 'Match the three element pairs.';
    paintMemory();
  };
  cards.forEach((card, index) =>
    card.addEventListener('click', () => {
      const result = memory.flip(index);
      if (result === 'ignored') return;
      paintMemory();
      if (result === 'miss') {
        memoryStatus.textContent = `Not a pair. ${memory.turns} ${memory.turns === 1 ? 'turn' : 'turns'}.`;
        memoryTimer = setTimeout(() => {
          memory.clearMiss();
          paintMemory();
        }, 800);
      } else if (result === 'won')
        memoryStatus.textContent = `All three pairs in ${memory.turns} turns!`;
      else if (result === 'match')
        memoryStatus.textContent = `Matched! ${memory.matched.size / 2} of 3 pairs.`;
      else memoryStatus.textContent = 'Choose another card.';
    }),
  );
  memoryReset.addEventListener('click', resetMemory);
  const pause = () => {
    stopRally();
    clearTimeout(signalTimer);
    reaction.reset();
    delete reactionStage.dataset.state;
    lights.dataset.on = 'false';
    reactionAction.textContent = 'Start lights';
    reactionScore.textContent = 'Reaction test';
    reactionStatus.textContent =
      'Wait for lights out, then react. Early clicks count as a jump start.';
    clearTimeout(memoryTimer);
    memory.clearMiss();
    paintMemory();
  };
  const select = (id: string, focus = false) => {
    if (id === active) return;
    pause();
    root.dataset.gameEnter = id;
    active = id;
    tabs.forEach((tab) => {
      const selected = tab.dataset.gameTab === id;
      tab.setAttribute('aria-selected', String(selected));
      tab.dataset.selected = String(selected);
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.gamePanel !== id;
    });
    readColors();
    draw();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab.dataset.gameTab!));
    tab.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(tabs[next].dataset.gameTab!, true);
    });
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
  });
  window.addEventListener('pagehide', pause);
  window.addEventListener('blur', pause);
  const themeObserver = new MutationObserver(() => {
    readColors();
    if (!rally.running || calm.checked) draw();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-weather'],
  });
  if ('IntersectionObserver' in window) {
    const visibility = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) pause();
    });
    visibility.observe(root);
  }
  paintMemory();
  readColors();
  draw();
}
