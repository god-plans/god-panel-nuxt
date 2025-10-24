// ----------------------------------------------------------------------

const VBtnToggle = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    rounded: 'lg',
    variant: 'outlined',
    color: 'primary',
    multiple: false,
  },

  /** **************************************
   * STYLE OVERRIDES
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius * 2,
      gap: theme.spacing(1),
    }),
  },
};

// ----------------------------------------------------------------------

export const toggleButton = { VBtnToggle };
