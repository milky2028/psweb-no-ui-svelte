const DEFAULT_AUTOBOOT_CONFIG = {
	memory: false,
	glue: false,
	wasm: false,
	canvas: false,
	file: false,
	brush: false,
};

type StepName = keyof typeof DEFAULT_AUTOBOOT_CONFIG;

type BootStep = {
	autorun: boolean;
	disabled: boolean;
	status: 'uninitialized' | 'running' | 'succeeded' | 'failed';
	name: string;
	// action: VoidFunction;
};

export const boot: Record<StepName, BootStep> = $state({
	memory: {
		autorun: false,
		disabled: false,
		status: 'uninitialized',
		name: 'Create WASM Memory',
	},
	glue: {
		autorun: false,
		disabled: false,
		status: 'uninitialized',
		name: 'Load Emscripten JS Glue Code',
	},
	wasm: {
		autorun: false,
		disabled: false,
		status: 'uninitialized',
		name: 'Load WASM',
	},
	canvas: {
		autorun: false,
		disabled: false,
		status: 'uninitialized',
		name: 'Create Canvas and Attach Renderer',
	},
	file: {
		autorun: false,
		disabled: true,
		status: 'uninitialized',
		name: 'Import File and Open',
	},
	brush: {
		autorun: false,
		disabled: true,
		status: 'uninitialized',
		name: 'Draw Brushstroke',
	},
});

const autobootStorageKey = 'autoboot';
const storedBootConfig = localStorage.getItem(autobootStorageKey);
const autobootConfig: typeof DEFAULT_AUTOBOOT_CONFIG = storedBootConfig
	? JSON.parse(storedBootConfig)
	: { ...DEFAULT_AUTOBOOT_CONFIG };

for (const [key, shouldAutorun] of Object.entries(autobootConfig)) {
	boot[key as StepName].autorun = shouldAutorun;
}
