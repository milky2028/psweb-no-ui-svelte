export function loadScript(url: string) {
	return new Promise<void>((resolve, reject) => {
		const script = document.createElement('script');
		script.onload = () => resolve();
		script.onerror = () => reject();
		script.type = 'text/javascript';
		script.src = url;
		document.body.appendChild(script);
	});
}
