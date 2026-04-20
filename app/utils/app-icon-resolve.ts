/**
 * Maps legacy MDI-style `AppIcon` names (with or without `mdi-`) to Iconify ids.
 * Default pack: **Solar** (bold). Brands use **simple-icons**.
 */
const LEGACY_TO_ICONIFY: Record<string, string> = {
  account: 'solar:user-circle-bold',
  'account-group': 'solar:users-group-rounded-bold',
  'account-multiple': 'solar:users-group-rounded-bold',
  'account-plus': 'solar:user-plus-bold',
  'alert-circle': 'solar:danger-circle-bold',
  alert: 'solar:danger-triangle-bold',
  'align-right': 'solar:align-right-bold',
  'arrow-collapse-horizontal': 'solar:round-transfer-horizontal-bold',
  'arrow-left': 'solar:arrow-left-bold',
  'autofit-width': 'solar:round-transfer-horizontal-bold',
  bell: 'solar:bell-bing-bold',
  'bell-alert': 'solar:bell-bing-bold',
  'book-open-page-variant': 'solar:book-2-bold',
  'book-open-variant': 'solar:book-bold',
  bug: 'solar:bug-minimalistic-bold',
  'cart-plus': 'solar:cart-plus-bold',
  cart: 'solar:cart-large-2-bold',
  'chart-areaspline': 'solar:graph-new-bold',
  'chart-line': 'solar:chart-2-bold',
  'check-circle': 'solar:check-circle-bold',
  'chevron-down': 'solar:alt-arrow-down-bold',
  'chevron-left': 'solar:alt-arrow-left-bold',
  'chevron-right': 'solar:alt-arrow-right-bold',
  'chevron-up': 'solar:alt-arrow-up-bold',
  'circle-small': 'solar:record-bold',
  circle: 'solar:record-circle-bold',
  'clock-outline': 'solar:clock-circle-bold',
  close: 'solar:close-circle-bold',
  'code-braces': 'solar:code-bold',
  cog: 'solar:settings-bold',
  contrast: 'solar:filters-bold',
  'contrast-circle': 'solar:filters-bold',
  'credit-card-off': 'solar:card-bold',
  discord: 'simple-icons:discord',
  'document-text': 'solar:document-text-bold',
  'exit-run': 'solar:exit-bold',
  eye: 'solar:eye-bold',
  'eye-off': 'solar:eye-closed-bold',
  'file-question': 'solar:document-text-bold',
  'format-align-right': 'solar:align-right-bold',
  'format-font': 'solar:text-bold-bold',
  'fullscreen-exit': 'solar:minimize-square-3-bold',
  fullscreen: 'solar:maximize-square-3-bold',
  github: 'simple-icons:github',
  'help-circle': 'solar:question-circle-bold',
  home: 'solar:home-2-bold',
  information: 'solar:info-circle-bold',
  'information-outline': 'solar:info-circle-bold',
  linkedin: 'simple-icons:linkedin',
  loading: 'solar:refresh-bold',
  logout: 'solar:logout-3-bold',
  magnify: 'solar:magnifer-bold',
  menu: 'solar:hamburger-menu-bold',
  monitor: 'solar:monitor-bold',
  moon: 'solar:moon-bold',
  'numeric-5-circle': 'solar:star-circle-bold',
  'numeric-6-circle': 'solar:bookmark-circle-bold',
  'package-variant': 'solar:box-minimalistic-bold',
  palette: 'solar:palette-bold',
  'palette-outline': 'solar:palette-bold',
  'pallete-2': 'solar:pallete-2-bold',
  refresh: 'solar:refresh-bold',
  restart: 'solar:restart-bold',
  'trending-down': 'solar:graph-down-bold',
  'trending-up': 'solar:graph-up-bold',
  twitter: 'simple-icons:x',
  'view-dashboard-outline': 'solar:widget-4-bold',
  'view-dashboard': 'solar:widget-5-bold',
  'weather-night': 'solar:moon-bold',
  'weather-sunny': 'solar:sun-2-bold',
  cellphone: 'solar:smartphone-bold',
  tablet: 'solar:tablet-bold',
  'folder-multiple': 'solar:folder-2-bold',
}

export function resolveAppIconifyIcon(raw: string): string {
  const trimmed = raw.trim()
  if (trimmed.includes(':')) return trimmed

  const key = trimmed.replace(/^mdi-/i, '').toLowerCase()
  return LEGACY_TO_ICONIFY[key] ?? 'solar:record-circle-bold'
}

export function appIconNormalizedKey(raw: string): string {
  return raw.trim().replace(/^mdi-/i, '').toLowerCase()
}
