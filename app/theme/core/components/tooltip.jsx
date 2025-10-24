// ----------------------------------------------------------------------

const VTooltip = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    location: 'top',
    transition: 'scale-transition',
    rounded: 'lg',
  },

  /** **************************************
   * STYLE OVERRIDES
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      '& .v-overlay__content': {
        backgroundColor: theme.vars.palette.inverseSurface,
        color: theme.vars.palette.inverseOnSurface,
      },
    }),
  },
};

// ----------------------------------------------------------------------

export const tooltip = { VTooltip };
