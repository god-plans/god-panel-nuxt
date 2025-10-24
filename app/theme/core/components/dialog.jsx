// ----------------------------------------------------------------------

const VDialog = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    width: 'auto',
    maxWidth: 600,
    persistent: false,
    scrollable: false,
  },

  /** **************************************
   * STYLE OVERRIDES
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      '& .v-dialog__content': {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
    }),
  },
};

// ----------------------------------------------------------------------

export const dialog = { VDialog };
