// ----------------------------------------------------------------------

const VMenu = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    offset: 8,
    transition: 'slide-y-transition',
    rounded: 'lg',
  },

  /** **************************************
   * STYLE OVERRIDES
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      '& .v-menu__content': {
        boxShadow: theme.shadows[8],
      },
    }),
  },
};

// ----------------------------------------------------------------------

export const menu = { VMenu };
