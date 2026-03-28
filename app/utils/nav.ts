/** Strip MDI prefix for AppIcon / webfont names */
export function navIconName(icon: string): string {
  return icon.replace(/^mdi-/, '')
}
