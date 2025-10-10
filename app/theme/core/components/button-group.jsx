// ----------------------------------------------------------------------

const VBtnToggle = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    rounded: 'lg',
    variant: 'outlined',
    color: 'primary',
  },

  /** **************************************
   * STYLE OVERRIDES
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      '& .v-btn': {
        margin: 0,
        borderRadius: 0,
        '&:first-child': {
          borderTopLeftRadius: theme.shape.borderRadius * 2,
          borderBottomLeftRadius: theme.shape.borderRadius * 2,
        },
        '&:last-child': {
          borderTopRightRadius: theme.shape.borderRadius * 2,
          borderBottomRightRadius: theme.shape.borderRadius * 2,
        },
      },
    }),
  },
};

// ----------------------------------------------------------------------

export const buttonGroup = { VBtnToggle };
