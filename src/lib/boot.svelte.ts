import { createWASMMemory } from './create-wasm-memory';
import { loadScript } from './load-script';
import { loadWASM } from './load-wasm';
import apolloGlue from '$lib/apollo/apollo_web.js?url';
import { createAndAttachCanvas } from './create-and-attach-canvas';
import { importFile } from './import-file';

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
		action: () => loadScript(apolloGlue),
	},
	{
		id: 'wasm',
		autorun: false,
		disabled: false,
		status: '',
		name: 'Load WASM',
		action: loadWASM,
	},
	{
		id: 'canvas',
		autorun: false,
		disabled: false,
		status: '',
		name: 'Create Canvas and Attach Renderer',
		action: createAndAttachCanvas,
	},
	{
		id: 'file',
		autorun: false,
		disabled: true,
		status: '',
		name: 'Import File and Open',
		action: importFile,
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
