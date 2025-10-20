// Logging levels
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

// Log entry interface
export interface LogEntry {
  level: LogLevel
  message: string
  timestamp: Date
  context?: Record<string, any>
  userId?: string
  sessionId?: string
  url?: string
  userAgent?: string
  error?: Error
  stack?: string
}

// Logger configuration
interface LoggerConfig {
  level: LogLevel
  enableConsole: boolean
  enableRemote: boolean
  maxEntries: number
  remoteUrl?: string
  apiKey?: string
  environment: string
  appVersion: string
}

// Logger service class
export class LoggerService {
  private config: LoggerConfig
  private entries: LogEntry[] = []
  private isInitialized = false

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: LogLevel.INFO,
      enableConsole: true,
      enableRemote: false,
      maxEntries: 1000,
      environment: 'development',
      appVersion: '1.0.0',
      ...config
    }
  }

  // Initialize logger
  init() {
    if (this.isInitialized) return
    this.isInitialized = true

    // Load configuration from runtime config
    if (process.client) {
      const runtimeConfig = useRuntimeConfig()
      if (runtimeConfig.public) {
        this.config.environment = (runtimeConfig.public as any).appEnv || 'development'
        this.config.appVersion = runtimeConfig.public.version || '1.0.0'
      }
    }

    console.log('🪵 Logger initialized:', {
      level: LogLevel[this.config.level],
      environment: this.config.environment,
      version: this.config.appVersion
    })
  }

  // Set log level
  setLevel(level: LogLevel) {
    this.config.level = level
  }

  // Enable/disable console logging
  setConsoleLogging(enabled: boolean) {
    this.config.enableConsole = enabled
  }

  // Enable/disable remote logging
  setRemoteLogging(enabled: boolean, url?: string, apiKey?: string) {
    this.config.enableRemote = enabled
    if (url) this.config.remoteUrl = url
    if (apiKey) this.config.apiKey = apiKey
  }

  // Debug logging
  debug(message: string, context?: Record<string, any>) {
    this.log(LogLevel.DEBUG, message, context)
  }

  // Info logging
  info(message: string, context?: Record<string, any>) {
    this.log(LogLevel.INFO, message, context)
  }

  // Warning logging
  warn(message: string, context?: Record<string, any>) {
    this.log(LogLevel.WARN, message, context)
  }

  // Error logging
  error(message: string | Error, context?: Record<string, any>) {
    const error = message instanceof Error ? message : new Error(message)
    this.log(LogLevel.ERROR, error.message, { ...context, error, stack: error.stack })
  }

  // Fatal logging
  fatal(message: string | Error, context?: Record<string, any>) {
    const error = message instanceof Error ? message : new Error(message)
    this.log(LogLevel.FATAL, error.message, { ...context, error, stack: error.stack })
  }

  // Generic logging method
  private log(level: LogLevel, message: string, context?: Record<string, any>) {
    // Check if we should log this level
    if (level < this.config.level) return

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context,
      userId: this.getCurrentUserId(),
      sessionId: this.getSessionId(),
      url: process.client ? window.location.href : undefined,
      userAgent: process.client ? navigator.userAgent : undefined
    }

    // Add to entries
    this.entries.unshift(entry)
    if (this.entries.length > this.config.maxEntries) {
      this.entries = this.entries.slice(0, this.config.maxEntries)
    }

    // Console logging
    if (this.config.enableConsole) {
      this.logToConsole(entry)
    }

    // Remote logging
    if (this.config.enableRemote && this.shouldSendRemote(level)) {
      this.logToRemote(entry)
    }
  }

  // Log to console
  private logToConsole(entry: LogEntry) {
    const prefix = `[${entry.timestamp.toISOString()}] [${LogLevel[entry.level]}]`
    const message = `${prefix} ${entry.message}`

    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(message, entry.context)
        break
      case LogLevel.INFO:
        console.info(message, entry.context)
        break
      case LogLevel.WARN:
        console.warn(message, entry.context)
        break
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(message, entry.context, entry.stack)
        break
    }
  }

  // Log to remote service
  private async logToRemote(entry: LogEntry) {
    if (!this.config.remoteUrl) return

    try {
      const payload = {
        level: LogLevel[entry.level],
        message: entry.message,
        timestamp: entry.timestamp.toISOString(),
        context: entry.context,
        userId: entry.userId,
        sessionId: entry.sessionId,
        url: entry.url,
        userAgent: entry.userAgent,
        environment: this.config.environment,
        appVersion: this.config.appVersion
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      }

      if (this.config.apiKey) {
        headers['Authorization'] = `Bearer ${this.config.apiKey}`
      }

      await fetch(this.config.remoteUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      }).catch(err => {
        // Don't log remote logging failures to avoid infinite loops
        console.warn('Failed to send log to remote service:', err)
      })
    } catch (error) {
      // Silently fail for remote logging
    }
  }

  // Check if we should send to remote
  private shouldSendRemote(level: LogLevel): boolean {
    // Only send warnings and above in production
    if (this.config.environment === 'production') {
      return level >= LogLevel.WARN
    }
    // Send all logs in development/staging
    return true
  }

  // Get current user ID
  private getCurrentUserId(): string | undefined {
    if (!process.client) return undefined

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      return user.id
    } catch {
      return undefined
    }
  }

  // Get session ID
  private getSessionId(): string | undefined {
    if (!process.client) return undefined

    let sessionId = localStorage.getItem('session_id')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('session_id', sessionId)
    }
    return sessionId
  }

  // Get all log entries
  getEntries(): LogEntry[] {
    return [...this.entries]
  }

  // Get entries by level
  getEntriesByLevel(level: LogLevel): LogEntry[] {
    return this.entries.filter(entry => entry.level === level)
  }

  // Get recent entries
  getRecentEntries(minutes: number = 5): LogEntry[] {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000)
    return this.entries.filter(entry => entry.timestamp > cutoff)
  }

  // Clear log entries
  clearEntries(): void {
    this.entries = []
  }

  // Export logs
  exportLogs(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      const headers = ['timestamp', 'level', 'message', 'userId', 'sessionId', 'url']
      const rows = this.entries.map(entry => [
        entry.timestamp.toISOString(),
        LogLevel[entry.level],
        `"${entry.message.replace(/"/g, '""')}"`,
        entry.userId || '',
        entry.sessionId || '',
        entry.url || ''
      ])

      return [headers, ...rows].map(row => row.join(',')).join('\n')
    }

    return JSON.stringify(this.entries, null, 2)
  }

  // Performance logging
  time(label: string): () => void {
    const start = performance.now()
    this.debug(`Timer started: ${label}`)

    return () => {
      const end = performance.now()
      const duration = end - start
      this.info(`Timer ended: ${label}`, { duration: `${duration.toFixed(2)}ms` })
    }
  }

  // User action logging
  logUserAction(action: string, details?: Record<string, any>) {
    this.info(`User action: ${action}`, {
      action,
      ...details,
      userId: this.getCurrentUserId(),
      sessionId: this.getSessionId()
    })
  }
}

// Create singleton instance
export const logger = new LoggerService()

// Export default
export default logger
