const DEFAULT_AUTOBOOT_CONFIG = {
	memory: false,
	glue: false,
	wasm: false,
	canvas: false,
	file: false,
	brush: false
};

type StepName = keyof typeof DEFAULT_AUTOBOOT_CONFIG;

type BootStep = {
	autorun: boolean;
	disabled: boolean;
	status: 'uninitialized' | 'running' | 'succeeded' | 'failed';
};

export const boot: Record<StepName, BootStep> = $state({
	memory: {
		autorun: false,
		disabled: false,
		status: 'uninitialized'
	},
	glue: {
		autorun: false,
		disabled: false,
		status: 'uninitialized'
	},
	wasm: {
		autorun: false,
		disabled: false,
		status: 'uninitialized'
	},
	canvas: {
		autorun: false,
		disabled: false,
		status: 'uninitialized'
	},
	file: {
		autorun: false,
		disabled: false,
		status: 'uninitialized'
	},
	brush: {
		autorun: false,
		disabled: false,
		status: 'uninitialized'
	}
});

const autobootStorageKey = 'autoboot';
const storedBootConfig = localStorage.getItem(autobootStorageKey);
const autobootConfig: typeof DEFAULT_AUTOBOOT_CONFIG = storedBootConfig
	? JSON.parse(storedBootConfig)
	: { ...DEFAULT_AUTOBOOT_CONFIG };

for (const [key, shouldAutorun] of Object.entries(autobootConfig)) {
	boot[key as StepName].autorun = shouldAutorun;
}
