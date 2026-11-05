export interface ContributionDay {
  date: string;
  count: number | null;
  level: number | null;
}
export interface ActivitySnapshot {
  status: 'ready';
  username: string;
  fetchedAt: string;
  asOf: string;
  startsOn: string;
  source: string;
  days: ContributionDay[];
  total: number;
  activeDays: number;
  longestStreak: number;
}
const DAY = 86_400_000;
function validDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + 'T00:00:00Z');
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
/** Validate every day before a new response can replace the last-good cache. */
export function createActivitySnapshot(
  payload: unknown,
  options: { username: string; asOf: string; fetchedAt: string },
): ActivitySnapshot {
  if (!validDate(options.asOf) || !Number.isFinite(Date.parse(options.fetchedAt)))
    throw new Error('Invalid snapshot date');
  if (
    !payload ||
    typeof payload !== 'object' ||
    !('contributions' in payload) ||
    !Array.isArray(payload.contributions)
  )
    throw new Error('Missing contribution days');
  if (payload.contributions.length < 84 || payload.contributions.length > 400)
    throw new Error('Incomplete contribution response');
  const byDate = new Map<string, ContributionDay>();
  for (const row of payload.contributions) {
    if (
      !row ||
      typeof row !== 'object' ||
      !validDate(row.date) ||
      !Number.isSafeInteger(row.count) ||
      row.count < 0 ||
      !Number.isInteger(row.level) ||
      row.level < 0 ||
      row.level > 4
    )
      throw new Error('Malformed contribution day');
    if (byDate.has(row.date)) throw new Error('Duplicate contribution date');
    byDate.set(row.date, { date: row.date, count: row.count, level: row.level });
  }
  const end = new Date(options.asOf + 'T00:00:00Z');
  const start = new Date(end.getTime() - (end.getUTCDay() + 77) * DAY);
  const days: ContributionDay[] = [];
  let total = 0,
    activeDays = 0,
    longestStreak = 0,
    streak = 0;
  for (let index = 0; index < 84; index++) {
    const date = new Date(start.getTime() + index * DAY).toISOString().slice(0, 10);
    if (date > options.asOf) {
      days.push({ date, count: null, level: null });
      continue;
    }
    const row = byDate.get(date);
    if (!row) throw new Error('Missing contribution day: ' + date);
    days.push(row);
    total += row.count!;
    if (row.count! > 0) {
      activeDays++;
      streak++;
      longestStreak = Math.max(longestStreak, streak);
    } else streak = 0;
  }
  return {
    status: 'ready',
    username: options.username,
    fetchedAt: options.fetchedAt,
    asOf: options.asOf,
    startsOn: days[0].date,
    source: 'https://github-contributions-api.jogruber.de/v4/' + options.username + '?y=last',
    days,
    total,
    activeDays,
    longestStreak,
  };
}
/** Shared reader used by the view and by cache fallback. Never treat empty data as zero activity. */
export function isActivitySnapshot(value: unknown): value is ActivitySnapshot {
  if (!value || typeof value !== 'object') return false;
  const data = value as ActivitySnapshot;
  if (
    data.status !== 'ready' ||
    data.username !== 'ikbakk' ||
    !validDate(data.asOf) ||
    !Number.isFinite(Date.parse(data.fetchedAt)) ||
    !Array.isArray(data.days) ||
    data.days.length !== 84
  )
    return false;
  if (!validDate(data.startsOn) || data.startsOn !== data.days[0]?.date) return false;
  const first = Date.parse(data.startsOn + 'T00:00:00Z');
  if (new Date(first).getUTCDay() !== 0) return false;
  let total = 0,
    activeDays = 0,
    longestStreak = 0,
    streak = 0,
    actualDays = 0;
  for (let index = 0; index < data.days.length; index++) {
    const day = data.days[index];
    const expected = new Date(first + index * DAY).toISOString().slice(0, 10);
    if (!day || typeof day !== 'object' || day.date !== expected) return false;
    if (day.date > data.asOf) {
      if (day.count !== null || day.level !== null) return false;
      continue;
    }
    if (
      !Number.isSafeInteger(day.count) ||
      day.count! < 0 ||
      !Number.isInteger(day.level) ||
      day.level! < 0 ||
      day.level! > 4
    )
      return false;
    actualDays++;
    total += day.count!;
    if (day.count! > 0) {
      activeDays++;
      streak++;
      longestStreak = Math.max(longestStreak, streak);
    } else streak = 0;
  }
  return (
    actualDays >= 78 &&
    actualDays <= 84 &&
    data.days[actualDays - 1]?.date === data.asOf &&
    total === data.total &&
    activeDays === data.activeDays &&
    longestStreak === data.longestStreak
  );
}
