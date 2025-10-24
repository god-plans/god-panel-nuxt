// ----------------------------------------------------------------------

const VBtn = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    variant: 'flat',
    height: 40,
    rounded: 'lg',
    color: 'primary',
  },

  /** **************************************
   * VARIANTS
   *************************************** */
  variants: [
    {
      props: { variant: 'soft' },
      style: ({ theme }) => ({
        backgroundColor: theme.vars.palette.surfaceVariant,
        color: theme.vars.palette.onSurfaceVariant,
        '&:hover': {
          backgroundColor: theme.vars.palette.surfaceVariant,
          opacity: 0.8,
        },
      }),
    },
  ],
};

// ----------------------------------------------------------------------

export const button = { VBtn };
