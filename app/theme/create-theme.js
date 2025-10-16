import { shadows, typography, components, colorSchemes, customShadows } from './core';
import { updateCoreWithSettings, updateComponentsWithSettings } from './with-settings/update-theme';

// ----------------------------------------------------------------------

export function createTheme(settings) {
  // Map settings properties to theme properties
  const themeSettings = {
    colorScheme: settings.colorScheme,
    direction: settings.direction,
    primaryColor: settings.primaryColor,
    contrast: settings.contrast,
    fontFamily: settings.fontFamily,
  };

  const initialTheme = {
    colorSchemes,
    shadows: shadows(themeSettings.colorScheme),
    customShadows: customShadows(themeSettings.colorScheme),
    direction: themeSettings.direction,
    shape: { borderRadius: 8 },
    components,
    typography: {
      ...typography,
      fontFamily: themeSettings.fontFamily,
    },
  };

  /**
   * 1.Update values from settings before creating theme.
   */
  const updateTheme = updateCoreWithSettings(initialTheme, themeSettings);

  /**
   * 2.Create theme + add locale + update component with settings.
   */
  const theme = updateComponentsWithSettings(updateTheme, themeSettings);

  return theme;
}
