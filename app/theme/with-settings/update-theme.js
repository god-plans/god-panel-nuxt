import COLORS from '../core/colors.json';
import PRIMARY_COLOR from './primary-color.json';
import { components as coreComponents } from '../core/components';
import { hexToRgbChannel, createPaletteChannel } from '../styles/utils';
import { createShadowColor, customShadows as coreCustomShadows } from '../core/custom-shadows';
import { primary as corePrimaryPalette, grey } from '../core/palette';

// ----------------------------------------------------------------------

/**
 * [1] settings @primaryColor
 * [2] settings @contrast
 */

export function updateCoreWithSettings(theme, settings) {
  const { colorSchemes, customShadows } = theme;

  return {
    ...theme,
    colorSchemes: {
      ...colorSchemes,
      light: {
        palette: {
          ...colorSchemes?.light?.palette,
          /** [1] */
          primary: getPalettePrimary(settings.primaryColor),
          /** [2] */
          background: {
            ...colorSchemes?.light?.palette?.background,
            default: getBackgroundDefault(settings.contrast),
            defaultChannel: hexToRgbChannel(getBackgroundDefault(settings.contrast)),
          },
        },
      },
      dark: {
        palette: {
          ...colorSchemes?.dark?.palette,
          /** [1] */
          primary: getPalettePrimary(settings.primaryColor),
        },
      },
    },
    customShadows: {
      ...customShadows,
      /** [1] */
      primary:
        settings.primaryColor === 'default'
          ? coreCustomShadows('light').primary
          : createShadowColor(getPalettePrimary(settings.primaryColor).mainChannel),
    },
  };
}

// ----------------------------------------------------------------------

export function updateComponentsWithSettings(theme, settings) {
  const components = { ...coreComponents };

  /** [2] */
  if (settings.contrast === 'high') {
    const VCard = {
      ...components.VCard,
      elevation: 1, // Lower elevation for high contrast
    };

    components.VCard = VCard;
  }

  return { ...theme, components };
}

// ----------------------------------------------------------------------

const PRIMARY_COLORS = {
  default: COLORS.primary,
  cyan: PRIMARY_COLOR.cyan,
  purple: PRIMARY_COLOR.purple,
  blue: PRIMARY_COLOR.blue,
  orange: PRIMARY_COLOR.orange,
  red: PRIMARY_COLOR.red,
};

function getPalettePrimary(primaryColorName) {
  /** [1] */
  const selectedPrimaryColor = PRIMARY_COLORS[primaryColorName];
  const updatedPrimaryPalette = createPaletteChannel(selectedPrimaryColor);

  return primaryColorName === 'default' ? corePrimaryPalette : updatedPrimaryPalette;
}

function getBackgroundDefault(contrast) {
  /** [2] */
  return contrast === 'default' ? '#FFFFFF' : grey[200];
}
