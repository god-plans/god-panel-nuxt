# API Service Layer

This directory contains the complete API service layer for the God Panel application, implementing a robust, scalable, and maintainable architecture for API communication.

## 🏗️ Architecture Overview

### Core Components

1. **API Client** (`api-client.ts`) - Base HTTP client with interceptors, retry logic, and caching
2. **Repository Pattern** (`repository.ts`) - Generic data access layer
3. **Service Classes** - Domain-specific business logic
4. **Configuration** (`../config/index.ts`) - Environment and API configuration
5. **Constants** (`../constants/api.ts`) - API endpoints and constants

### Directory Structure

```
services/
├── api-client.ts          # Core API client with axios
├── repository.ts          # Base repository pattern implementation
├── auth.service.ts        # Authentication service
├── user.service.ts        # User management service
├── dashboard.service.ts   # Dashboard data service
├── settings.service.ts    # Settings management service
├── index.ts               # Service registry and exports
└── README.md             # This documentation
```

## 🚀 Quick Start

### Basic Usage

```typescript
// Import services
import { authService, userService, dashboardService } from '~/services'

// Or use the service registry
import { services } from '~/services'
const { auth, users, dashboard } = services
```

### Authentication

```typescript
// Login
const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
})

if (response.success) {
  console.log('Logged in:', response.data.user)
  // Tokens are automatically stored
}

// Get current user profile
const profile = await authService.getProfile()

// Logout
await authService.logout()
```

### User Management

```typescript
// Get all users with pagination
const users = await userService.findPaginated(1, 10)

// Get specific user
const user = await userService.findById('user-id')

// Create new user
const newUser = await userService.create({
  displayName: 'John Doe',
  email: 'john@example.com',
  role: 'user'
})

// Update user
const updatedUser = await userService.update('user-id', {
  displayName: 'Jane Doe'
})
```

### Dashboard Data

```typescript
// Get dashboard statistics
const stats = await dashboardService.getStats()

// Get overview with recent activity
const overview = await dashboardService.getOverview()

// Get analytics data
const analytics = await dashboardService.getAnalytics({
  startDate: '2024-01-01',
  endDate: '2024-12-31'
})
```

## 🔧 Advanced Features

### Caching

The API client includes automatic caching for GET requests:

```typescript
// Data is automatically cached for 5 minutes
const users = await userService.findAll()

// Force refresh (bypass cache)
const freshUsers = await userService.findAll({ noCache: true })

// Clear specific cache
userService.clearCache()
```

### Retry Logic

Automatic retry for failed requests with exponential backoff:

```typescript
// Configurable retry settings in config/api.ts
RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  RETRY_MULTIPLIER: 2,
  RETRY_STATUS_CODES: [408, 429, 500, 502, 503, 504],
}
```

### Error Handling

Comprehensive error handling with typed errors:

```typescript
try {
  const response = await userService.findById('invalid-id')
} catch (error: any) {
  switch (error.type) {
    case 'UNAUTHORIZED':
      // Handle auth errors
      break
    case 'NOT_FOUND':
      // Handle 404 errors
      break
    case 'NETWORK':
      // Handle network errors
      break
  }
}
```

### Request/Response Interceptors

Automatic token handling, logging, and error processing:

```typescript
// Tokens are automatically added to requests
// 401 responses trigger automatic logout
// Requests are logged in development
```

## 🎣 Composables

Use reactive composables for Vue components:

```typescript
// In a Vue component
import { useAuth, useUsers, useApiData } from '~/composables/useApi'

export default defineComponent({
  setup() {
    const { login, logout } = useAuth()
    const { getUsers } = useUsers()

    // Reactive data fetching
    const { data: users, loading, error } = useApiData(
      () => getUsers(),
      { immediate: true }
    )

    return {
      users,
      loading,
      error,
      login,
      logout
    }
  }
})
```

## ⚙️ Configuration

### Environment Variables

```bash
# API Configuration
NUXT_PUBLIC_API_URL=http://localhost:4000
API_TIMEOUT=10000

# Authentication
JWT_SECRET=your-secret-key
REFRESH_TOKEN_EXPIRY=7d

# Features
ENABLE_MOCK_DATA=false
ENABLE_API_LOGGING=true

# App
NUXT_PUBLIC_APP_NAME="God Panel"
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

### API Configuration

Configure timeouts, retries, and caching in `config/index.ts`:

```typescript
export const apiConfig = {
  baseURL: config.API_URL,
  timeout: config.API_TIMEOUT,
  retries: 3,
  retryDelay: 1000,
  enableLogging: config.ENABLE_API_LOGGING,
}
```

## 📚 API Reference

### ApiClient Methods

```typescript
// HTTP Methods
await apiClient.get<T>(url, config?)
await apiClient.post<T>(url, data?, config?)
await apiClient.put<T>(url, data?, config?)
await apiClient.patch<T>(url, data?, config?)
await apiClient.delete<T>(url, config?)

// Utility Methods
apiClient.clearCache()           // Clear all cache
apiClient.clearCacheKey(key)     // Clear specific cache entry
```

### Repository Pattern

All services extend `BaseRepository` with common CRUD operations:

```typescript
class CustomService extends BaseRepository<Entity> {
  // Automatic CRUD methods available:
  // findAll(), findById(), create(), update(), delete()
  // findPaginated(), search(), bulkCreate(), etc.

  // Add custom methods
  async customMethod() {
    // Implementation
  }
}
```

## 🧪 Testing

Services are designed to be easily testable:

```typescript
// Mock the API client
vi.mock('~/services/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    // ... other methods
  }
}))

// Test your service
describe('UserService', () => {
  it('should get users', async () => {
    const mockUsers = [{ id: '1', name: 'Test' }]
    ;(apiClient.get as any).mockResolvedValue({
      success: true,
      data: mockUsers
    })

    const result = await userService.findAll()
    expect(result.data).toEqual(mockUsers)
  })
})
```

## 🔒 Security

- Automatic JWT token handling
- Secure token storage in localStorage
- Automatic logout on token expiration
- Request/response data validation
- XSS protection through proper encoding

## 📊 Performance

- Request deduplication
- Intelligent caching
- Lazy loading of services
- Minimal bundle size impact
- Optimized for both SSR and SPA modes

## 🚨 Error Handling

Comprehensive error handling for:

- Network failures
- Authentication errors
- Validation errors
- Server errors
- Timeout errors

## 🔄 Migration Guide

### From Old Axios Plugin

```typescript
// Old way
const { $axios } = useNuxtApp()
await $axios.get('/users')

// New way
import { userService } from '~/services'
await userService.findAll()

// Or using composables
const { getUsers } = useUsers()
await getUsers()
```

This service layer provides a solid foundation for scalable API communication with excellent developer experience and maintainability.
