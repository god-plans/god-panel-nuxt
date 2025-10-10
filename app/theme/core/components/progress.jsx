// ----------------------------------------------------------------------

const VProgressCircular = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    size: 40,
    width: 4,
    color: 'primary',
  },
};

// ----------------------------------------------------------------------

const VProgressLinear = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaults: {
    height: 4,
    color: 'primary',
    rounded: true,
  },
};

// ----------------------------------------------------------------------

export const progress = { VProgressCircular, VProgressLinear };
