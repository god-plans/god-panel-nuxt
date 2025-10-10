// ----------------------------------------------------------------------

const VAppBar = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    elevation: 0,
    height: 64,
    color: 'surface',
  },

  /** **************************************
   * STYLE OVERRIDES
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      borderBottom: `1px solid ${theme.vars.palette.outlineVariant}`,
    }),
  },
};

// ----------------------------------------------------------------------

export const appBar = { VAppBar };
