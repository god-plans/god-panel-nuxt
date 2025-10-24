// ----------------------------------------------------------------------

export function useRTL(direction) {
  // Set document direction
  if (process.client) {
    document.dir = direction;
  }

  return {
    isRTL: direction === 'rtl',
    direction,
  };
}
