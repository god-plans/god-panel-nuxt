// ----------------------------------------------------------------------

const VCard = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    elevation: 2,
    rounded: 'lg',
  },

  /** **************************************
   * VARIANTS
   *************************************** */
  variants: [
    {
      props: { variant: 'outlined' },
      style: ({ theme }) => ({
        border: `1px solid ${theme.vars.palette.outline}`,
        backgroundColor: 'transparent',
      }),
    },
    {
      props: { variant: 'soft' },
      style: ({ theme }) => ({
        backgroundColor: theme.vars.palette.surfaceContainer,
        border: `1px solid ${theme.vars.palette.outlineVariant}`,
      }),
    },
  ],
};

// ----------------------------------------------------------------------

export const card = { VCard };
