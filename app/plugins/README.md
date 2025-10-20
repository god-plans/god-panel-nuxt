# Global Error Handling System

This directory contains the comprehensive error handling system for the God Panel application, providing robust error capture, logging, reporting, and user-friendly error boundaries.

## 🛡️ Overview

The error handling system consists of:

1. **Global Error Handler Plugin** (`error-handler.client.ts`) - Captures all JavaScript errors
2. **Error Boundary Components** - Graceful error UI components
3. **Toast Notification System** - User-friendly notifications
4. **Logger Service** - Structured logging with external service integration
5. **Error Handler Composable** - Easy error handling in components

## 🚀 Quick Start

### Basic Error Handling

```typescript
// In any component
import { useErrorHandler } from '~/composables/useErrorHandler'

const { handleError, handleAsync } = useErrorHandler()

// Handle synchronous errors
try {
  riskyOperation()
} catch (error) {
  handleError(error, {
    toastMessage: 'Operation failed',
    context: { operation: 'riskyOperation' }
  })
}

// Handle async operations
const result = await handleAsync(
  () => apiCall(),
  {
    toastMessage: 'Failed to load data',
    onSuccess: (data) => console.log('Success:', data),
    onError: (error) => console.log('Error handled:', error)
  }
)
```

### Using Error Boundaries

```vue
<template>
  <!-- Wrap components that might error -->
  <ErrorBoundary
    title="Component Error"
    :show-retry="true"
    @retry="reloadComponent"
  >
    <RiskyComponent />
  </ErrorBoundary>
</template>
```

### Toast Notifications

```typescript
import { useToast } from '~/composables/useToast'

const { success, error, warning, info, loading } = useToast()

// Show different types of toasts
success('Operation completed successfully!')
error('Something went wrong')
warning('Please check your input')
info('New feature available')

// Loading toast with promise
const result = await loading('Saving...', {
  promise: saveData(),
  success: 'Data saved successfully!',
  error: 'Failed to save data'
})
```

## 📋 Components

### ErrorBoundary.vue
Graceful error handling for individual components.

**Props:**
- `title` - Error title
- `showMessage` - Show error message
- `showDetails` - Show error details (dev only)
- `showRetry` - Show retry button
- `showReport` - Show report button
- `showHome` - Show home button

**Events:**
- `retry` - Emitted when retry button clicked
- `error` - Emitted when error occurs

### PageErrorBoundary.vue
Full-page error handling for route-level errors.

**Props:**
- `error` - Error object
- `loading` - Loading state
- `showDetails` - Show debug info

### ToastContainer.vue & ToastItem.vue
Toast notification system with multiple positions and types.

## 🔧 Configuration

### Environment Variables

```bash
# Error Reporting
LOGGING_URL=https://api.loggingservice.com/v1/logs
LOGGING_API_KEY=your-api-key
ENABLE_ERROR_REPORTING=true

# Toast Settings
TOAST_POSITION=bottom-right
TOAST_DURATION=5000
```

### Runtime Configuration

```typescript
// nuxt.config.ts
runtimeConfig: {
  public: {
    enableErrorReporting: process.env.ENABLE_ERROR_REPORTING === 'true',
    toastPosition: process.env.TOAST_POSITION || 'bottom-right',
    toastDuration: parseInt(process.env.TOAST_DURATION || '5000')
  }
}
```

## 📊 Error Types & Severity

### Error Types
- `NETWORK` - Network/API failures
- `API` - API response errors
- `VALIDATION` - Form validation errors
- `AUTHENTICATION` - Login/auth failures
- `AUTHORIZATION` - Permission errors
- `BUSINESS_LOGIC` - Application logic errors
- `RUNTIME` - JavaScript runtime errors
- `UNKNOWN` - Unclassified errors

### Severity Levels
- `LOW` - Debug info, warnings
- `MEDIUM` - User-impact warnings
- `HIGH` - Significant errors
- `CRITICAL` - System-breaking errors

## 📝 Logging

### Logger Service

```typescript
import { logger } from '~/services/logger.service'

// Different log levels
logger.debug('Debug message', { context: 'data' })
logger.info('Info message')
logger.warn('Warning message')
logger.error('Error message')
logger.fatal('Critical error')

// Performance timing
const endTimer = logger.time('operation-name')
// ... operation ...
endTimer()

// User action logging
logger.logUserAction('button-clicked', { buttonId: 'save' })
```

### Log Export

```typescript
// Export logs for debugging
const logsJson = logger.exportLogs('json')
const logsCsv = logger.exportLogs('csv')
```

## 🔍 Error Monitoring

### Error History

```typescript
const { getErrors, getRecentErrors } = useErrorHandler()

// Get all errors
const allErrors = getErrors()

// Get errors from last 10 minutes
const recentErrors = getRecentErrors(10)
```

### Error Reporting

Errors are automatically:
- Logged to console (development)
- Sent to external logging service (production)
- Stored in memory for debugging
- Shown to users via toast notifications

## 🎯 Best Practices

### 1. Use Error Boundaries Strategically

```vue
<template>
  <!-- Wrap critical sections -->
  <ErrorBoundary title="Dashboard Error">
    <DashboardWidgets />
  </ErrorBoundary>

  <!-- Don't wrap simple components -->
  <SimpleButton />
</template>
```

### 2. Provide Context

```typescript
handleError(error, {
  context: {
    userId: currentUser.id,
    action: 'save-profile',
    formData: { name, email }
  }
})
```

### 3. Use Appropriate Toast Types

```typescript
// Success for completed actions
success('Profile updated successfully!')

// Error for failures
error('Failed to save changes')

// Warning for attention needed
warning('Please verify your email')

// Info for general notifications
info('New version available')
```

### 4. Handle Async Operations

```typescript
const { handleAsync } = useErrorHandler()

const saveData = async () => {
  return await handleAsync(
    () => api.save(data),
    {
      toastMessage: 'Failed to save data',
      onSuccess: () => navigateTo('/success'),
      onError: (error) => console.log('Save failed:', error)
    }
  )
}
```

## 🔗 Integration Points

### With API Service

The error handler automatically integrates with the API service:

```typescript
// API errors are automatically handled
const response = await apiClient.get('/data')
// Network errors show toast notifications
// API errors are logged with context
```

### With Authentication

Authentication errors trigger automatic logout:

```typescript
// 401 errors automatically redirect to login
// Token refresh failures are handled gracefully
```

### With Vue Router

Route-level errors are caught by the error page:

```typescript
// Automatic fallback to error.vue page
// Error context preserved for debugging
```

## 🧪 Testing

### Error Boundary Testing

```typescript
// Test error boundary
const wrapper = mount(ErrorBoundary, {
  slots: {
    default: '<div>Error throwing component</div>'
  }
})

// Simulate error
wrapper.vm.$emit('error', new Error('Test error'))
```

### Toast Testing

```typescript
// Mock toast service
vi.mock('~/services/toast.service')

// Test toast calls
expect(toastService.success).toHaveBeenCalledWith('Success!')
```

## 🚨 Production Considerations

### Error Reporting

- Configure external logging service (Sentry, LogRocket, etc.)
- Set appropriate log levels for production
- Monitor error rates and user impact

### Performance

- Error boundaries prevent cascading failures
- Toast system uses efficient rendering
- Logger limits memory usage (max 1000 entries)

### Security

- Error messages don't expose sensitive data
- User context is sanitized before logging
- External services use secure API keys

This error handling system provides comprehensive coverage for all error scenarios while maintaining excellent user experience and developer debugging capabilities.
