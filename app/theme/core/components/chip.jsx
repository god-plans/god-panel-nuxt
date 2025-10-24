// ----------------------------------------------------------------------

const VChip = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    rounded: 'lg',
    size: 'default',
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
    {
      props: { variant: 'outlined' },
      style: ({ theme }) => ({
        borderColor: theme.vars.palette.outline,
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: theme.vars.palette.surfaceVariant,
        },
      }),
    },
  ],
};

// ----------------------------------------------------------------------

export const chip = { VChip };
