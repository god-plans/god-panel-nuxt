// ----------------------------------------------------------------------

const VNavigationDrawer = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    width: 300,
    color: 'surface',
    elevation: 2,
  },

  /** **************************************
   * STYLE OVERRIDES
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      borderRight: `1px solid ${theme.vars.palette.outlineVariant}`,
    }),
  },
};

// ----------------------------------------------------------------------

export const drawer = { VNavigationDrawer };
