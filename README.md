# God Panel - Modern Admin Dashboard

A modern, feature-rich admin dashboard built with **Nuxt.js 4**, **[god-kit](https://www.npmjs.com/package/god-kit)** (Vue UI primitives and design tokens), **Tailwind CSS**, and **TypeScript**. This project provides a complete admin panel solution with authentication, theming, RTL support, and a responsive design.

## ✨ Features

- 🚀 **Nuxt.js 4** - Latest version with SSR and SSG support
- 🎨 **god-kit** - Accessible `Gk*` components and `--gk-*` design tokens
- 💨 **CSS Variables** - Dynamic theming with CSS custom properties
- 🔒 **TypeScript** - Full type safety with Zod validation
- ✅ **Zod Validation** - Comprehensive runtime type validation
- 🌍 **RTL Support** - Right-to-left language support
- 🔐 **JWT Authentication** - Secure authentication with API integration
- 🎯 **Pinia Store** - Centralized state management
- 🌐 **i18n Ready** - Internationalization support
- 📱 **Responsive Design** - Mobile-first approach
- 🎭 **Advanced Theme System** - Light/Dark mode with custom colors and fonts
- 📊 **Dashboard Layouts** - Multiple layout options (vertical, horizontal, mini)
- 🧭 **Breadcrumb Navigation** - Automatic breadcrumb generation
- 📈 **Progress Indicators** - Loading bars and animations
- 🎯 **Settings Drawer** - Comprehensive theme and layout customization
- 🏗️ **Component Library** - Reusable components (LoadingScreen, SearchNotFound, etc.)
- 🔄 **Motion Animations** - Smooth transitions and lazy loading
- 💾 **Dual Persistence** - LocalStorage and cookies for SSR support

## 🛠️ Tech Stack

- **Framework:** Nuxt.js 4
- **UI Library:** god-kit (`createGkKit`, `Gk*` components)
- **Styling:** Tailwind CSS + god-kit tokens (`--gk-*`) and `app/assets/css/main.css`
- **Language:** TypeScript
- **State Management:** Pinia
- **Validation:** Zod
- **HTTP Client:** Axios
- **Icons:** Material Design Icons
- **Persistence:** Cookies + LocalStorage

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/god-panel-nuxt.git
   cd god-panel-nuxt
   ```

2. **Install dependencies**
   ```bash
   # npm
   npm install

   # yarn
   yarn install

   # pnpm
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NUXT_PUBLIC_API_URL=http://localhost:4000
   ```

4. **Development Server**
   ```bash
   # npm
   npm run dev

   # yarn
   yarn dev

   # pnpm
   pnpm dev
   ```

   Visit `http://localhost:3000` to see the application.

## 🚀 Build & Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## 🌐 Deployment

### Netlify Deployment (Recommended)

God Panel is configured for easy deployment to Netlify with optimized settings.

#### Quick Deploy

1. **Connect to Netlify:**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

2. **Configure Build Settings:**
   ```
   Build command: npm ci && npx nuxt prepare && npm run generate
   Publish directory: .output/public
   Node version: 20
   ```

3. **Environment Variables (Optional):**
   ```
   NUXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
   NUXT_PUBLIC_API_URL=https://your-api-endpoint.com
   ENABLE_MOCK_DATA=true  # For demo purposes
   ```

4. **Deploy:** Click "Deploy site"

#### Manual CLI Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Use the provided deployment script
./deploy-netlify.sh

# Or deploy manually
npm ci && npx nuxt prepare && npm run generate
netlify deploy --dir=.output/public --prod
```

### Other Deployment Options

- **Vercel:** Configure build command as `npm run build` and output directory as `.output/public`
- **Railway:** Use Nixpacks or custom build command
- **Docker:** The build output in `.output/public` can be served by any static file server

### 📚 Deployment Documentation

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 Project Structure

```
god-panel-nuxt/
├── app/
│   └── app.vue                 # Root: GkSnackbarHost, settings drawer, RTL
├── assets/
│   └── css/
│       └── main.css           # Global styles
├── components/                 # Vue components
├── composables/                # Vue composables
├── layouts/                    # Page layouts
│   ├── default.vue
│   └── dashboard.vue
├── middleware/                 # Route middleware
│   ├── auth.ts
│   └── guest.ts
├── pages/                      # File-based routing
│   ├── index.vue
│   ├── dashboard/
│   │   └── index.vue
│   └── auth/
│       └── login.vue
├── plugins/                    # Nuxt plugins
│   └── god-kit.client.ts       # createGkKit + i18n + theme sync
├── public/                     # Static assets
├── stores/                     # Pinia stores
│   ├── auth.ts
│   └── settings.ts
├── types/                      # TypeScript types
│   ├── index.ts
│   └── validation.ts
├── utils/                      # Utility functions
└── nuxt.config.ts             # Nuxt configuration
```

## 🎨 Customization

### Themes
The application supports multiple theme configurations:
- Light/Dark mode
- Custom color schemes
- RTL/LTR direction support

**Source of truth:** Pinia `settings` (`colorScheme`, `primaryColor`, `direction`, …) drives the UI. **`app/plugins/god-kit.client.ts`** syncs **`useGkTheme()`** and **`@nuxtjs/color-mode`** with `settings.colorScheme`. **`app/plugins/ssr-primary-preset.server.ts`** injects primary CSS variables on SSR for correct first paint.

**Notifications:** Use **`GkSnackbarHost`** in `app.vue` and **`pushGkSnackbar`** from `god-kit/vue` (or **`useToast()`**, which delegates to the same queue). Legacy `ToastContainer` has been removed.

**Optional observability:** Set `NUXT_PUBLIC_SENTRY_DSN` when wiring `@sentry/nuxt`; see `app/plugins/error-handler.client.ts`.

### Release QA (manual)
Before shipping, verify: **LTR + RTL** (e.g. Persian), **mini rail** and **compact** layout, **mobile drawer**, **settings save** (including primary preset and **dark mode**), and **dynamic fonts** (`useDynamicFonts`).

### Layouts
Choose from different dashboard layouts:
- Vertical sidebar
- Horizontal navigation
- Mini sidebar mode

## 🔧 Configuration

### Nuxt Config
Key configuration options in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n'
  ],

  // god-kit CSS order: tokens.css → vue.css → app CSS (see nuxt.config.ts)
})
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices
- Different screen orientations

## 🌐 Internationalization

Built-in support for multiple languages with RTL support for Arabic, Hebrew, and other RTL languages.

## 🔐 Authentication

JWT-based authentication system with:
- Login/Register pages
- Protected routes
- Role-based access control
- Automatic token refresh

## 📊 Features Overview

- **Dashboard:** Rich overview with stats cards, analytics charts, and recent activity
- **Authentication:** Complete JWT auth flow with API integration and error handling
- **Settings:** Advanced theme customization with tooltips and dual persistence
- **Navigation:** Responsive navigation with breadcrumbs and multiple layout options
- **Components:** Comprehensive component library (ProgressBar, MotionLazy, LoadingScreen, SearchNotFound)
- **State Management:** Centralized state with Pinia and type-safe stores
- **API Integration:** Axios-based API communication with interceptors and error handling
- **Theming:** Dynamic theme system with CSS variables and font switching
- **Animations:** Motion animations and lazy loading for enhanced UX

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Nuxt.js](https://nuxt.com/) - The framework
- [god-kit](https://www.npmjs.com/package/god-kit) - UI primitives and theming
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Minimals](https://minimals.cc/) - Original design inspiration
