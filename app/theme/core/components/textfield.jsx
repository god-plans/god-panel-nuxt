// ----------------------------------------------------------------------

const VTextField = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    variant: 'outlined',
    rounded: 'lg',
    density: 'comfortable',
  },

  /** **************************************
   * VARIANTS
   *************************************** */
  variants: [
    {
      props: { variant: 'filled' },
      style: ({ theme }) => ({
        backgroundColor: theme.vars.palette.surfaceContainerHighest,
        '&:hover': {
          backgroundColor: theme.vars.palette.surfaceContainerHighest,
        },
        '&.v-text-field--focused': {
          backgroundColor: theme.vars.palette.surfaceContainerHighest,
        },
      }),
    },
  ],
};

// ----------------------------------------------------------------------

export const textfield = { VTextField };
