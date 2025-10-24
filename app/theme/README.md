# Vuetify Configuration

This directory contains the comprehensive Vuetify configuration for the God Panel Nuxt application.

## 📁 Structure

```
theme/
├── core/
│   ├── components/          # Core component configurations
│   ├── index.js            # Component exports
│   ├── colors.json         # Color definitions
│   ├── palette.js          # Palette configurations
│   ├── shadows.js          # Shadow definitions
│   ├── typography.js       # Typography settings
│   └── custom-shadows.js   # Custom shadow utilities
├── with-settings/          # Settings-based theme updates
├── create-theme.js         # Theme creation logic
├── vuetify-config.js       # Main Vuetify configuration
└── README.md              # This file
```

## 🎨 Features

### Core Components
- **37+ Component Configurations**: All essential Vuetify components with consistent theming
- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Accessibility**: ARIA compliance and keyboard navigation support
- **RTL Support**: Right-to-left language support

### Theme System
- **Light/Dark Themes**: Automatic theme switching
- **Color Schemes**: Primary, secondary, error, success, warning, info palettes
- **Typography**: Consistent font scales and spacing
- **Shadows**: Material Design elevation system

### Configuration Options
- **Icon Sets**: MDI icons with custom aliases
- **Breakpoints**: Mobile-first responsive breakpoints
- **Animations**: Smooth transitions and micro-interactions
- **Locale**: Internationalization support

## 🚀 Usage

### Basic Setup
The Vuetify configuration is automatically applied through the Nuxt plugin system. No additional setup required.

### Customizing Components
Edit component configurations in `core/components/`:

```javascript
// core/components/button.jsx
const VBtn = {
  defaults: {
    variant: 'flat',
    height: 40,
    rounded: 'lg',
  },
  variants: [
    {
      props: { variant: 'soft' },
      style: ({ theme }) => ({
        backgroundColor: theme.vars.palette.surfaceVariant,
        // ... custom styles
      }),
    },
  ],
};
```

### Theme Customization
Modify themes in `core/palette.js` or use the settings store to dynamically change themes.

### Icon Customization
Add custom icon aliases in `vuetify-config.js`:

```javascript
aliases: {
  ...aliases,
  customIcon: 'mdi-custom-icon-name',
}
```

## 📚 Component List

The following components are pre-configured:

- **Layout**: AppBar, NavigationDrawer, Card, Sheet, Stack
- **Input**: TextField, Select, Autocomplete, Checkbox, Radio, Switch, Slider
- **Feedback**: Alert, Progress, Skeleton, Snackbar
- **Navigation**: Tabs, Breadcrumbs, Menu, Tooltip
- **Data Display**: Table, List, Avatar, Badge, Chip
- **Interactive**: Button, Fab, Icon, Pagination

## 🔧 Advanced Configuration

### Custom Breakpoints
```javascript
const breakpointConfig = {
  mobileBreakpoint: 'md',
  thresholds: {
    xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920,
  },
};
```

### Theme Variations
```javascript
variations: {
  colors: ['primary', 'secondary', 'error'],
  lighten: 5,
  darken: 5,
},
```

### RTL Configuration
Automatically enabled when `settings.themeDirection === 'rtl'`.

## 🎯 Best Practices

1. **Consistent Components**: Always use the core components instead of basic Vuetify components
2. **Theme Variables**: Use `theme.vars.palette.*` for colors instead of hardcoded values
3. **Responsive Design**: Leverage the built-in breakpoint system
4. **Accessibility**: Components are pre-configured for accessibility compliance

## 🔍 Troubleshooting

- **Styles not applying**: Ensure components are imported from the core configuration
- **Theme not switching**: Check settings store configuration
- **RTL issues**: Verify direction setting in theme configuration

## 📝 Contributing

When adding new components:
1. Create component config in `core/components/`
2. Add to `core/components/index.js` exports
3. Update this documentation
4. Test across light/dark themes and RTL layouts
