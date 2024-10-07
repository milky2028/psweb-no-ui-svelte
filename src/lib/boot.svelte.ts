import { createWASMMemory } from './create-wasm-memory';
import { loadScript } from './load-script';

export const DEFAULT_AUTOBOOT_CONFIG = {
	memory: false,
	glue: false,
	wasm: false,
	canvas: false,
	file: false,
	brush: false,
};

type StepIds = keyof typeof DEFAULT_AUTOBOOT_CONFIG;

export type BootStep = {
	id: StepIds;
	autorun: boolean;
	disabled: boolean;
	status: '' | '⏳' | '✅' | '❌';
	name: string;
	action: () => void | Promise<void>;
};

export const boot: BootStep[] = $state([
	{
		id: 'memory',
		autorun: false,
		disabled: false,
		status: '',
		name: 'Create WASM Memory',
		action: createWASMMemory,
	},
	{
		id: 'glue',
		autorun: false,
		disabled: false,
		status: '',
		name: 'Load Emscripten JS Glue Code',
		action: () => loadScript('/apollo_web.js'),
	},
	{
		id: 'wasm',
		autorun: false,
		disabled: false,
		status: '',
		name: 'Load WASM',
		action: () => console.log('loading wasm'),
	},
	{
		id: 'canvas',
		autorun: false,
		disabled: false,
		status: '',
		name: 'Create Canvas and Attach Renderer',
		action: () => console.log('creating canvas'),
	},
	{
		id: 'file',
		autorun: false,
		disabled: true,
		status: '',
		name: 'Import File and Open',
		action: () => console.log('importing file'),
	},
	{
		id: 'brush',
		autorun: false,
		disabled: true,
		status: '',
		name: 'Draw Brushstroke',
		action: () => console.log('drawing brushstroke'),
	},
]);

export const setAutorun = (id: string, shouldAutorun = true) => {
	const step = boot.find((step) => step.id === id);
	if (step) {
		step.autorun = shouldAutorun;
	}
};
