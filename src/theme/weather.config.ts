/**
 * P1 static design contract. Not connected to the current page until P2 approval.
 * No event listeners, persistence, weather simulation or animation belong here.
 * Only horizon.svg is approved for P2. edge/corner prototypes are excluded.
 */
export const weatherThemeIds = ['normal', 'cryo', 'electro'] as const;
export type WeatherThemeId = (typeof weatherThemeIds)[number];

export interface WeatherThemeDefinition {
  id: WeatherThemeId;
  title: string;
  description: string;
  icon: 'sun' | 'snowflake' | 'cloud-lightning';
  horizon: string;
}

export const weatherThemes: Record<WeatherThemeId, WeatherThemeDefinition> = {
  normal: {
    id: 'normal',
    title: 'Green Meadow',
    description: 'Quiet, natural, default',
    icon: 'sun',
    horizon: '/weather/normal/horizon.svg',
  },
  cryo: {
    id: 'cryo',
    title: 'Blizzard',
    description: 'Calm, cool, frosted',
    icon: 'snowflake',
    horizon: '/weather/cryo/horizon.svg',
  },
  electro: {
    id: 'electro',
    title: 'Storm',
    description: 'Dark, electric, deliberate',
    icon: 'cloud-lightning',
    horizon: '/weather/electro/horizon.svg',
  },
};

export const defaultWeatherTheme: WeatherThemeId = 'normal';

export function isWeatherThemeId(value: string): value is WeatherThemeId {
  return weatherThemeIds.some((theme) => theme === value);
}