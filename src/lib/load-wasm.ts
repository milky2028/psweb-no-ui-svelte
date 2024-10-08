let wasmRequest: ReturnType<typeof fetch> | undefined = undefined;

let doWasmLoad: VoidFunction | undefined = undefined;
const wasmShouldBeLoaded = new Promise<void>((resolve) => {
	doWasmLoad = resolve;
});

const originalFetch = fetch;
globalThis.fetch = async (...args) => {
	if (typeof args[0] === 'string' && args[0].includes('.wasm')) {
		await wasmShouldBeLoaded;
		wasmRequest = originalFetch(...args);
		return wasmRequest;
	}

	return originalFetch(...args);
};

const createOPFSBackendAsync = () =>
	new Promise<void>((resolve) => {
		window.Module.create_opfs_backend(() => resolve());
	});

export async function loadWASM() {
	doWasmLoad?.();
	await wasmRequest;

	return new Promise<void>((resolve) => {
		window.Module.onRuntimeInitialized = async () => {
			await createOPFSBackendAsync();

			resolve();
		};
	});
}
