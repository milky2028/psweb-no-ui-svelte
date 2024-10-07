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
	status: '' | '⏳' | '✅' | '❌';
	name: string;
	action: () => void | Promise<void>;
};

export const boot: Record<StepName, BootStep> = $state({
	memory: {
		autorun: false,
		disabled: false,
		status: '',
		name: 'Create WASM Memory',
		action: () => {},
	},
	glue: {
		autorun: false,
		disabled: false,
		status: '',
		name: 'Load Emscripten JS Glue Code',
		action: () => {},
	},
	wasm: {
		autorun: false,
		disabled: false,
		status: '',
		name: 'Load WASM',
		action: () => {},
	},
	canvas: {
		autorun: false,
		disabled: false,
		status: '',
		name: 'Create Canvas and Attach Renderer',
		action: () => {},
	},
	file: {
		autorun: false,
		disabled: true,
		status: '',
		name: 'Import File and Open',
		action: () => {},
	},
	brush: {
		autorun: false,
		disabled: true,
		status: '',
		name: 'Draw Brushstroke',
		action: () => {},
	},
});

// const autobootStorageKey = 'autoboot';
// const storedBootConfig = localStorage.getItem(autobootStorageKey);
// const autobootConfig: typeof DEFAULT_AUTOBOOT_CONFIG = storedBootConfig
// 	? JSON.parse(storedBootConfig)
// 	: { ...DEFAULT_AUTOBOOT_CONFIG };

// for (const [key, shouldAutorun] of Object.entries(autobootConfig)) {
// 	boot[key as StepName].autorun = shouldAutorun;
// }
