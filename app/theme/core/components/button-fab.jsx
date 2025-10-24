// ----------------------------------------------------------------------

const VBtn = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    size: 'default',
    rounded: 'circle',
    variant: 'flat',
  },

  /** **************************************
   * VARIANTS
   *************************************** */
  variants: [
    {
      props: { fab: true },
      style: ({ theme }) => ({
        width: 56,
        height: 56,
        minWidth: 56,
        boxShadow: theme.shadows[6],
        '&:hover': {
          boxShadow: theme.shadows[8],
        },
      }),
    },
  ],
};

// ----------------------------------------------------------------------

export const fab = { VBtn };
