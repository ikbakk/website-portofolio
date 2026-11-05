/** Pure local game rules; rendering, clocks and DOM stay in the controller. */
export class RallyGame {
  x = 0;
  speed = 0.45;
  hits = 0;
  best = 0;
  running = false;
  calm = false;
  missed = false;
  start(calm = false) {
    this.calm = calm;
    this.x = calm ? 0.5 : 0;
    this.hits = 0;
    this.speed = 0.45;
    this.running = true;
    this.missed = false;
  }
  tick(seconds: number) {
    if (!this.running || this.calm) return;
    this.x += Math.max(0, Math.min(seconds, 0.1)) * this.speed;
    if (this.x > 1) {
      this.running = false;
      this.missed = true;
    }
  }
  hit() {
    if (!this.running) return false;
    if (!this.calm && (this.x < 0.4 || this.x > 0.6)) {
      this.running = false;
      this.missed = true;
      return false;
    }
    this.hits++;
    this.best = Math.max(this.best, this.hits);
    this.x = this.calm ? 0.5 : 0;
    this.speed = Math.min(1.2, this.speed + 0.035);
    return true;
  }
  stop() {
    this.running = false;
  }
}
export type ElementName = 'dendro' | 'cryo' | 'electro';
export function shuffleElements(random: () => number = Math.random): ElementName[] {
  const deck: ElementName[] = ['dendro', 'cryo', 'electro', 'dendro', 'cryo', 'electro'];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.min(i, Math.max(0, Math.floor(random() * (i + 1))));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
export class MemoryGame {
  deck: ElementName[];
  open = new Set<number>();
  matched = new Set<number>();
  pending: number[] = [];
  turns = 0;
  constructor(random: () => number = Math.random) {
    this.deck = shuffleElements(random);
  }
  flip(index: number): 'ignored' | 'first' | 'match' | 'miss' | 'won' {
    if (
      !Number.isInteger(index) ||
      index < 0 ||
      index >= this.deck.length ||
      this.open.has(index) ||
      this.matched.has(index) ||
      this.pending.length === 2
    )
      return 'ignored';
    this.open.add(index);
    this.pending.push(index);
    if (this.pending.length === 1) return 'first';
    this.turns++;
    const [a, b] = this.pending;
    if (this.deck[a] !== this.deck[b]) return 'miss';
    this.matched.add(a);
    this.matched.add(b);
    this.pending = [];
    return this.matched.size === this.deck.length ? 'won' : 'match';
  }
  clearMiss() {
    for (const index of this.pending) this.open.delete(index);
    this.pending = [];
  }
}
export class ReactionGame {
  state: 'ready' | 'waiting' | 'go' | 'early' | 'done' = 'ready';
  startedAt = 0;
  milliseconds: number | null = null;
  start() {
    this.state = 'waiting';
    this.milliseconds = null;
  }
  go(now: number) {
    if (this.state === 'waiting') {
      this.state = 'go';
      this.startedAt = now;
    }
  }
  react(now: number) {
    if (this.state === 'waiting') {
      this.state = 'early';
      return null;
    }
    if (this.state !== 'go') return null;
    this.milliseconds = Math.max(0, Math.round(now - this.startedAt));
    this.state = 'done';
    return this.milliseconds;
  }
  reset() {
    this.state = 'ready';
    this.milliseconds = null;
  }
}
