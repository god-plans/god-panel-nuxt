// ----------------------------------------------------------------------

const VTypography = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    tag: 'p',
  },

  /** **************************************
   * VARIANTS
   *************************************** */
  variants: [
    {
      props: { variant: 'h1' },
      style: ({ theme }) => ({
        fontSize: theme.typography.h1.fontSize,
        fontWeight: theme.typography.h1.fontWeight,
        lineHeight: theme.typography.h1.lineHeight,
      }),
    },
    {
      props: { variant: 'h2' },
      style: ({ theme }) => ({
        fontSize: theme.typography.h2.fontSize,
        fontWeight: theme.typography.h2.fontWeight,
        lineHeight: theme.typography.h2.lineHeight,
      }),
    },
    {
      props: { variant: 'h3' },
      style: ({ theme }) => ({
        fontSize: theme.typography.h3.fontSize,
        fontWeight: theme.typography.h3.fontWeight,
        lineHeight: theme.typography.h3.lineHeight,
      }),
    },
    {
      props: { variant: 'body1' },
      style: ({ theme }) => ({
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        lineHeight: theme.typography.body1.lineHeight,
      }),
    },
  ],
};

// ----------------------------------------------------------------------

export const typography = { VTypography };
