import { logger } from '~/services/logger.service'

export default defineNuxtPlugin(() => {
  // Initialize logger
  logger.init()

  // Configure logger based on environment
  const runtimeConfig = useRuntimeConfig()

  if (runtimeConfig.public.appEnv === 'production') {
    logger.setLevel(2) // WARN level for production
    logger.setConsoleLogging(true)

    // Enable remote logging if configured
    const remoteLoggingUrl = process.env.LOGGING_URL
    const remoteLoggingKey = process.env.LOGGING_API_KEY

    if (remoteLoggingUrl) {
      logger.setRemoteLogging(true, remoteLoggingUrl, remoteLoggingKey)
    }
  } else {
    logger.setLevel(0) // DEBUG level for development
    logger.setConsoleLogging(true)
  }

  // Provide logger globally
  return {
    provide: {
      logger
    }
  }
})
