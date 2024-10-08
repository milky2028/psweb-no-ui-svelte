import { getMemory } from './memory.svelte';
import requiredDataURL from '$lib/apollo/apollo_web_required.data?url';
import wasmURL from '$lib/apollo/apollo_web.wasm?url';

type Doc = {
	make_renderer: (
		viewId: number,
		callback: VoidFunction,
		colorProfile: number,
		renderAreaMode: number,
	) => void;
};

type App = {
	tools: () => {
		select: (toolId: number) => void;
		place_tool: () => { place_new: (path: string) => void };
	};
	init: VoidFunction;
	connect_exception_handler: (cb: VoidFunction) => void;
	connect_notification_handler: (cb: VoidFunction) => void;
	documents: () => {
		unopened: (name: string) => Doc;
		client_target: () => { value: () => Doc };
	};
};

declare global {
	interface Window {
		app: App;
		Module: {
			locateFile: (url: string) => string;
			wasmMemory: WebAssembly.Memory;
			onRuntimeInitialized: VoidFunction;
			create_opfs_backend: (cb: VoidFunction) => void;
			Application: {
				new (settings: unknown): App;
			};
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
	window.Module.locateFile = (url: string) => {
		if (url.endsWith('.data')) {
			return requiredDataURL;
		}

		if (url.includes('.wasm')) {
			return wasmURL;
		}

		return url;
	};
}
