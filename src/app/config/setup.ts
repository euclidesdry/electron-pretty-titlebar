export default function setup() {
	if ('type' in process && process.type !== 'browser') {
		console.warn('!Titlebar Alert!: type is not supported');
		return;
	}

	console.log('?Titlebar Message?: Setup complete!');
}
