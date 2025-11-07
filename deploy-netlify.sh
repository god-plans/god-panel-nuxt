#!/bin/bash

# God Panel Nuxt - Netlify Deployment Script
# This script builds and deploys the Nuxt application to Netlify

set -e

echo "🚀 Starting God Panel Nuxt deployment to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI is not installed. Please install it first:"
    echo "npm install -g netlify-cli"
    exit 1
fi

# Check if user is logged in to Netlify
if ! netlify status &> /dev/null; then
    echo "❌ Not logged in to Netlify. Please login first:"
    echo "netlify login"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the application (static generation for Netlify)
echo "🔨 Building Nuxt application..."
npm run generate

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
netlify deploy --dir=.output/public --prod

echo "✅ Deployment completed successfully!"
echo "🎉 Your God Panel application is now live on Netlify!"

# Show deployment URL if available
if command -v netlify &> /dev/null; then
    echo ""
    echo "🌐 Deployment URL:"
    netlify status | grep -E "Site URL|Admin URL" || echo "Check your Netlify dashboard for the deployment URL"
fi