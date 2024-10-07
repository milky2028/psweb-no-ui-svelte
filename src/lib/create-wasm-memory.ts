import { getMemory } from './memory.svelte';

declare global {
	interface Window {
		Module: {
			wasmMemory: WebAssembly.Memory;
			onRuntimeInitialized: VoidFunction;
			create_opfs_backend: (cb: VoidFunction) => void;
		};
	}
}

const WASM_BLOCK_SIZE = 65536;
const ONE_GIBIBYTE = 1024 * 1024 * 1024;

export function createWASMMemory() {
	const toAllot = getMemory();

	const memory = new WebAssembly.Memory({
		initial: (toAllot * ONE_GIBIBYTE) / WASM_BLOCK_SIZE,
		maximum: (4 * ONE_GIBIBYTE) / WASM_BLOCK_SIZE,
		shared: true,
	});

	window.Module = window.Module || {};
	window.Module.wasmMemory = memory;
}
