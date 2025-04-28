type ShouldDebugOptions = {
	tag: string;
	debugArgumentName: string;
	allTag: string;
};

/**
 * @description
 * Use this helper to determine if the given tag should be logged as a debug log.
 */
export const shouldDebug = (options: ShouldDebugOptions) => {
	const { tag, debugArgumentName, allTag } = options;

	try {
		const debugArg = process.env[debugArgumentName] || '';

		if (!debugArg) {
			return false;
		}

		const target = debugArg || '';

		if (target.length === 0) {
			return false;
		}

		switch (true) {
			case target === allTag: {
				return true;
			}

			case typeof target === 'string': {
				return target.split(',').includes(tag);
			}

			default: {
				return false;
			}
		}
	} catch {
		return false;
	}
};

export type ShouldDebug = typeof shouldDebug;
