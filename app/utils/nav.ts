/** Strip `mdi-` prefix so `AppIcon` resolves the same key as short names */
export function navIconName(icon: string): string {
  return icon.replace(/^mdi-/, '')
}
