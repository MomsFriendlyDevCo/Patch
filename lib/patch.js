import _ from 'lodash';

export default function patch(a, b, options) {
	let settings = {
		isEqual: _.isEqual,
		cloneDeep: _.cloneDeep,
		path: [],
		scalarTypes: [Buffer, Date, Map, Set],
		default: {},
		...options,
	};

	if (settings.isEqual(a, b)) {
		if (settings.path.length == 0) return settings.default;
		return;
	} else if (Array.isArray(a) && Array.isArray(b)) { // Treat arrays as atomic
		return settings.cloneDeep(b);
	} else if (
		typeof a == 'object' && typeof b == 'object'
		&& !settings.scalarTypes.some(ty => b instanceof ty)
	) {
		return Object.fromEntries(
			Array.from(new Set([...Object.keys(a), ...Object.keys(b)]))
				.map(key => [
					key,
					patch(a[key], b[key], {
						...settings,
						path: settings.path.concat([key]),
					}),
				])
				.filter(([, val]) => val !== undefined) // Remove unef values
		);
	} else {
		return b;
	}
}
