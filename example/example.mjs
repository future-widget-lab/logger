import { createLogger } from '../dist/logger.esm.js';

const logger = createLogger({
	level: 'debug',
	allTag: 'all'
});

logger.debug('auth-module', { user: 'test' }, 'Authentication successful');

logger.info({}, 'Application started');
logger.debug('auth-module', { ok: true }, 'Systems online.');
logger.error({ errorCode: 500 }, 'Internal server error');
