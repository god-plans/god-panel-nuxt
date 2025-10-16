# God Panel - Modern Admin Dashboard

A modern, feature-rich admin dashboard built with **Nuxt.js 4.1.2**, **Vuetify 3**, and **TypeScript**. This project provides a complete admin panel solution with authentication, theming, RTL support, and a responsive design.

## ✨ Features

- 🚀 **Nuxt.js 4.1.2** - Latest version with SSR and SSG support
- 🎨 **Vuetify 3** - Material Design components with custom theming
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

- **Framework:** Nuxt.js 4.1.2
- **UI Library:** Vuetify 3
- **Styling:** CSS Variables + Vuetify Theme System
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

## 📁 Project Structure

```
god-panel-nuxt/
├── app/
│   └── app.vue                 # Root component
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
│   └── vuetify.ts
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
    '@nuxtjs/axios',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n'
  ],

  // Vuetify, Axios, i18n, and other configurations
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
- [Vuetify](https://vuetifyjs.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Minimals](https://minimals.cc/) - Original design inspiration
