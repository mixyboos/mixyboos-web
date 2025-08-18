import pino from 'pino'

const mixin = {
  appName: 'MixyBoos',
  target: 'pino-pretty',
}

// Create the base pino logger
const pinoLogger = pino({
  browser: {
    asObject: true,
    write: (obj) => {
      console.log(JSON.stringify(obj))
    },
  },
  mixin() {
    return mixin
  },
})

// Create a console-compatible wrapper
const logger = {
  // Standard pino methods (structured logging)
  info: pinoLogger.info.bind(pinoLogger),
  warn: pinoLogger.warn.bind(pinoLogger),
  error: pinoLogger.error.bind(pinoLogger),
  debug: pinoLogger.debug.bind(pinoLogger),
  trace: pinoLogger.trace.bind(pinoLogger),
  fatal: pinoLogger.fatal.bind(pinoLogger),

  // Console-compatible methods that accept multiple arguments
  log: (...args: Array<unknown>) => {
    if (args.length === 1) {
      pinoLogger.info(args[0])
    } else {
      const [first, ...rest] = args
      pinoLogger.info({ data: rest }, String(first))
    }
  },

  // Alternative debug that handles multiple arguments like console.log
  debugLog: (...args: Array<unknown>) => {
    if (args.length === 1) {
      pinoLogger.debug(args[0])
    } else {
      const [first, ...rest] = args
      pinoLogger.debug({ data: rest }, String(first))
    }
  },

  // Alternative methods that handle multiple arguments
  infoLog: (...args: Array<unknown>) => {
    if (args.length === 1) {
      pinoLogger.info(args[0])
    } else {
      const [first, ...rest] = args
      pinoLogger.info({ data: rest }, String(first))
    }
  },

  warnLog: (...args: Array<unknown>) => {
    if (args.length === 1) {
      pinoLogger.warn(args[0])
    } else {
      const [first, ...rest] = args
      pinoLogger.warn({ data: rest }, String(first))
    }
  },

  errorLog: (...args: Array<unknown>) => {
    if (args.length === 1) {
      pinoLogger.error(args[0])
    } else {
      const [first, ...rest] = args
      pinoLogger.error({ data: rest }, String(first))
    }
  },
}

export default logger
