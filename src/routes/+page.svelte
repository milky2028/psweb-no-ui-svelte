<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import Divider from '$lib/Divider.svelte';
	import { boot, setAutorun } from '$lib/boot.svelte';
	import { getMemory, setMemory } from '$lib/memory.svelte';

	const AUTOBOOT_STORAGE_KEY = 'autoboot';

	let isolated = $state('...');
	const memory = $derived(getMemory());

	$effect(() => {
		const bootEntries: { [k: string]: number | boolean } = Object.fromEntries(
			boot.map((step) => [step.id, step.autorun]),
		);

		bootEntries.memoryAmount = getMemory();
		localStorage.setItem(AUTOBOOT_STORAGE_KEY, JSON.stringify(bootEntries));
	});

	onMount(() => {
		isolated = `${crossOriginIsolated}`;

		const storedBootConfig = localStorage.getItem(AUTOBOOT_STORAGE_KEY);
		if (storedBootConfig) {
			const config = JSON.parse(storedBootConfig);
			for (const [key, value] of Object.entries(config)) {
				if (key === 'memoryAmount' && typeof value === 'number') {
					setMemory(value);
				} else if (typeof value === 'boolean') {
					setAutorun(key, value);
				}
			}
		}
	});

	function onClear() {}

	function onCheckbox(
		event: Event & { currentTarget: EventTarget & HTMLInputElement },
		position: number,
	) {
		const { checked } = event.currentTarget;
		if (checked) {
			for (let i = 0; i <= position; i++) {
				const step = boot[i];
				step.autorun = checked;
			}
		} else {
			for (let i = position; i < boot.length; i++) {
				const step = boot[i];
				step.autorun = checked;
			}
		}
	}

	async function runStep(position: number) {
		for (let i = 0; i <= position; i++) {
			const step = boot[i];
			if (!step.status) {
				step.status = '⏳';
				try {
					await boot[i].action();
					step.status = '✅';
				} catch {
					step.status = '❌';
				}
			}
		}
	}
</script>

<Divider />

<div><strong>crossOriginIsolated:</strong> {isolated}</div>

<Divider />

<div>
	This application allows you to step through Photoshop Web's booting process with a pre-configured
	memory amount.
	<br />
	Use the checkbox next to each step to configure that step to run automatically on page reload.
</div>
<button onclick={onClear}>Clear Autoboot</button>

<Divider />

<label>
	<div>Initial WebAssembly Memory Allotment: {memory}GB</div>
	<input
		style="width: 300px"
		type="range"
		min={1}
		max={3.75}
		step={0.25}
		value={memory}
		oninput={(e) => setMemory(e.currentTarget.valueAsNumber)}
	/>
</label>

<Divider />

<div>Boot Process</div>

{#each Object.values(boot) as step, i}
	<div>
		{i + 1}.
		<input
			disabled={step.disabled}
			type="checkbox"
			checked={step.autorun}
			oninput={(e) => onCheckbox(e, i)}
		/>
		<button disabled={step.disabled} onclick={() => runStep(i)}>{step.name}</button>
		{step.status ? ` - ${step.status}` : ''}
	</div>
{/each}
