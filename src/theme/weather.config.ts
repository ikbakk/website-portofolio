/**
 * Static theme definitions used by the homepage.
 * No event listeners, persistence, weather simulation or animation belong here.
 * The owner authorized elemental controls and column ornaments on 2026-11-04.
 * Earlier edge.svg/corner.svg experiments remain unused.
 */
export const weatherThemeIds = ['normal', 'cryo', 'electro'] as const;
export type WeatherThemeId = (typeof weatherThemeIds)[number];

export interface WeatherThemeDefinition {
  id: WeatherThemeId;
  title: string;
  description: string;
  icon: 'dendro' | 'cryo' | 'electro';
  horizon: string;
}

export const weatherThemes: Record<WeatherThemeId, WeatherThemeDefinition> = {
  normal: {
    id: 'normal',
    title: 'Green Meadow',
    description: 'Quiet, natural, default',
    icon: 'dendro',
    horizon: '/weather/normal/horizon.svg',
  },
  cryo: {
    id: 'cryo',
    title: 'Blizzard',
    description: 'Calm, cool, frosted',
    icon: 'cryo',
    horizon: '/weather/cryo/horizon.svg',
  },
  electro: {
    id: 'electro',
    title: 'Storm',
    description: 'Dark, electric, deliberate',
    icon: 'electro',
    horizon: '/weather/electro/horizon.svg',
  },
};

export const defaultWeatherTheme: WeatherThemeId = 'normal';

export function isWeatherThemeId(value: string): value is WeatherThemeId {
  return weatherThemeIds.some((theme) => theme === value);
}
