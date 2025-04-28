# @future-widget-lab/logger

An opinionated but minimal logger built on top of `loglevel`. It allows you to define custom log levels, emojis for different log types, and control debug level logs based on command-line arguments.

## Features

- Custom log levels and message formatting.
- Debug logging controlled by command-line arguments.
- Fine-grained control over debug visibility using tags.
- Emoji support for different log types.
- Optional side effects after a message is printed.

## Installation

```bash
npm install @future-widget-lab/logger
```

## Usage

### Basic Example

```typescript
import { createLogger } from '@future-widget-lab/logger';

const logger = createLogger({
	level: 'info'
});

logger.info({}, 'Application started');
logger.error({ errorCode: 500 }, 'Internal server error');
```

### Debugging

To enable debug logs for a specific tag, add the corresponding command-line arguments to the command.

```shell
node example.mjs DEBUG="auth-mode"
```

```typescript
const logger = createLogger({
	level: 'DEBUG',
	allTag: 'all',
	debugArgumentName: 'DEBUG'
});

logger.debug('auth-module', { user: 'test' }, 'Authentication successful');
```

You can also use the catch-all tag:

```shell
node example.mjs DEBUG="all"
```

### Customizing Log Emojis

```typescript
const logger = createLogger({
	level: 'info',
	debugEmoji: '🐛',
	errorEmoji: '❌',
	infoEmoji: 'ℹ️',
	traceEmoji: '🔍',
	warnEmoji: '⚠️'
});
```

### Handling Log Side Effects

You can perform custom actions after a log message is printed by using the `onAfterMessage` option. The logger handles formatting, while `onAfterMessage` can trigger side effects such as API calls.

```typescript
const logger = createLogger({
	level: 'info',
	onAfterMessage: ({ level, timestamp, payload, message }) => {
		sendLogToAnalytics({ level, timestamp, payload, message });
	}
});
```

## API Reference

### `createLogger(options: CreateLoggerOptions)`

Creates a new logger instance with the specified configuration options.

#### Options

| Option              | Type           | Default         | Description                                                   |
| ------------------- | -------------- | --------------- | ------------------------------------------------------------- |
| `level`             | `LogLevelDesc` |                 | Sets the default log level.                                   |
| `allTag`            | `string`       | `'all'`         | Catch-all tag for debug logs.                                 |
| `debugArgumentName` | `string`       | `'DEBUG'`       | Name of the command-line argument for debug logs.             |
| `shouldDebug`       | `ShouldDebug`  | Internal Helper | Custom function to determine if debug logs should be printed. |
| `debugEmoji`        | `string`       | `'🕵'`          | Emoji for debug logs.                                         |
| `errorEmoji`        | `string`       | `'📕'`          | Emoji for error logs.                                         |
| `infoEmoji`         | `string`       | `'📘'`          | Emoji for info logs.                                          |
| `traceEmoji`        | `string`       | `'📓'`          | Emoji for trace logs.                                         |
| `warnEmoji`         | `string`       | `'📒'`          | Emoji for warn logs.                                          |
| `onMessage`         | `function`     | `undefined`     | Custom message formatting handler.                            |
| `onAfterMessage`    | `function`     | `undefined`     | Side-effect handler after logging.                            |

#### Methods

- `debug(tag: string, object: object, message: string)`: Logs a debug message.
- `error(object: object, message: string)`: Logs an error message.
- `info(object: object, message: string)`: Logs an informational message.
- `trace(object: object, message: string)`: Logs a trace message.
- `warn(object: object, message?: string)`: Logs a warning message.

## License

MIT
