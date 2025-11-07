# 🚀 Netlify Deployment Guide for God Panel Nuxt

This guide covers deploying your God Panel Nuxt application to Netlify.

## 📋 Prerequisites

- [Netlify Account](https://app.netlify.com/)
- Node.js 20+ installed
- Git repository

## 🎯 Deployment Methods

### Method 1: Git-Based Deployment (Recommended)

#### Step 1: Connect Repository to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git provider (GitHub, GitLab, Bitbucket)
4. Select your repository

#### Step 2: Configure Build Settings
```
Build command: npm run generate
Publish directory: .output/public
Node version: 20
```

#### Step 3: Environment Variables (Optional)
```
NUXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
NUXT_PUBLIC_API_URL=https://your-api-endpoint.com
ENABLE_MOCK_DATA=true  # For demo purposes
```

#### Step 4: Deploy
- Click **"Deploy site"**
- Netlify will automatically build and deploy on every push to main branch

### Method 2: Manual CLI Deployment

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
# Build the application (static generation)
npm run generate

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
npm run generate
```

#### Step 2: Deploy via Netlify Dashboard
1. Go to [Netlify Sites](https://app.netlify.com/)
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop the `.output/public` folder
4. Click **"Deploy site"**

## ⚙️ Configuration Files

### netlify.toml
The `netlify.toml` file is pre-configured with:
- Build settings for Nuxt 4 static generation
- Environment variables
- Redirect rules for SPA fallback
- Security headers
- Cache optimization

### deploy-netlify.sh
Automated deployment script that:
- Checks for Netlify CLI installation
- Verifies authentication
- Builds the application using static generation
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
# Required for static generation
NODE_VERSION=20
NPM_FLAGS=--production=false

# Application Configuration
NUXT_PUBLIC_SITE_URL=https://your-domain.com
NUXT_PUBLIC_API_URL=https://your-api.com

# Optional Features
ENABLE_MOCK_DATA=true  # Use mock data instead of real API
```

## 🚀 Build Optimization

### Nuxt Static Generation
- **Static Site Generation**: `npm run generate` creates static HTML files
- **SPA Fallback**: Client-side routing works with Netlify redirects
- **Asset Optimization**: Automatic code splitting and minification

### Performance Features
- Large bundles are split automatically
- Static assets are cached for 1 year
- Images are optimized by Netlify

## 🔍 Troubleshooting

### Build Fails
```bash
# Check build logs in Netlify dashboard
# Test build locally first
npm run generate
npm run preview
```

### Common Issues
- **Missing Dependencies**: Ensure all dependencies are in package.json
- **Node Version**: Use Node 20 (specified in netlify.toml)
- **Memory Issues**: Large builds may need more memory

### 404 Errors
- Check `netlify.toml` redirect rules
- Ensure SPA fallback is configured

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

## 🔒 Security

The deployment includes security headers:
- **X-Frame-Options**: DENY (prevents clickjacking)
- **X-XSS-Protection**: Enabled
- **X-Content-Type-Options**: nosniff
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Content-Security-Policy**: Configured for security

## 🎯 Key Differences: Build vs Generate

| Command | Purpose | Output | Use Case |
|---------|---------|--------|----------|
| `npm run build` | Server build | `.output/server` | Node.js hosting |
| `npm run generate` | Static generation | `.output/public` | Static hosting (Netlify) |

For Netlify, always use `npm run generate` for static site generation.

## 🎉 Success!

Once deployed, your God Panel application will be available at:
- `https://your-site-name.netlify.app`
- Or your custom domain

### Features Available:
- ✅ Full admin dashboard
- ✅ Responsive design
- ✅ Authentication system
- ✅ Dark/light theme switching
- ✅ Multi-language support
- ✅ Settings panel

## 📞 Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Nuxt Deployment Guide](https://nuxt.com/docs/getting-started/deployment)

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
npm run generate && netlify deploy --dir=.output/public --prod
```