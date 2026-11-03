/**
 * P1 static design contract. Not connected to the current page until P2 approval.
 * No event listeners, persistence, weather simulation or animation belong here.
 */
export const weatherThemeIds = ['normal', 'cryo', 'electro'] as const;
export type WeatherThemeId = (typeof weatherThemeIds)[number];

export interface WeatherThemeDefinition {
  id: WeatherThemeId;
  title: string;
  description: string;
  icon: 'sun' | 'snowflake' | 'cloud-lightning';
  ornament: string;
  corner: string;
  horizon: string;
}

export const weatherThemes: Record<WeatherThemeId, WeatherThemeDefinition> = {
  normal: {
    id: 'normal',
    title: 'Green Meadow',
    description: 'Quiet, natural, default',
    icon: 'sun',
    ornament: '/weather/normal/edge.svg',
    corner: '/weather/normal/corner.svg',
    horizon: '/weather/normal/horizon.svg',
  },
  cryo: {
    id: 'cryo',
    title: 'Blizzard',
    description: 'Calm, cool, frosted',
    icon: 'snowflake',
    ornament: '/weather/cryo/edge.svg',
    corner: '/weather/cryo/corner.svg',
    horizon: '/weather/cryo/horizon.svg',
  },
  electro: {
    id: 'electro',
    title: 'Storm',
    description: 'Dark, electric, deliberate',
    icon: 'cloud-lightning',
    ornament: '/weather/electro/edge.svg',
    corner: '/weather/electro/corner.svg',
    horizon: '/weather/electro/horizon.svg',
  },
};

export const defaultWeatherTheme: WeatherThemeId = 'normal';

export function isWeatherThemeId(value: string): value is WeatherThemeId {
  return weatherThemeIds.some((theme) => theme === value);
}