# 🚀 Netlify Deployment Guide for God Panel Nuxt

This guide covers multiple ways to deploy your God Panel Nuxt application to Netlify.

## 📋 Prerequisites

- [Netlify Account](https://app.netlify.com/)
- Node.js 20+ installed
- Git repository (for Git-based deployment)

## 🎯 Deployment Methods

### Method 1: Git-Based Deployment (Recommended)

#### Step 1: Connect Repository to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git provider (GitHub, GitLab, Bitbucket)
4. Select your repository

#### Step 2: Configure Build Settings
```
Build command: npm run build
Publish directory: .output/public
Node version: 20
```

#### Step 3: Environment Variables (Optional)
Add these in Site settings → Environment variables:
```
NUXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
NUXT_PUBLIC_API_URL=https://your-api-endpoint.com
ENABLE_MOCK_DATA=true  # For demo purposes
```

#### Step 4: Deploy
- Click **"Deploy site"**
- Netlify will automatically build and deploy on every push to main branch

### Method 2: Manual Deployment via CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify
```bash
netlify login
```

#### Step 3: Build and Deploy
```bash
# Build the application
npm run build

# Deploy to Netlify
netlify deploy --dir=.output/public --prod
```

#### Step 4: Use the Provided Script
```bash
# Make script executable (already done)
chmod +x deploy-netlify.sh

# Run deployment script
./deploy-netlify.sh
```

### Method 3: Drag & Drop Deployment

#### Step 1: Build Locally
```bash
npm run build
```

#### Step 2: Deploy via Netlify Dashboard
1. Go to [Netlify Sites](https://app.netlify.com/)
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop the `.output/public` folder
4. Click **"Deploy site"**

### Method 4: GitHub Actions (CI/CD)

#### Step 1: Add Secrets to Repository
Go to your repository Settings → Secrets and variables → Actions:
```
NETLIFY_AUTH_TOKEN: Your Netlify personal access token
NETLIFY_SITE_ID: Your Netlify site ID
```

#### Step 2: Get Netlify Credentials
```bash
# Get your personal access token from: https://app.netlify.com/user/applications#personal-access-tokens
# Get your site ID from: netlify sites:list
```

#### Step 3: Push and Deploy
The workflow will automatically deploy on pushes to main/master branch.

## ⚙️ Configuration Files

### netlify.toml
The `netlify.toml` file is pre-configured with:
- Build settings for Nuxt 4
- Environment variables
- Redirect rules for SPA fallback
- Security headers
- Cache optimization for static assets

### deploy-netlify.sh
Automated deployment script that:
- Checks for Netlify CLI installation
- Verifies authentication
- Builds the application
- Deploys to production

## 🌐 Custom Domain (Optional)

### Step 1: Add Custom Domain
1. Go to your site settings in Netlify
2. Click **"Domain management"**
3. Add your custom domain

### Step 2: Configure DNS
Follow Netlify's DNS configuration instructions.

## 🔧 Environment Variables

Add these in Netlify dashboard under Site settings → Environment variables:

```bash
# Required
NODE_VERSION=20
NPM_FLAGS=--production=false

# Application Configuration
NUXT_PUBLIC_SITE_URL=https://your-domain.com
NUXT_PUBLIC_API_URL=https://your-api.com

# Optional Features
ENABLE_MOCK_DATA=true  # Use mock data instead of real API
JWT_SECRET=your-secret-key  # For authentication (if using server-side auth)
```

## 🚀 Build Optimization

### Nuxt-Specific Optimizations
- **SSR Enabled**: Server-side rendering for better SEO and performance
- **Code Splitting**: Automatic chunk splitting for vendors, UI, and utilities
- **Asset Optimization**: Fonts, images, and static assets are cached aggressively
- **Compression**: Public assets are compressed automatically

### Performance Monitoring
```bash
# Analyze bundle size
npm install -g vite-bundle-analyzer
vite-bundle-analyzer .output/public
```

## 🔍 Troubleshooting

### Build Fails
```bash
# Check build logs in Netlify dashboard
# Test build locally first
npm run build
npm run preview
```

### Common Issues
- **Missing Dependencies**: Ensure all dependencies are in package.json
- **Node Version**: Use Node 20 (specified in netlify.toml)
- **Memory Issues**: Large builds may need more memory
- **API Routes**: Ensure API endpoints are properly configured

### 404 Errors
- Check `netlify.toml` redirect rules
- Ensure SPA fallback is configured for client-side routing

### Slow Builds
- Use Netlify's build cache
- Minimize dependencies
- Consider using build hooks for long builds

## 📊 Monitoring & Analytics

### Enable Analytics
1. Go to Site settings → Analytics
2. Enable Netlify Analytics

### Performance Monitoring
- Use Netlify's speed insights
- Monitor Core Web Vitals
- Set up uptime monitoring

## 🔒 Security

The deployment includes comprehensive security headers:
- **X-Frame-Options**: DENY (prevents clickjacking)
- **X-XSS-Protection**: Enabled (cross-site scripting protection)
- **X-Content-Type-Options**: nosniff (prevents MIME type sniffing)
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Content-Security-Policy**: Configured for security

## 🎯 Nuxt 4 Features Optimized

### Server-Side Rendering (SSR)
- Full SSR support for better SEO
- Automatic static generation where possible
- Optimized for performance and Core Web Vitals

### Internationalization (i18n)
- Multi-language support (English/Farsi)
- RTL support for Persian language
- SEO-friendly language handling

### Modern Build System
- Vite-powered build system
- Tree-shaking and dead code elimination
- Optimized dependency handling

## 🎉 Success!

Once deployed, your God Panel application will be available at:
- `https://your-site-name.netlify.app`
- Or your custom domain

### Features Available:
- ✅ Full admin dashboard
- ✅ Authentication system
- ✅ Responsive design
- ✅ Dark/light theme switching
- ✅ Multi-language support
- ✅ Settings panel
- ✅ Analytics and monitoring

## 📞 Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Nuxt 4 Deployment Guide](https://nuxt.com/docs/getting-started/deployment)
- [God Panel Issues](https://github.com/god-plans/god-panel-nuxt/issues)

---

**Happy Deploying! 🚀**

## 📝 Quick Start Commands

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login to Netlify
netlify login

# 3. Deploy using the script
./deploy-netlify.sh

# Or deploy manually
npm run build && netlify deploy --dir=.output/public --prod
```
