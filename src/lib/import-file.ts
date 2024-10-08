function getFile(event: Event) {
	if (event.target && 'files' in event.target && event.target.files instanceof FileList) {
		return event.target.files[0];
	}

	return null;
}

export function importFile() {
	return new Promise<void>((resolve) => {
		const input = document.createElement('input');
		input.type = 'file';

		input.addEventListener('change', (event) => {
			const file = getFile(event);
			console.log(event);

			if (file) {
				const worker = new Worker(new URL('./write-worker.ts', import.meta.url));
				worker.postMessage({ file });

				worker.addEventListener('message', () => {
					resolve();

					worker.terminate();
					input.remove();
				});
			}
		});

		input.click();
	});
}
